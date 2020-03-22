import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from 'react-bootstrap';
import {LoggedIn, LoggedOut } from "@solid/react";
import { Redirect } from "react-router-dom";
import FC from 'solid-file-client';
import auth from 'solid-auth-client';

const fc = new FC(auth);


export async function downloadRoutes(url){
  var urlFolder = fc.readFolder(url);
  var routes = new Array();
  //console.log(routes);
  urlFolder.then(function(result, routes){
    var i;
    for(i=0; i<result.files.length;i++){
      var urlR=fc.readFile(result.files[i].url);
      urlR.then(function(txt){
        console.log(txt);
      });
    } 
  });
}

function getUrl(){
  var txt = document.getElementById("txtUrl");
  return txt.value;
}

async function searchRoute() {
  var url = getUrl();
  downloadRoutes(url);
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