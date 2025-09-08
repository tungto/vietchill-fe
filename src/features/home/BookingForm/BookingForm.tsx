'use client';
import AppButton from '@/features/common/AppButton';
import { CommonDatePicker } from '@/features/common/DatePicker';
import { ChildCare, Person, Search } from '@mui/icons-material';
import { Box } from '@mui/material';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import NumberInput from './NumberInput';

export default function BookingForm() {
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  return (
    <Box
      component='form'
      className='bg-white p-6 rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-5 gap-4 items-end'
    >
      {/* Check-in */}
      <CommonDatePicker
        value={startDate}
        onChange={setStartDate}
        label='Nhận phòng'
      />

      {/* Check-out */}
      <CommonDatePicker
        value={endDate}
        onChange={setEndDate}
        label='Trả phòng'
      />

      {/* Adults */}
      <NumberInput
        label='Người lớn'
        icon={<Person />}
        value={adults}
        onChange={(newValue) => setAdults(Number(newValue))}
      />
      <NumberInput
        label='Trẻ em'
        icon={<ChildCare />}
        value={children}
        onChange={(newValue) => setChildren(Number(newValue))}
      />

      <AppButton
        label='Tìm phòng'
        icon={<Search />}
        iconPosition='right'
        size='lg'
        href='/vietstay/rooms'
      />
    </Box>
  );
}
