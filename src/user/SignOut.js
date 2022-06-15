import { Navigate } from "react-router-dom";
import { setAuthToken } from "../utils/axios";
import { toast_basic_info } from "../utils/toastifies";

export default function SignOut() {
  localStorage.removeItem("AuthToken");
  setAuthToken(localStorage.AuthToken);
  toast_basic_info("안녕히 가세요");
  return <Navigate to="/signin" />;
}
