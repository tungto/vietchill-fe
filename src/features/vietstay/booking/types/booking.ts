export type Booking = {
  id: number;
  status: 'pending' | 'confirmed' | 'checked_in' | 'completed' | 'cancelled';
  check_in_date: string;
  check_out_date: string;
  phone: string;
  adult: number;
  children: number;
  total_price: number;
  created_at: string;
  is_paid: boolean;
  room_type: {
    name: string;
    images: { path: string; is_thumbnail: boolean }[];
  };
};

export type BookingsResponse = {
  success: boolean;
  message: string;
  data: Booking[];
};
