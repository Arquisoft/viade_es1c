import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "../../utils/select/Select";
import { Button } from "react-bootstrap";
import { NotificationContainer } from "react-notifications";
import "./ShareTrack.css";
import { LoggedIn, LoggedOut } from "@solid/react";
import { Redirect } from "react-router-dom";
import FriendList from "./children/FriendList";
import ShareService from "../../../services/ShareService";


export const ShareTrack = (props) => {

  // i18n locales
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  const reset = () => {
    deshabilita();
  };

  function deshabilita(){
    alert("no disponible");
  }

  async function handleUpload(){
    let sService = new ShareService(document.getElementById("selectRoute"));
    await sService.shareTrack();
  }

  async function handleLoad(){
    let sService = new ShareService(null);
    await sService.getRoutesFromPod();
    setData(sService.routes);
  }

  handleLoad(); // To upload tracks to select component

  return (
    <section>
      <LoggedIn>
        <div className="modal-div">
          <div onSubmit={handleUpload} className="modal-content">
            <div className="modal-header">
              <h2>{t("share.title")}</h2>
              <hr/>
            </div>
            <form className="modal-body">
              <span>{t("share.createSharePrompt")}</span>
              <div>
                <label className="lab" htmlFor="documentUriInput">
                  {t("share.idLabel")}
                </label>
                <Select className="select-share" id={"selectRoute"} options={data}/>
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