import {REGISTER_USER} from "./types";
import {request} from "../utils/axios";

const SIGNUP_URL = "/signup";

export function signup(dataToSubmit){
    const data = request("post", SIGNUP_URL, dataToSubmit);
    return {
        type: REGISTER_USER,
        payload: data,
    };
}