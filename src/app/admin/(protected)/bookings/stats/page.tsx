// app/admin/bookings/page.tsx
import { createApiClient } from '@/features/shared/api/authApiClient';
import React from 'react';

interface Booking {
  id: number;
  user: { name: string; phone: string };
  room_type: { name: string; price: number };
  total_price: number;
  check_in_date: string;
  check_out_date: string;
  status: string;
}

async function fetchBookings(): Promise<Booking[]> {
  const api = createApiClient();
  const response = await (await api).get('/admin/bookings');

  return response.data.data;
}

export default async function BookingsPage() {
  let bookings: Booking[] = [];
  try {
    bookings = await fetchBookings();
  } catch {
    return (
      <p className='p-4 text-red-500'>Có lỗi khi tải danh sách đặt phòng.</p>
    );
  }

  return (
    <div className='p-6'>
      <h1 className='mb-4 text-2xl font-bold'>Danh sách đặt phòng</h1>
      <table className='min-w-full bg-white border'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='p-2 text-left border'>User Details</th>
            <th className='p-2 text-left border'>Room Details</th>
            <th className='p-2 text-left border'>Booking Details</th>
            <th className='p-2 text-left border'>Status</th>
            <th className='p-2 text-left border'>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => {
            const checkIn = new Date(b.check_in_date).toLocaleDateString(
              'vn-VN',
            );
            const checkOut = new Date(b.check_out_date).toLocaleDateString(
              'vn-VN',
            );
            return (
              <tr key={b.id} className='even:bg-gray-50'>
                <td className='p-2 border'>
                  <div>
                    <strong>ID:</strong> ORD_{b.id.toString().padStart(8, '0')}
                  </div>
                  <div>
                    <strong>Name:</strong> {b.user.name}
                  </div>
                  <div>
                    <strong>Phone:</strong> {b.user.phone}
                  </div>
                </td>
                <td className='p-2 border'>
                  <div>
                    <strong>Room:</strong> {b.room_type.name}
                  </div>
                  <div>
                    <strong>Price:</strong>{' '}
                    {b.room_type.price.toLocaleString('vi-VN')}₫
                  </div>
                </td>
                <td className='p-2 border'>
                  <div>
                    <strong>Amount:</strong>{' '}
                    {b.total_price.toLocaleString('vi-VN')}₫
                  </div>
                  <div>
                    <strong>Date:</strong> {checkIn} – {checkOut}
                  </div>
                </td>
                <td
                  className={`border p-2 capitalize ${
                    b.status === 'cancelled' ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {b.status}
                </td>
                <td className='p-2 border'>
                  {b.status === 'pending' ? (
                    <button className='px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700'>
                      Hủy
                    </button>
                  ) : (
                    <span className='text-gray-500'>—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
