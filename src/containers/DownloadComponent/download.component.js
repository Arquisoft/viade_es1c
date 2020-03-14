import React from "react";
import { DownloadWrapper, H1, MyInput } from './download.style';
import { useTranslation } from "react-i18next";


export const DownloadComponent = props => {
  const { t } = useTranslation();
  return(
    <DownloadWrapper>
      <H1>{t('download.title')}</H1>
      <MyInput type="file"/>
      <button type="button">Boton Prueba</button>
    </DownloadWrapper>
  );
}

export default DownloadComponent;