// types/profile.ts

export interface Profile {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  dob: string; // ISO string "1990-01-01T00:00:00.000000Z"
  avatar: string | null;
  role: 'user' | 'admin';
  status: number;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface GetProfileResponse {
  success: boolean;
  data: Profile;
}

// What client can send to update profile
export interface UpdateProfilePayload {
  name?: string;
  phone?: string;
  dob?: string; // keep as ISO or yyyy-MM-dd
  idCode?: string; // optional if backend supports it
  address?: string;
  avatar?: string; // optional (image path from upload)
}

export interface UpdatePasswordPayload {
  current_password: string;
  password: string;
  password_confirmation: string;
}
