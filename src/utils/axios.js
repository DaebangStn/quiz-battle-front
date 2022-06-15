import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;
export const request = (method, url, data) => {
  return axios({
    method,
    url: process.env.REACT_APP_BACKEND_HOST + url,
    data,
  })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      if (err.response.status === 401) {
        localStorage.removeItem("AuthToken");
        setAuthToken(localStorage.AuthToken);
        const navigate = useNavigate();
        navigate("/signin");
      }
      return err;
    });
};

export function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}
