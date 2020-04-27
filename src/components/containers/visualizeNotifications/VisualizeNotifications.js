import React from 'react';
import {useTranslation} from "react-i18next";
import NotificationsTable  from "./children/NotificationsTable";
import "./VisualizeNotifications.css";
import { useWebId } from "@inrupt/solid-react-components";
import NotificationsService from "../../../services/NotificationsService";

export const VisualizeNotifications = () => {
  // Hook for i18n
  const {t} = useTranslation();
  const webId = useWebId();

  return (
    <section>
        <div className="modal-div">
          <div className="modal-appearance">
            <div className="modal-header">
              <h2>{t("notifications.title")}</h2>
            </div>
            <div className="modal-body">
              <NotificationsTable myWebId={webId} service={new NotificationsService()}/>
            </div>
          </div>
        </div>
    </section>
  );
};

export default VisualizeNotifications;