/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/db.ts
import { Pool } from 'pg';

const pool = new Pool({
     connectionString: process.env.DATABASE_URL,
});

export const query = (text: string, params?: any[]) => {
     return pool.query(text, params);
};