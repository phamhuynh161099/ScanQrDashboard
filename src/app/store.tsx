import authReducer from "@/features/auth/authSlice";
import counterReducer from "@/features/counter/counterSlice";
import { configureStore } from "@reduxjs/toolkit";

/**
 * Define Reducers
 */
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
