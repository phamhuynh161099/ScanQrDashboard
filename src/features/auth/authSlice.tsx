import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import {
  getAccessTokenFromLS,
  getProfileFromLS,
  getRefreshTokenFromLS,
} from "@/utils/auth";

interface AuthState {
  accessToken: string;
  refreshToken: string;
  profile: any;
}

const initialDataFromLS = (): AuthState => {
  return {
    accessToken: getAccessTokenFromLS(),
    refreshToken: getRefreshTokenFromLS(),
    profile: getProfileFromLS(),
  };
};

const initialState: AuthState = {
  ...initialDataFromLS(),
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    setProfile: (state, action: PayloadAction<any>) => {
      console.log("setProfile", action);
      state.profile = action.payload;
    },
    clearTokenAndProfile: (state, action: PayloadAction<any>) => {
      state.accessToken = "";
      state.refreshToken = "";
      state.profile = null;
    },
  },
});

export const {
  setAccessToken,
  setRefreshToken,
  setProfile,
  clearTokenAndProfile,
} = counterSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

const authReducer = counterSlice.reducer;
export default authReducer;
