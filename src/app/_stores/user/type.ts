export interface ResetPasswordParams {
  token: string; // token from reCaptcha
  resetPassToken: string | null; //token from gmail
  password: string;
}

export interface ForgotPasswordParams {
  email: string;
}

export interface LoginModel {
  email: string;
  password: string;
  token: string;
}

export interface LoginResponse {
  accessToken: string;
  exp: number;
  refreshToken: string;
  user?: User;
  is2FA: boolean;
}

export interface User {
  agreeTerm: number;
  avatar: null;
  birthday: string;
  country: string;
  createdAt: string;
  email: string;
  googleKey: null;
  id: number;
  phone: string;
  receiveNoti: number;
  referenceCode: string;
  role: string;
  teleKey: null;
  updatedAt: string;
  username: string;
  walletAddress: null;
}

export interface MetamaskLoginModel {
  signature: string;
}

export interface TelegramLoginModel {
  auth_date: number;
  first_name: string;
  last_name?: string;
  photo_url?: string;
  username: string;
  hash: string;
  id: number;
}

export interface GoogleLoginModel {
  token: string;
}

export interface Verify2FA {
  codeGoogle: string;
  accessToken?: string;
}

export interface UserProfile {
  agreeTerm: number;
  birthday: string;
  country: string;
  createdAt: string;
  email: string;
  googleKey: string;
  id: number;
  otpCustomer: OtpCustomer;
  phone: string;
  receiveNoti: number;
  referenceCode: string;
  role: string;
  status: string;
  teleKey: string;
  username: string;
  walletAddress: string;
}

export interface OtpCustomer {
  id: number;
  is2FA: boolean;
}

export interface ReferralCodeParams {
  referenceCode: string;
}

export interface EditProfileParams {
  username: string;
  country: string;
  phone: string;
}

export interface LinkToGoogleParams {
  token: string;
}

export interface LinkToMetamaskParams {
  signature: string;
}

export interface EditSubscriptionEmailParams {
  subscriptionEmail: string;
}

export interface ChangePasswordParams {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
