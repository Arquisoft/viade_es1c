import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "./Friends.css";
import MyFriends from "./children/myFriends/MyFriends";
import FriendsService from "../../../services/FriendsService";
import { useNotification, useWebId } from "@inrupt/solid-react-components";

export const Friends = () => {

  // i18n locales
  const { t } = useTranslation();
  const webId = useWebId();
  const { createNotification, discoverInbox } = useNotification(
    webId
  );

  /**
   * Add a new friend
   * @returns {Promise<void>}
   */
  async function addFriend() {
    let fService = new FriendsService();
    let friendWebId = document.getElementById("friendId").value;
    let checkFriend = await fService.check(friendWebId);
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
          title: 'Friend notification',
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
    let fService = new FriendsService();
    let friends = document.getElementsByName("listFriend");
    let buttons = document.getElementsByName("friend");
    let friendWebId;
    for (let i = 0; i < buttons.length; i++){
      if (buttons[i].checked){
        friendWebId = friends[i].innerText;
      }
    }
    if (await fService.exists(friendWebId) && friendWebId.localeCompare("") !== 0) {
      await fService.delete(friendWebId);
      let text = 'User: '.concat(webId).concat(', deleted you from his/her friend list');
      await sendNotification(friendWebId, text);
      window.location.reload(true);
    } else {
      NotificationManager.error(t("friends.deleteErrorMessage"), t("friends.deleteErrorTitle"), 3000);
    }
  }

  return (
    <section data-testid="friendsTest">
        <div className="modal-div">
          <div className="modal-appearance">
            <div className="modal-header">
              <h2>{t("friends.title")}</h2>
              <hr/>
            </div>
            <div className="modal-body">
              <span className="span-friends">{t("friends.addTitle")}</span>
              <div className="add-friends">
                <input className="input-add" id="friendId" type="text" placeholder="https://user.solid.community/profile/card#me"></input>
                <Button className="correct-margin" onClick={addFriend}>
                  {t("friends.add")}
                </Button>
              </div>
              <br/>
              <span className="span-friends">{t("friends.deleteTitle")}</span>
              <div className="list-friends">
                <MyFriends src="user.friends"></MyFriends>
              </div>
              <div>
                <Button className="correct-margin" onClick={deleteFriend}>
                  {t("friends.delete")}
               </Button>
              </div>
            </div>
          </div>
        </div>
        <NotificationContainer/>
    </section>
  );
};

export default Friends;