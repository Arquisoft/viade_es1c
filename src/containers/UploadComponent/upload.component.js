import React from "react";
import { UploadWrapper, H1, MyInput,Button } from './upload.style';
import { useTranslation } from "react-i18next";

import UploadToPod from '../UploadPod/uploadToPod';
import {SolidFileClient} from "solid-file-client";

const auth = require("solid-auth-client");
 const file=require("solid-file-client");

export const UploadComponent = props => {
  const { t } = useTranslation();
  const userWebId="https://raquel.solid.community/profile/card#me";
  const uploader = new UploadToPod(auth.fetch);

	//const fileC=new SolidFileClient(file.fe);

  return(
     <UploadWrapper>
       <H1>{t('upload.title')}</H1>
       <MyInput type="file"/>
	            
	<Button className="ids-link-filled" onClick={
		SolidFileClient.createFile("https://raquel.solid.community/private/n2.txt",
		"Esto es una prueba de ASW",
		'text/plain', 'LINKS.INCLUDE')
		
	}>
				{t("Añadir al pod")}
     </Button>
     </UploadWrapper>
	
	 
	 
  );
}



export default UploadComponent;