import React from "react";
import { DownloadWrapper, H1, H3, Button, Input } from './download.style';
import { useTranslation } from "react-i18next";
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
      //console.log(result.files[1]);
      //
      
  }
  );
}

function getUrl(){
  var txt = document.getElementById("txtUrl");
  return txt.value;
}

async function searchRoute() {
  var url = getUrl();
  downloadRoutes(url);
}
export const DownloadComponent = props => {
  const { t } = useTranslation();
  //const doc = SolidAuth.fetch('https://sandracast.solid.community/rutaDePrueba.json');
  return(
    <DownloadWrapper>
      <H1>{t('download.title')}</H1>
      <H3>{t('download.instruction')}</H3>
      <Input id = "txtUrl" type="text"></Input>
      <Button className="ids-link-filled" onClick={searchRoute}> 
      {t('download.button')}
      </Button>
    </DownloadWrapper>
    
  );
  
}

export default DownloadComponent;