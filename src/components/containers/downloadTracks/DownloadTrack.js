import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from 'react-bootstrap';
import {LoggedIn, LoggedOut } from "@solid/react";
import { Redirect } from "react-router-dom";
import FC from 'solid-file-client';
import auth from 'solid-auth-client';

const fc = new FC(auth);

var urlGlobal="";

function setGlobal(newUrl){
    urlGlobal = newUrl;
}

export async function downloadRoute(){
    console.log(urlGlobal);
    //var folder = await fc.readFolder(url);
    //console.log(folder);
    //var files = new Array();
    //var i;
    //for(i=0;i<folder.files.length;i++)
    //{
    //    //console.log(folder.files[i]);
    //    files[i]=folder.files[i];
    //}
    //for(i=0;i<files.length;i++)
    //{
    //    files[i]=folder.files[i];
    //}
    //console.log(files);
    var file = await fc.readFile(urlGlobal);
    console.log(file);
    var blob = new Blob([file], {type: 'application/json'});
    console.log(blob)
//
    var d = document.getElementById("downFile");
    d.href= URL.createObjectURL(blob);
    d.download="prueba.json";
    d.click();
    console.log(d);
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
            downloadRoute();
        }
    }); 
}

export const DownloadTrack = props => {
    const { t } = useTranslation();
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
            </LoggedIn>
            <LoggedOut>
                <Redirect to="/"></Redirect>
            </LoggedOut>
        </section>
    );
}

export default DownloadTrack;