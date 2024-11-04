// pages/api/reports/save.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, content } = req.body;

    try {
      const result = await query(
        'INSERT INTO reports (title, content) VALUES ($1, $2) RETURNING *',
        [title, content]
      );
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ message: 'Error saving report', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
