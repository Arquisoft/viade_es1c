import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "../../utils/select/Select";
import { Button } from "react-bootstrap";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "./ShareTrack.css";
import { LoggedIn, LoggedOut } from "@solid/react";
import { Redirect } from "react-router-dom";
import FriendList from "./children/FriendList";
import ShareService from "../../../services/ShareService";
import ldflex from "@solid/query-ldflex";
import { useNotification, useWebId } from '@inrupt/solid-react-components';


export const ShareTrack = (props) => {

  // i18n locales
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  const webId = useWebId();
  const { createNotification, discoverInbox } = useNotification(
    webId
  );

  /**
   * Send a notification to the receiver of the track
   * @param userWebId - WebId of the receiver
   * @returns {Promise<void>}
   */
  const sendNotification = async (userWebId) => {
    try {
      const inboxUrl = await discoverInbox(userWebId);
      if (!inboxUrl) {
        throw new Error('Inbox not found');
      }
      createNotification(
        {
          title: 'Share notification',
          summary: 'Your friend '.concat(webId).concat(', shared a track with you'),
          actor: webId
        },
        inboxUrl
      );
    } catch (ex) {
      console.log(ex);
    }
  };

  /**
   * Upload the share track and send a notification to the receiver
   * @returns {Promise<void>}
   */
  async function handleUpload(){
    let friends = document.getElementsByName("friendlist");
    let buttons = document.getElementsByName("friend");
    let friendsWebIds = [];
    for (let i = 0; i < buttons.length; i++){
      if (buttons[i].checked){
        friendsWebIds.push(friends[i].innerText);
      }
    }
    let HTMLElement = document.getElementById("selectRoute");
    if (friendsWebIds.length > 0){
      for (let i=0 ; i < friendsWebIds.length; i++){
        let userWebId = friendsWebIds[i];
        let name = await ldflex[userWebId].name;
        let sService = new ShareService(friendsWebIds[i], HTMLElement);
        await sService.shareTrack();
        if (sService.successShare === true){
          NotificationManager.success(t("share.successShareMessage"), t("share.successShareTitle"), 2000);
          await sendNotification(userWebId);
        } else if (sService.warning === true){
          NotificationManager.warning(t("share.warningShareMessage").concat(name), t("share.warningShareTitle"), 5000);
        } else {
          if (sService.error === "Error en el create"){
            NotificationManager.error(t("share.errorCreateMessage"), t("share.errorCreateTitle"), 5000);
          } else if(sService.error === "Permisos denegados"){
            NotificationManager.error(t("share.errorPermissionMessage"), t("share.errorPermissionTitle"), 5000);
          } else {
            NotificationManager.warning(t("share.warningDeleteMessage").concat(name), t("share.warningDeleteTitle"), 5000);
          }
        }
      }
    } else {
      NotificationManager.error(t("share.errorFriends"), t("share.errorFriendsTitle") , 5000);
    }
  }

  /**
   * Load tracks to select component
   * @returns {Promise<void>}
   */
  async function handleLoad(){
    let sService = new ShareService(null);
    await sService.getRoutesFromPod();
    setData(sService.routes);
  }

  handleLoad(); // To upload tracks to select component

  return (
    <section>
      <LoggedIn>
        <div className="modal-dialog">
          <div onSubmit={handleUpload} className="modal-content">
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
                <Button className="correct-margin">
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