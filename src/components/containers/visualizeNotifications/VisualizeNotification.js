import React from 'react';
import {useTranslation} from "react-i18next";
import {LoggedOut, LoggedIn} from '@solid/react';
import { Redirect} from "react-router-dom";
import NotificationsTable  from "./children/notificationsTable/NotificationsTable";
import "./VisualizeNotifications.css";
import {HashRouter} from "react-router-dom";

export const VisualizeNotification = (props) => {
  // Hook for i18n
  const {t} = useTranslation();

  return (
    <section data-testid="visualizeNotificationTest">
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
        <HashRouter> <Redirect to="/"></Redirect> </HashRouter>
      </LoggedOut>
    </section>
  );
}

export default VisualizeNotification;