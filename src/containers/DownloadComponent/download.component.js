import React from "react";
import { DownloadWrapper, H1, H3, Button, Input } from './download.style';
import { useTranslation } from "react-i18next";
import SolidAuth from 'solid-auth-client';



export const DownloadComponent = props => {
  const { t } = useTranslation();
  //const doc = SolidAuth.fetch('https://sandracast.solid.community/rutaDePrueba.json');
  return(
    <DownloadWrapper>
      <H1>{t('download.title')}</H1>
      <H3>{t('download.instruction')}</H3>
      <Input type="text"></Input>
      <Button className="ids-link-filled" > {t('download.button')}</Button>
    </DownloadWrapper>
    
  );
  
}

export default DownloadComponent;