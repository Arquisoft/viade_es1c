import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "../../utils/select/Select";
import { Button } from "react-bootstrap";
import { NotificationContainer } from "react-notifications";
import "./ShareTrack.css";
import { LoggedIn, LoggedOut } from "@solid/react";
import { Redirect } from "react-router-dom";
import FriendList from "./children/FriendList";

const data = ["Ruta1", "Ruta2", "Ruta3"];

const ShareTrack = ({ webId, sendNotification, contact, setContact }: Props) => {
  const { t } = useTranslation();

  const reset = () => {
    deshabilita();
  };

  const deshabilita = () => {
    alert("No esta disponible");
  };

  /**
   * --- NEED TO BE CHANGE ---
   */

  /* const onSubmit = async e => {
      try {
          e.preventDefault();

          if (!contact || contact === '') {
              return;
          }

          if (webId === contact) {
              return;
          }

      } catch (e) {
      }
  }; */


  return (
    <section>
      <LoggedIn>
        <div className="modal-dialog">
          <div onSubmit={deshabilita} className="modal-content">
            <div className="modal-header">
              <h2>{t("share.title")}</h2>
              <hr/>
            </div>
            <form className="modal-body">
              <span>{t("share.createSharePrompt")}</span>
              <div className="primera">
                <label className="lab" htmlFor="documentUriInput">
                  {t("share.idLabel")}
                </label>
                <Select className="select-share" options={data}/>
              </div>
              <div className="list-friends">
                <h4 className="h4-format">{t("share.friends")}</h4>
                <FriendList src="user.friends"></FriendList>
              </div>
              <div>
                <Button className="correct-margin" type="submit" data-testid="form-submit">
                  {t("share.shareTrack")}
                </Button>
                <Button className="correct-margin" onClick={reset}>
                  {t("share.resetShareForm")}
                </Button>
              </div>
            </form>
          </div>
        </div>
        <NotificationContainer/>
      </LoggedIn>
      <LoggedOut>
        <Redirect to="/"></Redirect>
      </LoggedOut>
    </section>
  );
};

export default ShareTrack;