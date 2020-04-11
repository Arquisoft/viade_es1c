import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import { LoggedIn, LoggedOut } from "@solid/react";
import { Redirect} from "react-router-dom";
import { NotificationContainer, NotificationManager } from "react-notifications";
import DownloadService from "../../../services/DownloadService";
import {HashRouter} from "react-router-dom";

export const DownloadTrack = props => {

  // Locales for i18n
  const { t } = useTranslation();

  /**
   * Download the corresponding track entered by the user in the textField
   */
  async function handleDownload() {
    let dService = new DownloadService(document.getElementById("downFile"),
      document.getElementById("txtUrl").value);
    await dService.searchTrack();
    if (dService.error != null) {
      NotificationManager.error(t("download.errorMessage"), t("download.errorTitle"), 5500)
    }
  }

  return (
    <section data-testid="downloadComp">
      <LoggedIn>
        <div className="modal-dialog" >
          <div className="modal-content">
            <div className="modal-header">
              <h2>{t("download.title")}</h2>
            </div>
            <div className="modal-body">
              <h4>{t("download.instruction")}</h4>
              <input id="txtUrl" type="text"></input>
              <br/>
              <i>{t("download.especificacion")}</i>
            </div>
            <div className="modal-footer">
              <a href="/download" id="downFile"> </a>
              <Button onClick={handleDownload}> {t("download.button")}</Button>
            </div>
          </div>
        </div>
        <NotificationContainer/>
      </LoggedIn>
      <LoggedOut>
        <HashRouter><Redirect to="/"></Redirect></HashRouter>
      </LoggedOut>
    </section>
  );
};

export default DownloadTrack;