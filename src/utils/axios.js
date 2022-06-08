import axios from "axios";

const DOMAIN = "http://localhost:8000";
axios.defaults.withCredentials = true;
export const request = (method, url, data) => {
    return axios({
        method,
        url: DOMAIN + url,
        withCredentials: true,
        data,
    })
        .then((res) => res.data)
        .catch((err) => console.log(err));
}