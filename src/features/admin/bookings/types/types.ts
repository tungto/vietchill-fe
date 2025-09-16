import { Room } from '@/features/admin/rooms/types';
import { Booking } from '../api';

export interface BookingFormData {
  status: Booking['status'];
  room_id: number | null;
  is_paid: boolean;
}

export interface StatusOption {
  value: string;
  label: string;
  color: string;
}

export interface BookingUpdateFormProps {
  booking: Booking;
  availableRooms?: Room[];
  nights?: number;
}

export interface FormSectionProps {
  booking: Booking;
  formData: BookingFormData;
  setFormData: React.Dispatch<React.SetStateAction<BookingFormData>>;
  loading?: boolean;
}

export interface RoomAssignmentProps extends FormSectionProps {
  availableRooms: Room[];
  loadingRooms: boolean;
  onRefreshRooms: () => void;
}

export const statusOptions: StatusOption[] = [
  {
    value: 'pending',
    label: 'Chờ xác nhận',
    color: 'bg-yellow-100 text-yellow-800',
  },
  {
    value: 'confirmed',
    label: 'Đã xác nhận',
    color: 'bg-blue-100 text-blue-800',
  },
  {
    value: 'checked-in',
    label: 'Đã nhận phòng',
    color: 'bg-green-100 text-green-800',
  },
  {
    value: 'checked-out',
    label: 'Đã trả phòng',
    color: 'bg-purple-100 text-purple-800',
  },
  {
    value: 'completed',
    label: 'Hoàn thành',
    color: 'bg-green-100 text-green-800',
  },
  { value: 'cancelled', label: 'Đã hủy', color: 'bg-red-100 text-red-800' },
];

export const formatCurrency = (amount?: number): string => {
  return amount?.toLocaleString('vi-VN') || '0';
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString('vi-VN');
};
