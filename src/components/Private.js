import React from "react";
import {Navigate} from "react-router-dom";
import GetToken from "./GetToken";

export function Private({Component}) {
    return(
            GetToken() ?
        <Component /> : <Navigate to="/signin"/>
    );
};
