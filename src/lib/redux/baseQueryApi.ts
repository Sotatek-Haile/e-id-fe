import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { RootState } from "./store";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_ENDPOINT,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = (getState() as RootState).user.signature;
    if (!!token && endpoint !== "refresh") {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  const { getState, dispatch } = api;
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      // try {
      //   const refreshToken = (getState() as RootState).user.refreshToken;
      //   const refreshResult = await baseQuery(
      //     {
      //       url: "/refresh-token",
      //       method: "POST",
      //       body: { refreshToken },
      //     },
      //     api,
      //     extraOptions,
      //   );
      //   // save new access token and refresh token
      //   // retry the initial query
      //   if (refreshResult.data) {
      //     result = await baseQuery(args, api, extraOptions);
      //   } else {
      //     // logout
      //     // dispatch(onLogout);
      //   }
      // } finally {
      //   // release must be called once the mutex should be released again.
      //   release();
      // }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const baseQueryApi = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["stream-token", "list-milestone"],
  endpoints: () => ({}),
  keepUnusedDataFor: 0,
});
