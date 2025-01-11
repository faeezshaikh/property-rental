import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'app/data/properties.json');

export async function GET() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load properties' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const properties = await request.json();
    await fs.writeFile(dataFilePath, JSON.stringify(properties, null, 2));
    return NextResponse.json({ message: 'Properties saved successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save properties' }, { status: 500 });
  }
} 