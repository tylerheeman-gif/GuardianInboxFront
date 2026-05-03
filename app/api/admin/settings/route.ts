import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

const BACKEND = 'https://guardianinboxback-production.up.railway.app';
const ADMIN_SECRET = process.env.ADMIN_SECRET!;

async function checkAuth() {
  const session = await getServerSession(authOptions);
  return session?.user?.email?.toLowerCase() === 'tyler.heeman@gmail.com';
}

export async function GET() {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const res = await fetch(`${BACKEND}/admin/settings`, {
    headers: { 'x-admin-secret': ADMIN_SECRET },
  });
  const data = await res.json();
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { key, value } = await req.json();
  const res = await fetch(`${BACKEND}/admin/settings/${key}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'x-admin-secret': ADMIN_SECRET },
    body: JSON.stringify({ value }),
  });
  const data = await res.json();
  return NextResponse.json(data);
}
