import React from "react";
import { UploadWrapper, H1, MyInput,Button } from './upload.style';
import { useTranslation } from "react-i18next";
import FC from 'solid-file-client';
import auth from 'solid-auth-client';

export const UploadComponent = props => {

  const { t } = useTranslation();

  async function processItem(item){
    var reader = new FileReader();
      var nameFile = item.name;
      reader.onload = function(event){
        var fileContent = reader.result;
        const auth = require('solid-auth-client');
        auth.trackSession(session => {
          if (!session) {
            return;
          } else {
            /*
              15 == length("profile/card#me")
            */
            var webId = session.webId;
            var urlRouteInPod = webId.slice(0, webId.length - 15).concat("public/MyRoutes/").concat(nameFile);

            event.preventDefault();

            const fc = new FC(auth);

            fc.createFile(urlRouteInPod, fileContent, "text/turtle", {}).then((content) => {
              alert("se subio");
            })
            .catch(err => console.error(`Error: ${err}`))
          }
        });
      }
      reader.readAsText(item);
  }

  async function processArray(array) {
    array.forEach(async (item) => {
      await processItem(item);
    })
  }

  async function upload(){
    const fileInput = document.getElementById('fileArea');
    const files = fileInput.files;
    await processArray(files);
  }
	
  return(
    <UploadWrapper>
      <H1>{t('upload.title')}</H1>
      <MyInput type="file" id="fileArea" multiple/>     
        <Button className="ids-link-filled" onClick={upload}>
        {t('upload.button')}
        </Button>
    </UploadWrapper>
  );
}

export default UploadComponent;