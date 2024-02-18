import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  imageGenerated: [],
};

export const imagelice = createSlice({
  name: "image",
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<any>) => {
      return { ...state, imageGenerated: action.payload };
    },
  },
});

export const { addImage } = imagelice.actions;
export default imagelice.reducer;
