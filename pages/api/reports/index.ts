// pages/api/reports/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const result = await query('SELECT * FROM reports ORDER BY created_at DESC');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reports', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
