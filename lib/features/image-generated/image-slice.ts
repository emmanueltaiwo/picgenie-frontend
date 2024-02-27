import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageState {
  imageGenerated: string[];
}

const initialState: ImageState = {
  imageGenerated: [],
};

export const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<string[]>) => {
      return { ...state, imageGenerated: action.payload };
    },
  },
});

export const { addImage } = imageSlice.actions;
export default imageSlice.reducer;
