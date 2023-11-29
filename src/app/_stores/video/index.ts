import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LiveStreamStates = {
  liveStreamUrl: string | null;
  matchName: string | null;
};

const initialState: LiveStreamStates = {
  liveStreamUrl: null,
  matchName: null,
};

// slice
export const liveStreamSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLiveStreamInfo: (state, actions: PayloadAction<LiveStreamStates>) => {
      state.liveStreamUrl = actions.payload.liveStreamUrl;
      state.matchName = actions.payload.matchName;
    },
  },
});

// actions
export const { setLiveStreamInfo } = liveStreamSlice.actions;

// reducer
export const liveStreamReducer = liveStreamSlice.reducer;
