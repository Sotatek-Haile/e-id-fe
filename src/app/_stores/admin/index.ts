import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthStates = {
  accessToken: string | null;
  currentAccount: string | null;
  wallet: string | null;
  refreshToken: string | null;
};

const initialState: AuthStates = {
  accessToken: null,
  currentAccount: null,
  wallet: null,
  refreshToken: null,
};

// slice
export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.currentAccount = null;
      state.refreshToken = null;
      state.wallet = null;
    },
    setAuthInfo: (state, actions: PayloadAction<AuthStates>) => {
      state.accessToken = actions.payload.accessToken;
      state.currentAccount = actions.payload.currentAccount;
      state.refreshToken = actions.payload.refreshToken;
      state.wallet = actions.payload.wallet;
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
export const { logout, setRefreshToken, setAuthInfo, setWallet } = adminSlice.actions;

// reducer
export const adminReducer = adminSlice.reducer;
