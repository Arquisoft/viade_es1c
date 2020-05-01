import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import { NotificationContainer, NotificationManager } from "react-notifications";
import FriendList from "../../../../utils/friendList/FriendList";
import "./MyFriendGroups.css";
import { useNotification } from "@inrupt/solid-react-components";
import FriendGroupService from "../../../../../services/FriendGroupService";

export const MyFriendGroups = ({ myWebId, service }) => {

  // i18n locales
  const { t } = useTranslation();
  const webId = myWebId;
  const { createNotification, discoverInbox } = useNotification(
    webId
  );

  // For friends web id (create new group)
  let friendsWebIds = [];

  /**
   * Clear all fields
   * @param buttons
   */
  function clear(buttons) {
    document.getElementById("groupId").value = "";
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[parseInt(i)].checked) {
        buttons[parseInt(i)].checked = false;
      }
    }
  }

  /**
   * Send a notification to the user in the new group
   * @returns {Promise<void>}
   */
  const sendNotification = async (content) => {
    try {
      if (friendsWebIds.length > 0) {
        for (let i = 0; i < friendsWebIds.length; i++) {
          const inboxUrl = await discoverInbox(friendsWebIds[parseInt(i)]);
          if (!inboxUrl) {
            throw new Error("Inbox not found");
          }
          createNotification(
            {
              title: "Group notification",
              summary: content,
              actor: webId
            },
            inboxUrl
          );
        }
      }
    } catch (ex) {
      NotificationManager.error(t("notifications.notificationErrorMessage"), t("notifications.notificationErrorTitle"), 3000);
    }
  };

  /**
   * Add a new friend
   * @returns {Promise<void>}
   */
  async function createGroup() {
    let gService = service;
    if (gService instanceof FriendGroupService) {
      gService = new FriendGroupService();
    }
    let friendGroup = document.getElementById("groupId").value;
    let friends = document.getElementsByName("friendListGroup");
    let buttons = document.getElementsByName("friendGroup");
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[parseInt(i)].checked) {
        friendsWebIds.push(friends[parseInt(i)].innerText);
      }
    }
    if (typeof (friendGroup) !== "undefined" && friendsWebIds.length > 0) {
      if (friendGroup.localeCompare("") !== 0) {
        await gService.create(friendGroup, friendsWebIds);
        if (gService.success === true) {
          NotificationManager.success(t("groups.createSuccessMessage1").concat(friendGroup).concat(t("groups.createSuccessMessage2")),
            t("groups.createSuccessTitle"), 3000);
          let text = "User: ".concat(webId).concat(", added you to his/her group: ").concat(friendGroup);
          await sendNotification(text);
          friendsWebIds = [];
          clear(buttons);
        } else {
          NotificationManager.error(t("groups.permissionsErrorMessage"), t("groups.createErrorTitle"), 3000);
        }
      } else {
        NotificationManager.error(t("groups.createErrorMessage"), t("groups.createErrorTitle"), 3000);
      }
    } else {
      NotificationManager.error(t("groups.createErrorMessage"), t("groups.createErrorTitle"), 3000);
    }
  }

  return (
    <div data-testid="groupTest">
      <div className="modal-app">
        <div className="modal-header">
          <h2>{t("groups.title")}</h2>
          <hr/>
        </div>
        <div className="modal-body">
          <span className="span-friends">{t("groups.addTitle")}</span>
          <div className="add-groups">
            <input data-testid="input-create-group" className="input-add" id="groupId" type="text"
                   placeholder="e.g. trekking"></input>
          </div>
          <br/>
          <span className="span-friends-group">{t("groups.addToGroupTitle")}</span>
          <div className="list-friends">
            <FriendList src="user.friends" nameList="friendListGroup" nameCk="friendGroup"></FriendList>
          </div>
          <div>
            <Button data-testid="btnCreateGroup" className="correct-margin" onClick={createGroup}>
              {t("groups.add")}
            </Button>
          </div>
        </div>
      </div>
      <NotificationContainer/>
    </div>
  );
};

export default MyFriendGroups;