import { NewImageGenerated } from "@/typings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageState {
  imageGenerated: NewImageGenerated[];
}

const initialState: ImageState = {
  imageGenerated: [],
};

export const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<NewImageGenerated[]>) => {
      return { ...state, imageGenerated: action.payload };
    },
  },
});

export const { addImage } = imageSlice.actions;
export default imageSlice.reducer;
