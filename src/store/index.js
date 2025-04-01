import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "./registrationSlice";

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
  },
});
