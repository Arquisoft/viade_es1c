import React, { useState } from "react";
import {useTranslation} from "react-i18next";
import {LoggedOut, LoggedIn } from '@solid/react';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import {Redirect} from "react-router-dom";
import "./Login.css";

export const Login = props => {
    const {t} = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }
    return (
        <div className="login-div">
            <LoggedOut>
                <div className="Login">
                    <h2>{t("login.title")}</h2>
                    <form onSubmit={handleSubmit}>
                        <Button>
                            {t("login.register")}
                        </Button>
                        <h3>{t("login.loginTitle")}</h3>
                        <Button variant="light">
                            {t("login.formButtonText")}
                        </Button>
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