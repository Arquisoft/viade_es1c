import React from "react";
import { UploadWrapper, H1, MyInput } from './upload.style';
import { useTranslation } from "react-i18next";


export const UploadComponent = props => {
  const { t } = useTranslation();
  return(
    <UploadWrapper>
      <H1>{t('upload.title')}</H1>
      <MyInput type="file"/>
    </UploadWrapper>
  );
}

export default UploadComponent;