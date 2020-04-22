import React from "react";
import { useTranslation } from "react-i18next";
import "react-notifications/lib/notifications.css";
import { NotificationContainer, NotificationManager } from "react-notifications";
import { Button } from "react-bootstrap";
import "./UploadPanel.css";
import UploadService from "../../../../services/UploadService";


export const UploadPanel = ({service}) => {
  // Locales for i18n
  const { t } = useTranslation();

  /**
   * Upload the track chosen by the user through the input file
   */
  async function handleUpload(){
    let uService = service;
    if (uService instanceof UploadService) {
      uService = new UploadService();
    }
    await uService.handleUpload(document.getElementById("fileArea"));
    if (uService.success) {
      NotificationManager.success(t("upload.successMessage"), t("upload.successTitle"), 2000);
      document.getElementById("fileArea").value = ""; // Clear input file
    } else if (uService.error) {
      NotificationManager.error(t("upload.errorMessage"), t("upload.errorTitle"), 3000);
    } else if (document.getElementById("fileArea").value === "") {
      NotificationManager.error(t("upload.errorEmptyMessage"), t("upload.errorTitle"), 3000);
    } else if (uService.errorPermissions) {
      NotificationManager.error(t("upload.errorPermissionsMessage"), t("upload.errorTitle"), 3000);
    }
  }

  return (
    <section data-testid="uploadTrackTest">
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
            <Button data-testid="btnUpload" onClick={handleUpload}>
              {t("upload.button")}
            </Button>
          </div>
        </div>
        <NotificationContainer/>
      </div>
    </section>
  );
};

export default UploadPanel;