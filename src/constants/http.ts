export enum HttpErrorCode {
  WRONG_PASSWORD = 4001,
  VERIFY_SIGNATURE_FAILED = 4002,
  VERIFY_RECAPTCHA_FAIL = 4003,
  VERIFY_2FA_FAILED = 4004,
  GOOGLE_AUTH_CODE_EMPTY = 4005,
  INCORRECT_GOOGLE_CODE = 4006,
  ENABLED_2FA = 4007,
  EMAIL_NOT_INTEGRATED = 4008,
  USER_REVOKED = 4009,
  PHONE_EXIST = 40010,
  EXISTED_USER = 40011,
  INVALID_TOKEN = 40012,
  USERNAME_EXISTED = 40013,
  GENERATE_VAULT_FAILED = 40014,
  REFERENCE_CODE_EXISTED = 40015,
  GG_ACCOUNT_LINKED = 40016,
  METAMASK_ACCOUNT_LINKED = 40017,
  INCORRECT_REFERENCE_CODE = 40018,
  // Unauthorized
  UNAUTHORIZED = 4010,
  // Forbiden
  FORBIDDEN_RESOURCE = 4030,
  // Not found
  ADMIN_NOT_FOUND = 4040,
  USER_NOT_FOUND = 4041,
  // System
  OTHER_SYSTEM_ERROR = 5000,
}

export const HttpErrorMessage: Record<HttpErrorCode | number | string, string> = {
  [HttpErrorCode.WRONG_PASSWORD]: "wrong-password-message",
  [HttpErrorCode.USER_NOT_FOUND]: "account-not-found-message",
  [HttpErrorCode.USER_REVOKED]: "inactive-account",
  [HttpErrorCode.VERIFY_RECAPTCHA_FAIL]: "verify-catpcha",
  [HttpErrorCode.EXISTED_USER]: "existed-user",
  [HttpErrorCode.PHONE_EXIST]: "phone-exist",
  [HttpErrorCode.USERNAME_EXISTED]: "username-existed",
};
