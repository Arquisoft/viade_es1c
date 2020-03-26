import React from "react";
import { useTranslation } from "react-i18next";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from "react-notifications";
import { Button } from 'react-bootstrap';
import "./UploadTrack.css";
import LoggedIn from "@solid/react/module/components/LoggedIn";
import LoggedOut from "@solid/react/module/components/LoggedOut";
import { Redirect } from "react-router-dom";
import UploadService from "../../../services/UploadService";


export const UploadTrack = (props) => {
  // Locales for i18n
  const { t } = useTranslation();

  async function handleUpload(){
    let uService = new UploadService();

    if (await uService.handleUpload(document.getElementById("fileArea"))) {
      alert("si");
    }
    if (uService.success != null) {
      NotificationManager.success(t("upload.successMessage"), t("upload.successTitle"), 2000);
    } else if (uService.error != null) {
      NotificationManager.error(t("upload.errorMessage"), t("upload.errorTitle"), 2000);
      document.getElementById("fileArea").value = ""; // Clear input file
    }
  }

  return (
        <section>
            <LoggedIn>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>{t("upload.title")}</h2>
                    </div>
                    <div className="modal-body">
                        <span>{t("upload.uploadPrompt")}</span>
                        <input type="file" id="fileArea" multiple/>
                    </div>
                    <div className="modal-footer">
                        <Button onClick={handleUpload}>
                            {t("upload.button")}
                        </Button>
                    </div>
                </div>
                <NotificationContainer/>
            </div>
            </LoggedIn>
            <LoggedOut>
                <Redirect to="/"></Redirect>
            </LoggedOut>
        </section>
    );
};

export default UploadTrack;