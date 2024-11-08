/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useEffect, useState } from 'react';

interface Report {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export default function Home() {

  return (
    <div className="p-6">
      {/* Hero Section */}
      <section className="bg-blue-500 text-white p-8 rounded-lg mb-8 text-center">
        <h1 className="text-3xl font-bold">Welcome!</h1>
        <p className="mt-2 text-lg">
          Here&apos;s your dashboard with the latest updates.
        </p>
      </section>

      {/* Latest Reports Section */}
      <section>
      </section>
    </div>
  );
}
