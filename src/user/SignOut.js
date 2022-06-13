import {Navigate} from "react-router-dom";
import {setAuthToken} from "../utils/axios";

export default function SignOut(){
    localStorage.removeItem('AuthToken');
    setAuthToken(localStorage.AuthToken);

    return(<Navigate to="/signin"/>);
}