import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import { NotificationContainer, NotificationManager } from "react-notifications";
import FriendGroup from "./friendGroup/FriendGroup";
import "./MyFriendGroups.css";
import { useNotification } from "@inrupt/solid-react-components";

export const MyFriendGroups = ({myWebId, service}) => {

  // i18n locales
  const { t } = useTranslation();
  const webId = myWebId;
  const { createNotification, discoverInbox } = useNotification(
    webId
  );

  /**
   * Add a new friend
   * @returns {Promise<void>}
   */
  async function addFriend() {
    let fService = service;
    let friendWebId = document.getElementById("friendId").value;
    let checkFriend = await fService.check(friendWebId);
    if (friendWebId !== undefined) {
      if (await fService.exists(friendWebId) && friendWebId.localeCompare("") !== 0) {
        if (checkFriend) {
          NotificationManager.error(t("friends.checkErrorMessage"), t("friends.addErrorTitle"), 3000);
        } else {
          await fService.add(friendWebId);
          let text = 'User: '.concat(webId).concat(', added you to his/her friend list');
          await sendNotification(friendWebId, text);
          window.location.reload(true);
        }
      } else  {
        NotificationManager.error(t("friends.addErrorMessage"), t("friends.addErrorTitle"), 3000);
      }
    }
  }

  /**
   * Send a notification to the added / deleted user
   * @param userWebId - WebId of the receiver
   * @returns {Promise<void>}
   */
  const sendNotification = async (userWebId, summary) => {
    try {
      const inboxUrl = await discoverInbox(userWebId);
      if (!inboxUrl) {
        throw new Error('Inbox not found');
      }
      createNotification(
        {
          title: 'Group notification',
          summary: summary,
          actor: webId
        },
        inboxUrl
      );
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
        <div>
          <div className="modal-app">
            <div className="modal-header">
              <h2>{t("groups.title")}</h2>
              <hr/>
            </div>
            <div className="modal-body">
              <span className="span-friends">{t("groups.addTitle")}</span>
              <div className="add-groups">
                <input data-testid="input-add" className="input-add" id="groupId" type="text" placeholder="e.g. senderismo"></input>
              </div>
              <br/>
              <span className="span-friends-group">{t("groups.addToGroupTitle")}</span>
              <div className="list-friends">
                <FriendGroup src="user.friends"></FriendGroup>
              </div>
              <div>
                <Button data-testid="btnAddFriend" className="correct-margin" onClick={addFriend}>
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