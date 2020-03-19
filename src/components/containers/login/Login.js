import React from "react";
import { useTranslation } from "react-i18next";
import { LoggedOut, LoggedIn, LoginButton } from '@solid/react';
import { Redirect } from "react-router-dom";

export const Login = props => {
    const { t } = useTranslation();
    return(
        <div id="login-container">
            <LoggedOut>
                <LoginButton popup="popup.html"/>
            </LoggedOut>
            <LoggedIn>
                <Redirect to="/welcome"></Redirect>
            </LoggedIn>
        </div>
    );
}

export default Login;