import React from "react";
import { UploadWrapper, H1, MyInput,Button } from './upload.style';
import { useTranslation } from "react-i18next";

const Uploader = require("./UploadPod/uploadToPod.js");
const auth = require("solid-auth-client");

export const UploadComponent = props => {
  const { t } = useTranslation();
  const userWebId="raquel";
  this.uploader = new Uploader(auth.fetch);
  return(
     <UploadWrapper>
       <H1>{t('upload.title')}</H1>
       <MyInput type="file"/>
	            
	<Button className="ids-link-filled" onClick={userWebId.replace("profile/card#me", "private/prueba.txt"),"Esto es una prueba de ASW"}>
				{t("Añadir al pod")}
     </Button>
     </UploadWrapper>
	
	 
	 
  );
}



export default UploadComponent;