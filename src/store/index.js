import { configureStore } from "@reduxjs/toolkit";
import reactjsFormReducer from "../pages/HomeTemplate/ReactjsForm/slice";

export const store = configureStore({
  reducer: {
    // Add your child reducer here
    reactjsFormReducer,
  },
});
