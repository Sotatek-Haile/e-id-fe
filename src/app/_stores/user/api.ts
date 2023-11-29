"use client";
import { APIResponse } from "@app/_types";
import { baseQueryApi } from "@lib/redux/baseQueryApi";
import { FetchArgs } from "@reduxjs/toolkit/query";
import {
  ChangePasswordParams,
  EditProfileParams,
  EditSubscriptionEmailParams,
  ForgotPasswordParams,
  GoogleLoginModel,
  LinkToGoogleParams,
  LinkToMetamaskParams,
  LoginModel,
  LoginResponse,
  MetamaskLoginModel,
  ReferralCodeParams,
  ResetPasswordParams,
  TelegramLoginModel,
  UserProfile,
  Verify2FA,
} from "./type";

export const authApi = baseQueryApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<APIResponse<LoginResponse>, LoginModel>({
      query: (params) => {
        return {
          url: "/login",
          body: params,
          method: "POST",
        };
      },
    }),
    loginViaMetamask: build.mutation<APIResponse<LoginResponse>, MetamaskLoginModel>({
      query: (params) => {
        return {
          url: "/login/metamask",
          body: params,
          method: "post",
        };
      },
    }),
    loginViaTelegram: build.mutation<APIResponse<LoginResponse>, TelegramLoginModel>({
      query: (params) => {
        return {
          url: "/login/telegram",
          body: params,
          method: "post",
        };
      },
    }),
    loginViaGoogle: build.mutation<APIResponse<LoginResponse>, GoogleLoginModel>({
      query: (params) => {
        return {
          url: "/login/google",
          body: params,
          method: "post",
        };
      },
    }),
    verify2FA: build.mutation<APIResponse<LoginResponse>, Verify2FA>({
      query: (params) => {
        const config: FetchArgs = {
          url: "/verify-2fa",
          body: {
            codeGoogle: params.codeGoogle,
          },
          method: "post",
        };

        if (params.accessToken) {
          config.headers = {
            Authorization: `Bearer ${params.accessToken}`,
          };
        }

        return config;
      },
    }),
    getUserProfile: build.query<APIResponse<UserProfile>, string>({
      query: (token: string) => {
        return {
          url: `/profile`,
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
            pragma: "no-cache",
          },
        };
      },
      // providesTags: ["user-info"],
    }),
    getUserInfo: build.query<any, string>({
      query: (address: string) => ({ url: `/user/${address}` }),
      // providesTags: ["user-info"],
    }),

    forgotPassword: build.mutation<unknown, ForgotPasswordParams>({
      query: (params) => {
        return {
          url: "/request-forgot-password",
          body: params,
          method: "post",
        };
      },
    }),

    resetPassword: build.mutation<unknown, ResetPasswordParams>({
      query: (params) => {
        return {
          url: "/reset-password",
          body: params,
          method: "post",
        };
      },
    }),

    editReferralCode: build.mutation<unknown, ReferralCodeParams>({
      query: (params) => {
        return {
          url: "/edit-referral-code",
          body: params,
          method: "put",
        };
      },
    }),

    editProfile: build.mutation<unknown, EditProfileParams>({
      query: (params) => {
        return {
          url: "/edit-profile",
          body: params,
          method: "put",
        };
      },
    }),

    linkToGoogle: build.mutation<unknown, LinkToGoogleParams>({
      query: (params) => {
        return {
          url: "/link-to-google",
          body: params,
          method: "post",
        };
      },
    }),

    linkToMetamask: build.mutation<unknown, LinkToMetamaskParams>({
      query: (params) => {
        return {
          url: "/link-to-metamask",
          body: params,
          method: "post",
        };
      },
    }),

    editSubscriptionEmail: build.mutation<unknown, EditSubscriptionEmailParams>({
      query: (params) => {
        return {
          url: "/edit-subscription-email",
          body: params,
          method: "put",
        };
      },
    }),

    changePassword: build.mutation<unknown, ChangePasswordParams>({
      query: (params) => {
        return {
          url: "/change-pass",
          body: params,
          method: "post",
        };
      },
    }),

    getListRefer: build.query<unknown, unknown>({
      query: () => ({ url: `/list-refer` }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserInfoQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLoginViaMetamaskMutation,
  useLoginViaTelegramMutation,
  useLoginViaGoogleMutation,
  useVerify2FAMutation,
  useLazyGetUserProfileQuery,
  useEditReferralCodeMutation,
  useEditProfileMutation,
  useLinkToGoogleMutation,
  useLinkToMetamaskMutation,
  useLazyGetListReferQuery,
  useChangePasswordMutation,
  useEditSubscriptionEmailMutation,
} = authApi;
