"use client";

export const useLocalStorage = (key: string) => {
  const setItem = (value: string): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error: any) {
      throw error;
    }
  };

  const getItem = (): string => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error: any) {
      throw error;
    }
  };

  const removeItem = (): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error: any) {
      throw error;
    }
  };

  return { setItem, getItem, removeItem };
};
