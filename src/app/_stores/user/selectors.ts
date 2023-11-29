import { RootState } from "@lib/redux/store";
import { createSelector } from "@reduxjs/toolkit";

export const getWallet = createSelector(
  (state: RootState) => state.user.wallet,
  (wallet) => wallet,
);

export const getUser = createSelector(
  (state: RootState) => state.user.user,
  (user) => user,
);
