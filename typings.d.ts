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

export type NewImageGenerated = {
  url: string;
};

export type ImageGenerated = {
  base64: string;
  userId: string;
  created_at: number;
  prompt: string;
};

export type InvalidResponseError = {
  message: string;
};
