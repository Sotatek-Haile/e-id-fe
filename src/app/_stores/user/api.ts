"use client";
import { APIResponse } from "@app/_types";
import { baseQueryApi } from "@lib/redux/baseQueryApi";

export const authApi = baseQueryApi.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<APIResponse<any>, string>({
      query: (id) => {
        return {
          url: `/person/detail/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetUserQuery } = authApi;
