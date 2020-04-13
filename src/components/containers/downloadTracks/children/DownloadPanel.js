import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import { NotificationContainer, NotificationManager } from "react-notifications";

export const DownloadPanel = ({service}) => {

  // Locales for i18n
  const { t } = useTranslation();

  /**
   * Download the corresponding track entered by the user in the textField
   */
  async function handleDownload() {
    let dService = service;
    await dService.searchTrack(document.getElementById("txtUrl").value,
      document.getElementById("downFile"));
    if (dService.error != null) {
      NotificationManager.error(t("download.errorMessage"), t("download.errorTitle"), 5500)
    }
  }

  return (
    <section data-testid="downloadComp">
      <div className="modal-dialog" >
        <div className="modal-content">
          <div className="modal-header">
            <h2 data-testid="titleDownloadh2">{t("download.title")}</h2>
          </div>
          <div className="modal-body">
            <h4 data-testid="instruction">{t("download.instruction")}</h4>
            <input data-testid="inputUrl" id="txtUrl" type="text"></input>
            <br/>
            <i data-testid="extension">{t("download.especificacion")}</i>
          </div>
          <div className="modal-footer">
            <a href="/download" id="downFile"> </a>
            <Button data-testid="btnDownload" onClick={handleDownload}> {t("download.button")}</Button>
          </div>
        </div>
      </div>
      <NotificationContainer/>
    </section>
  );
};

export default DownloadPanel;