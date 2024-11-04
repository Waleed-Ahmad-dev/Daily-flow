'use client'
import { useEffect, useState } from 'react';

interface Report {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export default function Home() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    async function fetchReports() {
      const response = await fetch('/api/reports');
      const data = await response.json();
      setReports(data);
    }

    fetchReports();
  }, []);

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
        <h2 className="text-2xl font-semibold mb-4">Latest Reports</h2>
        <div className="grid gap-4">
          {reports.length > 0 ? (
            reports.map((report) => (
              <div key={report.id} className="p-4 border rounded-lg">
                <h3 className="text-lg font-semibold">{report.title}</h3>
                <p className="text-gray-600">{report.content}</p>
                <p className="text-gray-500 text-sm">Created at: {new Date(report.created_at).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p>No reports available</p>
          )}
        </div>
      </section>
    </div>
  );
}
