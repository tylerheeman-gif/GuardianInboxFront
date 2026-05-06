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
  const res = await fetch(`${BACKEND}/admin/users`, {
    headers: { 'x-admin-secret': ADMIN_SECRET },
  });
  const data = await res.json();
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  if (!await checkAuth()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  const res = await fetch(`${BACKEND}/admin/users/${id}`, {
    method: 'DELETE',
    headers: { 'x-admin-secret': ADMIN_SECRET },
  });
  const data = await res.json();
  return NextResponse.json(data);
}
