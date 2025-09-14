// app/admin/queries/page.tsx
import { createApiClient } from '@/features/shared/api/authApiClient';
import React from 'react';

type Query = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

async function getQueries(): Promise<Query[]> {
  const api = createApiClient();
  const res = await (await api).get('/admin/queries');
  return res.data.data;
}

export default async function QueriesPage() {
  const queries = await getQueries();

  return (
    <div className='min-h-screen p-6 bg-gray-100'>
      <h1 className='mb-4 text-2xl font-bold'>Admin Queries</h1>
      <div className='overflow-x-auto bg-white rounded-lg shadow-md'>
        <table className='w-full table-auto'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-4 py-2 text-left'>User Details</th>
              <th className='px-4 py-2 text-left'>Room Details</th>
              <th className='px-4 py-2 text-left'>Refund Amount</th>
              <th className='px-4 py-2 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((q) => (
              <tr key={q.id} className={`${q.is_read ? '' : 'bg-yellow-50'}`}>
                <td className='px-4 py-2 border'>
                  <div>
                    <strong>Name:</strong> {q.name}
                  </div>
                  <div>
                    <strong>Email:</strong> {q.email}
                  </div>
                  <div>
                    <strong>Subject:</strong> {q.subject}
                  </div>
                  <div>
                    <small className='text-gray-500'>
                      {new Date(q.created_at).toLocaleString()}
                    </small>
                  </div>
                </td>
                <td className='px-4 py-2 border'>
                  {/* Replace with actual data if available */}
                  Order‑ID: ORD_{q.id.toString().padStart(8, '0')}
                  <br />
                  Room: —{/* Placeholder */}
                  <br />
                  Check‑in: —{/* Placeholder */}
                  <br />
                  Check‑out: —{/* Placeholder */}
                  <br />
                  Date: —{/* Placeholder */}
                </td>
                <td className='px-4 py-2 border'>VND</td>
                <td className='px-4 py-2 border'>
                  <button className='px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600'>
                    Mark as Read
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
