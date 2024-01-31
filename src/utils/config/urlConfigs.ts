const BASEURL = "https://fund10x-app-kx5rv4za5a-uc.a.run.app/api";

const GET_POPULAR_MOVIES_URL = (page: number) => {
  return `/movie/popular?page=${page}`;
};

const REQUEST_LOGIN_TOKEN_URL = "/auth/admin/request-login-otp";
const LOGIN_URL = "/auth/admin/login";
const LOGOUT_URL = "/auth/admin/logout";

// BUSINESS
const GET_BUSINESS_URL = "/business";
const GET_BUSINESS_EXPORT_URL = "/business/export";
const GET_INVESTORS_URL = "/investors";
const GET_INVESTORS_EXPORT_URL = "/investors/export";
const GET_ADMINS_URL = "/admins";

export {
  BASEURL,
  REQUEST_LOGIN_TOKEN_URL,
  LOGIN_URL,
  LOGOUT_URL,
  GET_POPULAR_MOVIES_URL,
  GET_BUSINESS_URL,
  GET_BUSINESS_EXPORT_URL,
  GET_INVESTORS_URL,
  GET_INVESTORS_EXPORT_URL,
  GET_ADMINS_URL,
};
