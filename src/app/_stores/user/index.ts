import { COOKIES_KEY } from "@app/_constants";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export type AuthStates = {
  account: string | null;
  message: string | null;
  signature: string | null;
};

const initialState: AuthStates = {
  account: null,
  message: null,
  signature: null,
};

// slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, actions: any) => {
      state.account = actions.payload.account;
      state.message = actions.payload.message;
      state.signature = actions.payload.signature;

      Cookies.set(COOKIES_KEY.ACCOUNT, actions.payload.account, { expires: 10 });
      Cookies.set(COOKIES_KEY.TOKEN, actions.payload.signature, { expires: 10 });
    },
    removeUser: (state) => {
      state.account = null;
      state.message = null;
      state.signature = null;
      Cookies.remove(COOKIES_KEY.ACCOUNT);
      Cookies.remove(COOKIES_KEY.TOKEN);
    },
  },
});

// actions
export const { setUser, removeUser } = userSlice.actions;

// reducer
export const userReducer = userSlice.reducer;
