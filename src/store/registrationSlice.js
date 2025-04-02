import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step = 2;
    },
    prevStep: (state) => {
      state.step = 1;
    },
  },
});

export const { nextStep, prevStep } = registrationSlice.actions;
export default registrationSlice.reducer;
