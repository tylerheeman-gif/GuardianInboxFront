import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { Pool } from 'pg';

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.email?.toLowerCase() !== 'tyler.heeman@gmail.com') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [subscribersResult] = await Promise.all([
    db.query('SELECT * FROM "User" ORDER BY created_at DESC NULLS LAST'),
  ]);

  const subscribers = subscribersResult.rows;

  const mrr = subscribers
    .filter((s) => s.status === 'active')
    .reduce((sum: number, s: { plan: string }) => {
      const planPrices: Record<string, number> = { essential: 19, family: 49, guardian: 99 };
      return sum + (planPrices[s.plan] || 0);
    }, 0);

  return Response.json({ subscribers, mrr });
}
