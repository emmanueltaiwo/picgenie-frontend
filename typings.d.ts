export type AuthResponse = {
  token?: string;
  message: string;
};

export type Profile = {
  fullName: string;
  email: string;
  creditsLeft: number;
  images: string[];
  id: string;
};

export type ImageGenerated = {
  imageUrl: string;
  userId: string;
  created_at: number;
  prompt: string;
};

export type InvalidResponseError = {
  message: string;
};
