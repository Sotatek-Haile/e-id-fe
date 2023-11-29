import { userReducer } from "@app/_stores/user";
import { liveStreamReducer } from "@app/_stores/video";
import { combineReducers } from "redux";
import { baseQueryApi } from "./baseQueryApi";

const appReducer = combineReducers({
  user: userReducer,
  liveStream: liveStreamReducer,
  [baseQueryApi.reducerPath]: baseQueryApi.reducer,
});

export const rootReducer = (state: any, action: any) => appReducer(state, action);
