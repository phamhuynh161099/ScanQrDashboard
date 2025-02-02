import counterReducer from "@/features/counter/counterSlice";
import { configureStore } from "@reduxjs/toolkit";

/**
 * Define Reducers
 */
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
