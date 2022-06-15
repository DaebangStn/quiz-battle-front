import {
  REGISTER_USER,
  LOGIN_USER,
  GET_PROFILE,
  GET_LIST,
  GET_PASSWORD_TOKEN,
  CONFIRM_PASSWORD,
} from "./types";
import { request } from "../utils/axios";

const SIGNUP_URL = "/signup/";
const SIGNIN_URL = "/signin/";
const PROFILE_URL = "/user/detail/";
const LIST_URL = "/user/list/";
const PASSWORD_BASE_URL = "/password/reset/";

export function signup(dataToSubmit) {
  const data = request("post", SIGNUP_URL, dataToSubmit);
  return {
    type: REGISTER_USER,
    payload: data,
  };
}

export function signin(dataToSubmit) {
  const data = request("post", SIGNIN_URL, dataToSubmit);
  return {
    type: LOGIN_USER,
    payload: data,
  };
}

export function get_profile() {
  const data = request("get", PROFILE_URL);
  return {
    type: GET_PROFILE,
    payload: data,
  };
}

export function get_list() {
  const data = request("get", LIST_URL);
  return {
    type: GET_LIST,
    payload: data,
  };
}

export function get_password_token(email) {
  const body = {
    email: email,
  };
  const data = request("post", PASSWORD_BASE_URL, body);
  return {
    type: GET_PASSWORD_TOKEN,
    payload: data,
  };
}

export function confirm_password(dataToSubmit) {
  const data = request("post", PASSWORD_BASE_URL + "confirm/", dataToSubmit);
  return {
    type: CONFIRM_PASSWORD,
    payload: data,
  };
}
