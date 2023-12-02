import { RootState } from "@lib/redux/store";
import { createSelector } from "@reduxjs/toolkit";

export const getAccount = createSelector(
  (state: RootState) => state.user.account,
  (account) => account,
);
