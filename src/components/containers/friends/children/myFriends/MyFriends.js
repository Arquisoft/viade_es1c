import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import { NotificationContainer, NotificationManager } from "react-notifications";
import FriendList from "../../../../utils/friendList/FriendList";
import "./MyFriends.css";
import { useNotification } from "@inrupt/solid-react-components";

export const MyFriends = ({myWebId, service}) => {

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
          if (!fService.errorAdd) {
            let text = 'User: '.concat(webId).concat(', added you to his/her friend list');
            await sendNotification(friendWebId, text);
            window.location.reload(true);
          } else {
            NotificationManager.error(t("friends.permissionsErrorMessage"), t("friends.addErrorTitle"), 3000);
          }
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
        throw new Error("Inbox not found");
      }
      createNotification(
        {
          title: "Friend notification",
          summary: summary,
          actor: webId
        },
        inboxUrl
      );
    } catch (ex) {
      console.log(ex);
    }
  };

  /**
   * Delete the selected friend
   * @returns {Promise<void>}
   */
  async function deleteFriend() {
    let fService = service;
    let friends = document.getElementsByName("friendList");
    let buttons = document.getElementsByName("friend");
    let friendsWebId = [];
    for (let i = 0; i < buttons.length; i++){
      if (buttons[i].checked){
        friendsWebId.push(friends[i].innerText);
      }
    }
    if (friendsWebId !== undefined && friendsWebId.length > 0) {
      for (let i = 0; i < friendsWebId.length; i++) {
        await fService.delete(friendsWebId[i]);
        if (!fService.errorDelete) {
          let text = 'User: '.concat(webId).concat(', deleted you from his/her friend list');
          await sendNotification(friendsWebId[i], text);
          window.location.reload(true);
        } else {
          NotificationManager.error(t("friends.permissionsErrorMessage"), t("friends.deleteErrorTitle"), 3000);
        }
      }
    } else {
      NotificationManager.error(t("friends.deleteErrorMessage"), t("friends.deleteErrorTitle"), 3000);
    }
  }

  return (
        <div data-testid="friendsTest">
          <div className="modal-app">
            <div className="modal-header">
              <h2>{t("friends.title")}</h2>
              <hr/>
            </div>
            <div className="modal-body">
              <span className="span-friends">{t("friends.addTitle")}</span>
              <div className="add-friends">
                <input data-testid="input-add" className="input-add" id="friendId" type="text" placeholder="e.g. https://user.solid.community/profile/card#me"></input>
                <Button data-testid="btnAddFriend" className="correct-margin" onClick={addFriend}>
                  {t("friends.add")}
                </Button>
              </div>
              <br/>
              <span className="span-friends">{t("friends.deleteTitle")}</span>
              <div className="list-friends">
                <FriendList src="user.friends" nameList="friendList" nameCk="friend"></FriendList>
              </div>
              <div>
                <Button data-testid="btnDeleteFriend" className="correct-margin" onClick={deleteFriend}>
                  {t("friends.delete")}
               </Button>
              </div>
            </div>
          </div>
        <NotificationContainer/>
        </div>
  );
};

export default MyFriends;