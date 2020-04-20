import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "../../../utils/select/Select";
import { Button, Row, Col } from "react-bootstrap";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "./SharePanel.css";
import FriendList from "../../../utils/friendList/FriendList";
import ldflex from "@solid/query-ldflex";
import { useNotification } from '@inrupt/solid-react-components';
import ShareService from "../../../../services/ShareService";
import FriendGroupService from "../../../../services/FriendGroupService";
import { MyGroups } from "./myGroups/MyGroups";

let timesLoad = 0; // For handleLoad()
let isSelectedFriends; // For selected filter (boolean)
let selectedFilter; // For selected filter (value)

export const SharePanel = ({myWebId, service, gService}) => {

  // i18n locales
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [showElements, setShowElements] = useState(false);
  const [showFriends, setShowFriends] = useState(true);

  const webId = myWebId;
  const { createNotification, discoverInbox } = useNotification(webId);

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
   * Handle friends/groups to share
   * @returns {Promise<void>}
   */
  async function handleFriends(){
    let friends = document.getElementsByName("friendlist");
    let buttons = document.getElementsByName("friend");
    let group = false;
    let friendsWebIds = [];
    if (selectedFilter.localeCompare("radio-2") === 0) {
      if (gService instanceof FriendGroupService){
        gService = new FriendGroupService();
      }
      group = true;
      friends = document.getElementsByName("groupList");
      buttons = document.getElementsByName("group");
    }
    for (let i = 0; i < buttons.length; i++){
      if (group) {
        if (buttons[i].checked) {
          await gService.getFriendsWebIds(friends[i].innerText);
        }
      } else {
        if (buttons[i].checked){
          friendsWebIds.push(friends[i].innerText);
        }
      }
    }
    if (group && gService.groupFriends.length > 0) {
      friendsWebIds = gService.groupFriends;
    }
    await handleShare(friendsWebIds);
  }

  /**
   * Upload the share track and send a notification to the receiver
   * @param friendsWebIds
   * @returns {Promise<void>}
   */
  async function handleShare(friendsWebIds) {
    let HTMLElement = document.getElementById("selectRoute");
    if (friendsWebIds.length > 0){
      for (let i=0 ; i < friendsWebIds.length; i++){
        let userWebId = friendsWebIds[i];
        let name = await ldflex[userWebId].name;
        let sService = service;
        if (sService instanceof ShareService) {
          sService = new ShareService();
        }
        await sService.shareTrack(friendsWebIds[i], HTMLElement);
        if (sService.successShare === true){
          NotificationManager.success(t("share.successShareMessage").concat(name), t("share.successShareTitle"), 2000);
          await sendNotification(userWebId);
        } else if (sService.warning === true){
          NotificationManager.warning(t("share.warningShareMessage").concat(name), t("share.warningShareTitle"), 5000);
        } else {
          if (sService.error === "Error en el create"){
            NotificationManager.error(t("share.errorCreateMessage").concat(name), t("share.errorCreateTitle"), 5000);
          } else if(sService.error === "Permisos denegados"){
            NotificationManager.error(t("share.errorPermissionMessage").concat(name), t("share.errorPermissionTitle"), 5000);
          } else if(sService.error === "Carpeta no encontrada"){
            NotificationManager.error(t("share.errorFriendsFolder").concat(name), t("share.errorCreateTitle"), 5000);
          }
          else {
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
    let sService = service;
    await sService.getRoutesFromPod();
    if (sService.errorLoad === null) {
      setData(sService.routes);
    } else if (timesLoad === 0) {
      NotificationManager.warning(t("share.warningLoadMessage"), t("share.warningLoadTitle"), 3000);
      timesLoad++;
    }
  }

  /**
   * Load groups from POD
   * @returns {Promise<void>}
   */
  async function handleLoadGroups(){
    if (gService instanceof FriendGroupService){
      gService = new FriendGroupService();
    }
    await gService.getGroups();
    if (gService.errorLoad === null){
      setGroupData(gService.groupsNames);
    }
  }

  /**
   * Shows friend or groups and loads tracks
   * @returns {Promise<void>}
   */
  async function handleVisualize(){
    if (document.getElementById("radio-1").checked === true) {
      selectedFilter = "radio-1";
      isSelectedFriends = true;
    } else {
      selectedFilter = "radio-2";
      isSelectedFriends = false;
    }
    if (data.length === 0) {
      await handleLoad();
    }
    if (isSelectedFriends){
      setShowFriends(true);
    } else {
      await handleLoadGroups();
      setShowFriends(false);
    }
    setShowElements(true);
    handleFilter();
  }

  /**
   * Handle filter change
   */
  function handleFilter() {
    if (selectedFilter !== undefined) {
      if (selectedFilter.localeCompare("radio-1") === 0){
        document.getElementById("radio-1").checked = true;
      } else if (selectedFilter.localeCompare("radio-2") === 0) {
        document.getElementById("radio-2").checked = true;
      }
    }
  }

  return (
    <section data-testid="shareTrackTest">
      <div className="modal-div-cont">
        <div className="modal-cont">
          <div className="modal-header">
            <h2>{t("share.title")}</h2>
            <hr/>
          </div>
          <div className="main-content">
            <span>{t("share.createSharePrompt")}</span>
            <Row className="myRow">
              <label className="radio-format" name="filter-label">
                <input data-testid="radio-1" name="filter-radio" id="radio-1" type="radio" checked={true} onChange={handleFilter}/>
                {t("share.friend")}
              </label>
              <label className="radio-format" name="filter-label">
                <input data-testid="radio-2" name="filter-radio" id="radio-2" type="radio" onChange={handleFilter}/>
                {t("share.group")}
              </label>
            </Row>
            <Button data-testid="btnLoad" className="correct-margin-top" onClick={handleVisualize}>{t("share.loadInfo")}</Button>
          </div>
          {showElements && (
              <form className="modal-body">
                <div>
                  <label className="lab">
                    {t("share.idLabel")}
                  </label>
                  <Select className="select-share" id={"selectRoute"} options={data}/>
                </div>
                <Row className="myRow">
                  {showFriends && (
                      <Col>
                        <div className="list-friends">
                          <h4 className="h4-format">{t("share.friends")}</h4>
                          <FriendList src="user.friends"></FriendList>
                        </div>
                      </Col>
                    )}
                  {!showFriends && (
                      <Col>
                        <div className="list-groups">
                          <h4 className="h4-format">{t("share.groups")}</h4>
                          <MyGroups groups={groupData}></MyGroups>
                        </div>
                      </Col>
                    )}
                </Row>
                <div>
                  <Button data-testid="btnShare" className="correct-margin" onClick={handleFriends}>
                    {t("share.shareTrack")}
                  </Button>
                </div>
              </form>
            )}
        </div>
      </div>
      <NotificationContainer/>
    </section>
  );
};

export default SharePanel;