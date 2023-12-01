import { userReducer } from "@app/_stores/user";
import { liveStreamReducer } from "@app/_stores/video";
import { combineReducers } from "redux";
import { baseQueryApi } from "./baseQueryApi";
import { adminReducer } from "@app/_stores/admin";

const appReducer = combineReducers({
  admin: adminReducer,
  user: userReducer,
  liveStream: liveStreamReducer,
  [baseQueryApi.reducerPath]: baseQueryApi.reducer,
});

export const rootReducer = (state: any, action: any) => appReducer(state, action);
