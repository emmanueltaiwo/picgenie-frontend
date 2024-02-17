export type AuthResponse = {
  token?: string;
  message: string;
};

export type Image = {
  imageUrl?: string;
  userId?: string;
  created_at?: string;
  message?: string;
};

export type Profile = {
  fullName: string;
  email: string;
  creditsLeft: number;
  images: Image[];
  id: string;
};
