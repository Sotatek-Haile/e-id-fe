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
    getAllOrganization: build.query<any, any>({
      query: (params) => {
        return {
          url: "/organization/all",
          method: "GET",
        };
      },
    }),
    getMilesStone: build.query<any, any>({
      query: (params) => {
        return {
          url: "/milestone/all",
          method: "GET",
        };
      },
    }),
  }),
});
export const { useGetAllUserQuery, useGetAllOrganizationQuery, useGetMilesStoneQuery } = adminApi;
