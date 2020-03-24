import React from "react";
import { useTranslation } from "react-i18next";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from "react-notifications";
import { Button } from 'react-bootstrap';
import "./UploadTrack.css";
import LoggedIn from "@solid/react/module/components/LoggedIn";
import LoggedOut from "@solid/react/module/components/LoggedOut";
import { Redirect } from "react-router-dom";
import * as PodService from "../../../services/PodService";

export const UploadTrack = (props) => {
    // Locales for i18n
    const { t } = useTranslation();

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
                        <Button onClick={async () => {await PodService.handleUpload(t);}}>
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