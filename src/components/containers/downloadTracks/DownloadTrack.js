import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from 'react-bootstrap';
import {LoggedIn, LoggedOut } from "@solid/react";
import { Redirect } from "react-router-dom";
import FC from 'solid-file-client';
import auth from 'solid-auth-client';
import {NotificationContainer, NotificationManager} from "react-notifications";



export const DownloadTrack = props => {

    const { t } = useTranslation();

    const fc = new FC(auth);

    var urlGlobal="";
    function setGlobal(newUrl){
        urlGlobal = newUrl;
    }

    async function downloadRoute(name){
        var file = await fc.readFile(urlGlobal);
        var blob = new Blob([file], {type: 'application/json'});
        console.log(file);
        var link = document.getElementById("downFile");
        link.href= URL.createObjectURL(blob);
        link.download=name+".json";
        link.click();

    }


    async function searchRoute() {
        const auth = require('solid-auth-client');
        auth.trackSession(session => {
            if (!session) {
                return;
            } else {
                var txt = document.getElementById("txtUrl").value;

                let webId = session.webId;
                let urlRoute = webId.slice(0, webId.length - 15).concat("public/MyRoutes/"+ txt +".json");
                setGlobal(urlRoute);
                downloadRoute(txt)
                .catch(err => NotificationManager.error(t('download.errorMessage'), t('download.errorTitle'), 5500));
            }
        }); 
    }


    return(
        <section>
            <LoggedIn>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{t('download.title')}</h2>
                        </div>
                        <div className="modal-body">
                            <h4>{t('download.instruction')}</h4>
                            <input id = "txtUrl" type="text"></input>
                        </div>
                        <div className="modal-footer">
                            <a href="" id="downFile"> </a>
                            <Button onClick={searchRoute} > {t('download.button')}</Button>
                        </div>
                    </div>
                </div>
                <NotificationContainer/>
            </LoggedIn>
            <LoggedOut>
                <Redirect to="/"></Redirect>
            </LoggedOut>
        </section>
    );
}

export default DownloadTrack;