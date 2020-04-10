import React from 'react';
import {useTranslation} from "react-i18next";
import {LoggedOut, LoggedIn} from '@solid/react';
import { Redirect } from "react-router-dom";
import NotificationsTable  from "./children/notificationsTable/NotificationsTable";
import "./VisualizeNotifications.css";

export const VisualizeNotifications = (props) => {
  // Hook for i18n
  const {t} = useTranslation();

  return (
    <section>
      <LoggedIn>
        <div className="modal-div">
          <div className="modal-appearance">
            <div className="modal-header">
              <h2>{t("notifications.title")}</h2>
            </div>
            <div className="modal-body">
              <NotificationsTable/>
            </div>
          </div>
        </div>
      </LoggedIn>
      <LoggedOut>
        <Redirect to="/"></Redirect>
      </LoggedOut>
    </section>
  );
}

export default VisualizeNotifications;