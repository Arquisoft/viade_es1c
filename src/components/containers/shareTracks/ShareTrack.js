import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "../../utils/select/Select";
import { Button } from "react-bootstrap";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "./ShareTrack.css";
import { LoggedIn, LoggedOut } from "@solid/react";
import { Redirect, BrowserRouter as Router } from "react-router-dom";
import FriendList from "./children/friendList/FriendList";
import ShareService from "../../../services/ShareService";
import ldflex from "@solid/query-ldflex";
import { useNotification, useWebId } from '@inrupt/solid-react-components';


let timesLoad = 0; // For handleLoad()

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
      let HTMLElement = document.getElementById("selectRoute");
      createNotification(
        {
          title: 'Share notification',
          summary: 'Your friend: '.concat(webId)
            .concat(', shared this track with you: ')
            .concat(HTMLElement.value),
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
    if (sService.errorLoad === null) {
      setData(sService.routes);
    } else if (timesLoad === 0) {
      NotificationManager.warning(t("share.warningLoadMessage"), t("share.warningLoadTitle"), 3000);
      timesLoad++;
    }
  }

  /**
   * Clean all selected items
   */
  function handleClean() {
    let selected = document.getElementById("selectRoute");
    selected.selectedIndex = 0;
    let buttons = document.getElementsByName("friend");
    for (let i = 0; i < buttons.length; i++){
      if (buttons[i].checked){
        buttons[i].checked = false;
      }
    }
  }

  handleLoad(); // To upload tracks to select component

  return (
    <section data-testid="shareTrackTest">
      <LoggedIn>
        <div className="modal-div">
          <div className="modal-content">
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
                <Button className="correct-margin" onClick={handleUpload}>
                  {t("share.shareTrack")}
                </Button>
                <Button className="correct-margin" onClick={handleClean}>
                  {t("share.resetShareForm")}
                </Button>
              </div>
            </form>
          </div>
        </div>
        <NotificationContainer/>
      </LoggedIn>
      <LoggedOut>
        <Router>	<Redirect to="/"></Redirect>	</Router>
      </LoggedOut>
    </section>
  );
};

export default ShareTrack;