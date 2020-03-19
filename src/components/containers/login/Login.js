import React from "react";
import {useTranslation} from "react-i18next";
import {LoggedOut, LoggedIn, LoginButton } from '@solid/react';
import {Redirect} from "react-router-dom";
import "./Login.css";

export const Login = props => {
    const {t} = useTranslation();

    return (
        <div className="login-div">
            <LoggedOut>
                <div className="Login">
                    <h2>{t("login.title")}</h2>
                    <form>
                        <h3>{t("login.loginTitle")}</h3>
                        <LoginButton className="btn btn-primary" popup="https://solid.community/common/popup.html">
                            {t("login.formButtonText")}
                        </LoginButton>
                    </form>
                </div>
            </LoggedOut>
            <LoggedIn>
                <Redirect to="/welcome"></Redirect>
            </LoggedIn>
        </div>
    );
}

export default Login;