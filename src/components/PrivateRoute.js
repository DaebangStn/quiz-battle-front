import React from "react";
import {Route, Navigate} from "react-router-dom";
import GetToken from "./GetToken";

export default function PrivateRoute({component: Component, ...rest}){
    return(
        <Route {...rest} render={props => (
            GetToken() ?
            <Component {...props}/>
            : <Navigate to="/signin"/>
        )}/>
    );
};