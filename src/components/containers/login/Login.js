import React from "react";
import {useTranslation} from "react-i18next";
import {LoginButton } from '@solid/react';
import "./Login.css";

export const Login = () => {
    const {t} = useTranslation();
    const publicUrl = 'url('.concat(process.env.PUBLIC_URL).concat(`/img/background-image.jpg`).concat(')');

    return (
      <div data-testid="loginPane" style={{ background: publicUrl
              , backgroundRepeat: 'no-repeat', height: '100vh', width:'100vw'
              , backgroundPosition: 'center', backgroundSize: 'cover' }}>
                <div className="Login">
                    <h2 className = "loginTitle">{t("login.title")}</h2>
                    <div >
                        <LoginButton  className="btn btn-primary a-solid button-login" popup="https://solid.github.io/solid-auth-client/dist/popup.html">
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
        </div>
    );
}

export default Login;