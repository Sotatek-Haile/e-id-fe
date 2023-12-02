import { userReducer } from "@app/_stores/user";
import { combineReducers } from "redux";
import { baseQueryApi } from "./baseQueryApi";

const appReducer = combineReducers({
  user: userReducer,
  [baseQueryApi.reducerPath]: baseQueryApi.reducer,
});

export const rootReducer = (state: any, action: any) => appReducer(state, action);
