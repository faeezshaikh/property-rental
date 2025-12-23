import os, base64, requests

BASE = os.environ["CONFLUENCE_BASE_URL"].rstrip("/")
EMAIL = os.environ["ATLASSIAN_EMAIL"]
TOKEN = os.environ["ATLASSIAN_API_TOKEN"]

def auth_header():
    raw = f"{EMAIL}:{TOKEN}".encode("utf-8")
    return "Basic " + base64.b64encode(raw).decode("utf-8")

def get(url):
    r = requests.get(
        url,
        headers={"Authorization": auth_header(), "Accept": "application/json"},
        timeout=20,
    )
    return r.status_code, r.text

# Confluence Cloud commonly supports this:
path = "/rest/api/user/current"

# Try BASE + path
code, body = get(BASE + path)

# If you used a base URL without /wiki, Confluence may actually live under /wiki
if code == 404 and not BASE.endswith("/wiki"):
    code, body = get(BASE + "/wiki" + path)

print("HTTP:", code)
print(body[:2000])
