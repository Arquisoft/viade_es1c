import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import { NotificationContainer, NotificationManager } from "react-notifications";
import DownloadService from "../../../../services/DownloadService";
import { Select } from "../../../utils/select/Select";
import "./DownloadPanel.css";

export const DownloadPanel = ({service}) => {

  // Locales for i18n
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  /**
   * Loads tracks name from POD
   */
  async function handleLoad() {
    let dService = service;
    if (dService instanceof DownloadService) {
      dService = new DownloadService();
    }
    await dService.getRoutesFromPod();
    if (dService.warning !== null){
      NotificationManager.warning(t("download.loadWarningMessage"), t("download.loadWarningTitle"), 3000);
    } else if (dService.errorLoad)  {
      NotificationManager.error(t("download.errorLoadMessage"), t("download.errorLoadTitle"), 3000);
    } else {
      NotificationManager.success(t("download.successLoadMessage"), t("download.successLoadTitle"), 2000);
      setData(dService.routes);
    }
  }

  /**
   * Download the corresponding track entered by the user in the textField
   */
  async function handleDownload() {
    let dService = service;
    if (dService instanceof DownloadService) {
      dService = new DownloadService();
    }
    await dService.searchTrack(document.getElementById("selectRoute").value,
      document.getElementById("downFile"));
    if (dService.error !== null) {
      NotificationManager.error(t("download.errorMessage"), t("download.errorTitle"), 5500);
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
            <Button data-testid="btnLoadTracks" className="loadButton" onClick={handleLoad}>
              {t("download.buttonLoad")}
            </Button>
            <h4 data-testid="instruction" placeholder="e.g. track1">{t("download.instruction")}</h4>
            <Select data-testid="combo" className="select-load-format" id={"selectRoute"} options={data}/>
            <br/>
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