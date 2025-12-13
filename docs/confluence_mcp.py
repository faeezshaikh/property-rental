import os
import base64
import json
import requests
from typing import Any, Dict, List, Optional

from mcp.server.fastmcp import FastMCP

# ---- Config ----
CONFLUENCE_BASE_URL = os.environ["CONFLUENCE_BASE_URL"].rstrip("/")  # e.g. https://acme.atlassian.net/wiki
ATLASSIAN_EMAIL = os.environ["ATLASSIAN_EMAIL"]
ATLASSIAN_API_TOKEN = os.environ["ATLASSIAN_API_TOKEN"]

DEFAULT_TIMEOUT_S = 30

def _auth_header() -> str:
    raw = f"{ATLASSIAN_EMAIL}:{ATLASSIAN_API_TOKEN}".encode("utf-8")
    return "Basic " + base64.b64encode(raw).decode("utf-8")

def _headers(extra: Optional[Dict[str, str]] = None) -> Dict[str, str]:
    h = {
        "Authorization": _auth_header(),
        "Accept": "application/json",
    }
    if extra:
        h.update(extra)
    return h

def _request(method: str, path: str, *, headers: Optional[Dict[str, str]] = None, **kwargs) -> Any:
    url = f"{CONFLUENCE_BASE_URL}{path}"
    resp = requests.request(
        method,
        url,
        headers=_headers(headers),
        timeout=DEFAULT_TIMEOUT_S,
        **kwargs,
    )
    if resp.status_code >= 400:
        raise RuntimeError(f"Confluence API {resp.status_code}: {resp.text[:2000]}")
    if not resp.text:
        return None
    # Some endpoints may return non-JSON; handle safely
    try:
        return resp.json()
    except Exception:
        return resp.text

# ---- MCP server ----
mcp = FastMCP("Confluence MCP", json_response=True)

@mcp.tool()
def confluence_search_pages(query: str, space_key: Optional[str] = None, limit: int = 5) -> Dict[str, Any]:
    """
    Search Confluence pages using CQL. Use this when you need to find relevant pages by text.
    """
    # Basic CQL; tweak as needed (labels, type filters, etc.)
    cql = f'type=page AND text ~ "{query}"'
    if space_key:
        cql += f' AND space="{space_key}"'

    data = _request(
        "GET",
        "/rest/api/search",
        params={"cql": cql, "limit": limit},
    )

    results = []
    for r in data.get("results", []):
        page_id = r.get("id")
        title = r.get("title")
        webui = (r.get("_links") or {}).get("webui", "")
        # webui is usually a path under /wiki
        url = f"{CONFLUENCE_BASE_URL}{webui}" if webui else f"{CONFLUENCE_BASE_URL}/pages/{page_id}"
        results.append({"id": page_id, "title": title, "url": url})

    return {"results": results, "cql": cql}

@mcp.tool()
def confluence_get_page(page_id: str, body_format: str = "storage") -> Dict[str, Any]:
    """
    Fetch a Confluence page by ID (v2). body_format is typically 'storage' or 'atlas_doc_format'.
    """
    data = _request(
        "GET",
        f"/api/v2/pages/{page_id}",
        params={"body-format": body_format},
    )
    return data

@mcp.tool()
def confluence_create_page(space_id: str, title: str, body_storage: str, parent_id: Optional[str] = None) -> Dict[str, Any]:
    """
    Create a page (v2). Requires you have permission to create pages in that space.
    body_storage should be Confluence 'storage' (XHTML-ish) content.
    """
    payload = {
        "spaceId": space_id,
        "status": "current",
        "title": title,
        "body": {"representation": "storage", "value": body_storage},
        "subtype": "live",
    }
    if parent_id:
        payload["parentId"] = parent_id

    data = _request(
        "POST",
        "/api/v2/pages",
        headers={"Content-Type": "application/json"},
        data=json.dumps(payload),
    )
    return data

@mcp.tool()
def confluence_update_page(page_id: str, title: Optional[str] = None, body_storage: Optional[str] = None, message: str = "Updated via MCP") -> Dict[str, Any]:
    """
    Update a page (v2). Confluence requires an incremented version.number.
    Requires you have permission to edit that page.
    """
    current = _request("GET", f"/api/v2/pages/{page_id}", params={"body-format": "storage"})
    current_version = (current.get("version") or {}).get("number")
    if current_version is None:
        raise RuntimeError("Could not determine current version.number for page")

    new_title = title or current.get("title")
    if not new_title:
        raise RuntimeError("No title available to update page")

    if body_storage is None:
        # Keep existing body (storage) if present
        body_storage = (((current.get("body") or {}).get("storage") or {}).get("value")) or ""

    payload = {
        "id": str(page_id),
        "status": "current",
        "title": new_title,
        "body": {"representation": "storage", "value": body_storage},
        "version": {"number": int(current_version) + 1, "message": message},
    }

    data = _request(
        "PUT",
        f"/api/v2/pages/{page_id}",
        headers={"Content-Type": "application/json"},
        data=json.dumps(payload),
    )
    return data

@mcp.tool()
def confluence_upload_attachment(
    page_id: str,
    filename: str,
    data_base64: str,
    mime_type: str = "application/octet-stream",
    comment: str = "Uploaded via MCP",
    minor_edit: bool = True,
) -> Dict[str, Any]:
    """
    Upload (or update) an attachment on a page.
    Input is base64-encoded file bytes, so ChatGPT/clients can pass files safely.
    """
    file_bytes = base64.b64decode(data_base64)

    files = {
        "file": (filename, file_bytes, mime_type),
    }
    form = {
        "minorEdit": "true" if minor_edit else "false",
        "comment": comment,
    }

    # Attachment upload requires X-Atlassian-Token: nocheck
    data = _request(
        "PUT",
        f"/rest/api/content/{page_id}/child/attachment",
        headers={"X-Atlassian-Token": "nocheck"},
        files=files,
        data=form,
    )
    return data

if __name__ == "__main__":
    # For Antigravity/local stdio clients: MCP_TRANSPORT=stdio
    # For ChatGPT: MCP_TRANSPORT=streamable-http (then expose via HTTPS tunnel)
    transport = os.environ.get("MCP_TRANSPORT", "stdio")
    mcp.run(transport=transport)
