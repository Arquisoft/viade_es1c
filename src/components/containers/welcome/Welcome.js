import React from 'react';
import {useTranslation} from "react-i18next";
import { useWebId } from '@solid/react';
import "./Welcome.css";

export const Welcome = props => {
    const {t} = useTranslation();
    const webId = useWebId();

    return (
        <div class="container">
            <div class="row">
                <div class="col-sm">
                    <img className="myImg" src="img/logoViaDe.svg" alt="Logo ViaDe" height="120" width="150"></img>
                </div>
                <div class="col-sm">
                    <h1 className="h1-welcome">{t('welcome.welcome')}</h1>
                    <span>{webId}</span>
                </div>
                <div class="col-sm">
                    <h2 className="myH2">{t('welcome.title')}</h2>
                    <ul>
                        <li>{t('welcome.presentation')}</li>
                        <li><a href="https://arquisoft.github.io/viade_es1c/docs/">{t('welcome.documentation')}</a></li>
                        <li><a href="https://github.com/Arquisoft/viade_es1c">{t('welcome.repository')}</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Welcome;