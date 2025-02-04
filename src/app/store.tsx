import authReducer from "@/features/auth/authSlice";
import counterReducer from "@/features/counter/counterSlice";
import loadingReducer from "@/features/loading/loadingSlice";
import { configureStore } from "@reduxjs/toolkit";

/**
 * Define Reducers
 */
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
