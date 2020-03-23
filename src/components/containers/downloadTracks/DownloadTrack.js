import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from 'react-bootstrap';
import {LoggedIn, LoggedOut } from "@solid/react";
import { Redirect } from "react-router-dom";
import FC from 'solid-file-client';
import auth from 'solid-auth-client';

const fc = new FC(auth);


export async function getRoutes(url){
    var folder = await fc.readFolder(url);
    //console.log(folder);
    var files = new Array();
    var i;
    for(i=0;i<folder.files.length;i++)
    {
        //console.log(folder.files[i]);
        files[i]=folder.files[i];
    }
    for(i=0;i<files.length;i++)
    {
        files[i]=folder.files[i];
    }
    console.log(files);
    var file = await fc.readFile(files[1].url);
    console.log(file);
    var blob = new Blob([file], {type: 'application/json'});
    console.log(blob)

    var d = document.getElementById("downFile");
    d.href= URL.createObjectURL(blob);
    d.download="prueba.json";
    d.click();
    console.log(d);
}

function getUrl(){
  var txt = document.getElementById("txtUrl");
  return txt.value;
}

async function searchRoute() {
  var url = getUrl();
  var routes = getRoutes(url);
  //downloadRoutes(url,routes);
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
                            <a href="" id="downFile"></a>
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