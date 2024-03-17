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
  id: string;
  moved: boolean;
};

export type InvalidResponseError = {
  message: string;
};

export type FolderResponse = {
  message: string;
};

export type Folder = {
  folderName: string;
  created_at: number;
  userId: string;
  isPublic: boolean;
  images: ImageGenerated[];
  id: string;
};
