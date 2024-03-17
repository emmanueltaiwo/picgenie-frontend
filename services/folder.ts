"use server";

import { cookies } from "next/headers";
import axios from "axios";
import { API_BASE_URL } from "@/constants";
import { Folder, FolderResponse } from "@/typings";

export const createNewFolder = async (
  folderName: string,
  isPublic: boolean
): Promise<string | FolderResponse> => {
  try {
    if (!folderName) return "Folder Name Or Visibilty Is Invalid";

    const token = cookies().get("token");
    if (!token) return "User not logged in";

    const response = await axios.post(
      `${API_BASE_URL}/api/folder/create-folder`,
      {
        folderName,
        isPublic,
        createdAt: new Date().getTime(),
      },
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    const data = response.data as FolderResponse;

    return data;
  } catch (error: any) {
    throw error;
  }
};

export const fetchAllFolders = async (): Promise<Folder[]> => {
  try {
    const token = cookies().get("token");
    if (!token) throw new Error("Invalid token");

    const response = await axios.get(`${API_BASE_URL}/api/folder/fetch-all`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    const data = response.data as Folder[];

    return data;
  } catch (error: any) {
    throw error;
  }
};

export const fetchFolderById = async (
  folderId: string
): Promise<Folder> => {
  try {
    if (!folderId) throw new Error("Folder id is not valid")

    const token = cookies().get("token");
    if (!token) throw new Error("Token is not valid")

    const response = await axios.get(`${API_BASE_URL}/api/folder/${folderId}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    const data = response.data as Folder;

    return data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteFolderById = async (folderId: string): Promise<boolean> => {
  try {
    if (!folderId) return false;

    const token = cookies().get("token");
    if (!token) return false;

    const response = await axios.delete(
      `${API_BASE_URL}/api/folder/${folderId}`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    if (response.status !== 204) return false;

    return true;
  } catch (error: any) {
    throw error;
  }
};

export const updateFolderById = async (
  folderId: string,
  newFolderName: string,
  newFolderIsPublic: boolean
): Promise<string> => {
  try {
    if (!folderId) return "Folder ID Is Not Found";

    const token = cookies().get("token");
    if (!token) return "User not logged in";

    const response = await axios.put(
      `${API_BASE_URL}/api/folder/${folderId}`,
      {
        folderName: newFolderName,
        isPublic: newFolderIsPublic,
      },
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    const data = response.data as { message: string };

    return data.message;
  } catch (error: any) {
    throw error;
  }
};

export const moveImageToFolder = async (
  folderId: string,
  imageId: string
): Promise<string> => {
  try {
    if (!folderId || !imageId) return "Folder Or Image ID Is Not Found";

    const token = cookies().get("token");
    if (!token) return "User not logged in";

    const response = await axios.post(
      `${API_BASE_URL}/api/folder/move-image-to-folder`,
      {
        folderId,
        imageId,
      },
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    const data = response.data as { message: string };

    return data.message;
  } catch (error: any) {
    throw error;
  }
};

export const removeImageFromFolder = async (
  folderId: string,
  imageId: string
): Promise<string> => {
  try {
    if (!folderId || !imageId) return "Folder Or Image ID Is Not Found";

    const token = cookies().get("token");
    if (!token) return "User not logged in";

    const response = await axios.patch(
      `${API_BASE_URL}/api/folder/remove-image-from-folder`,
      {
        folderId,
        imageId,
      },
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    const data = response.data as string;

    return data;
  } catch (error: any) {
    throw error;
  }
};
