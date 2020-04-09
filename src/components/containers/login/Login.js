import React from "react";
import {useTranslation} from "react-i18next";
import {LoggedOut, LoggedIn, LoginButton } from '@solid/react';
import {Redirect} from "react-router-dom";
import "./Login.css";

export const Login = props => {
    const {t} = useTranslation();
    const publicUrl = 'url('.concat(process.env.PUBLIC_URL).concat(`/img/background-image.jpg`).concat(')');

    return (
      <div style={{ background: publicUrl
              , backgroundRepeat: 'no-repeat', height: '100vh', width:'100vw'
              , backgroundPosition: 'center', backgroundSize: 'cover' }}>
            <LoggedOut>
                <div className="Login">
                    <h2>{t("login.title")}</h2>
                    <div >
                        <LoginButton className="btn btn-primary a-solid button-login" popup="https://solid.github.io/solid-auth-client/dist/popup.html">
                            {t("login.formButtonText")}
                        </LoginButton>
                    </div>
                    <a
                        href="https://solid.inrupt.com/get-a-solid-pod"
                        rel="noopener noreferrer"
                        target="_blank"
                        className="link"
                    >
                        {t('login.solidHelp')}
                    </a>
                </div>
            </LoggedOut>
            <LoggedIn data-testid="loggedInPane">
                <Redirect to="/welcome"></Redirect>
            </LoggedIn>
        </div>
    );
}

export default Login;