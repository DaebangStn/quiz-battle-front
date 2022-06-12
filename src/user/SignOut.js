import {Navigate} from "react-router-dom";

export default function SignOut(){
    localStorage.removeItem('AuthToken');

    return(<Navigate to="/signin"/>);
}