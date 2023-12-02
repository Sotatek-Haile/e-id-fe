"use client";

import { baseQueryApi } from "@lib/redux/baseQueryApi";

const adminApi = baseQueryApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUser: build.query<any, any>({
      query: (params) => {
        return {
          url: "/person/all",
          method: "GET",
        };
      },
    }),
  }),
});
export const { useGetAllUserQuery } = adminApi;
