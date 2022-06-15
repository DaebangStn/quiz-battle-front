import {
  TOGGLE_SIDE,
  QUIZ_SUBMIT,
  QUIZ_STATUS,
  QUIZ_START,
  QUIZ_CREATE,
  QUIZ_LIST,
  QUIZ_UPDATE,
  QUIZ_DELETE,
} from "./types";
import { request } from "../utils/axios";

const QUIZ_BASE_URL = "/room/";

export function toggle_sidebar() {
  return { type: TOGGLE_SIDE };
}

export function quiz_status(slug_room) {
  const QUIZ_URL = QUIZ_BASE_URL + slug_room + "/";
  const data = request("get", QUIZ_URL);
  return {
    type: QUIZ_STATUS,
    payload: data,
  };
}

export function quiz_submit(slug_room, answer) {
  const QUIZ_URL = QUIZ_BASE_URL + slug_room + "/";
  const dataToSubmit = {
    answer: answer,
  };
  const data = request("post", QUIZ_URL, dataToSubmit);
  return {
    type: QUIZ_SUBMIT,
    payload: data,
  };
}

export function quiz_start(slug_room) {
  const QUIZ_URL = QUIZ_BASE_URL + slug_room + "/start/";
  const data = request("get", QUIZ_URL);
  return {
    type: QUIZ_START,
    payload: data,
  };
}

export function quiz_create(slug_room, dataToSubmit) {
  const QUIZ_URL = QUIZ_BASE_URL + "create/";
  const data = request("post", QUIZ_URL, dataToSubmit);
  return {
    type: QUIZ_CREATE,
    payload: data,
  };
}

export function quiz_list() {
  const QUIZ_URL = QUIZ_BASE_URL + "available/";
  const data = request("get", QUIZ_URL);
  return {
    type: QUIZ_LIST,
    payload: data,
  };
}

export function quiz_update(slug_room, dataToSubmit) {
  const QUIZ_URL = QUIZ_BASE_URL + slug_room + "/";
  const data = request("put", QUIZ_URL, dataToSubmit);
  return {
    type: QUIZ_UPDATE,
    payload: data,
  };
}

export function quiz_delete(slug_room) {
  const QUIZ_URL = QUIZ_BASE_URL + slug_room + "/";
  const data = request("delete", QUIZ_URL);
  return {
    type: QUIZ_DELETE,
    payload: data,
  };
}
