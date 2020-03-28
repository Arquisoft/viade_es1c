import React from 'react';
import {useTranslation} from "react-i18next";
import {LoggedOut} from '@solid/react';
import "./Welcome.css";
import LoggedIn from "@solid/react/module/components/LoggedIn";
import { Redirect } from "react-router-dom";
import {Value} from "@solid/react";

export const Welcome = props => {
    const {t} = useTranslation();

    return (
        <section>
            <LoggedIn>
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <img className="myImg" src={process.env.PUBLIC_URL + "/img/logoViaDe.svg"} alt="Logo ViaDe"></img>
                        </div>
                        <div className="col-sm value-format">
                            <h1 className="h1-welcome">{t('welcome.welcome')}</h1>
                            <Value src="user.name"></Value>
                        </div>
                        <div className="col-sm">
                            <h2 className="myH2">{t('welcome.title')}</h2>
                            <ul>
                                <li>{t('welcome.presentation')}</li>
                                <li><a
                                    href="https://arquisoft.github.io/viade_es1c/docs/">{t('welcome.documentation')}</a>
                                </li>
                                <li><a href="https://github.com/Arquisoft/viade_es1c">{t('welcome.repository')}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </LoggedIn>
            <LoggedOut>
                <Redirect to="/"></Redirect>
            </LoggedOut>
        </section>
    );
}

export default Welcome;