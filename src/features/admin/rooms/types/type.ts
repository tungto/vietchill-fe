// RoomType definition (nested inside Room)
interface RoomType {
  id: number;
  name: string;
  area: number;
  price: number;
  quantity: number;
  adult: number;
  children: number;
  description: string;
  created_at: string;
  updated_at: string;
}

// Room interface
export interface Room {
  id: number;
  room_type_id: number;
  room_number: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  room_type: RoomType;
}

// Form input shape — what we're editing in the form
export interface RoomFormInputs {
  room_number: string;
  room_type_id: number;
  is_active: boolean;
}
