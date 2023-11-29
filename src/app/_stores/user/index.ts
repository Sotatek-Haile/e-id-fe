import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserProfile } from "./type";

export type AuthStates = {
  accessToken: string | null;
  currentAccount: string | null;
  wallet: string | null;
  user: User | UserProfile | null;
  refreshToken: string | null;
};

const initialState: AuthStates = {
  accessToken: null,
  currentAccount: null,
  wallet: null,
  user: null,
  refreshToken: null,
};

// slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.currentAccount = null;
      state.refreshToken = null;
      state.user = null;
      state.wallet = null;
    },
    setAuthInfo: (state, actions: PayloadAction<AuthStates>) => {
      state.accessToken = actions.payload.accessToken;
      state.currentAccount = actions.payload.currentAccount;
      state.refreshToken = actions.payload.refreshToken;
      state.user = actions.payload.user;
      state.wallet = actions.payload.wallet;
    },
    setUserInfo: (state, action: PayloadAction<User | UserProfile | null>) => {
      state.user = action.payload;
    },
    setRefreshToken: (state, actions: PayloadAction<string | null>) => {
      state.refreshToken = actions.payload;
    },
    setWallet: (state, actions: PayloadAction<string | null>) => {
      state.wallet = actions.payload;
    },
  },
});

// actions
export const { logout, setRefreshToken, setAuthInfo, setWallet, setUserInfo } = userSlice.actions;

// reducer
export const userReducer = userSlice.reducer;
