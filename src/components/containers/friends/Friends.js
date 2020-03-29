import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "./Friends.css";
import { LoggedIn, LoggedOut } from "@solid/react";
import { Redirect } from "react-router-dom";
import MyFriends from "./children/MyFriends";
import FriendsService from "../../../services/FriendsService";


export const Friends = () => {

  // i18n locales
  const { t } = useTranslation();

  /**
   * Add a new friend
   * @returns {Promise<void>}
   */
  async function addFriend() {
    let fService = new FriendsService();
    let friendWebId = document.getElementById("friendId").value;
    if (await fService.check(friendWebId) && friendWebId.localeCompare("") !== 0) {
      await fService.add(friendWebId);
      window.location.reload(true);
    } else {
      NotificationManager.error(t("friends.addErrorMessage"), t("friends.addErrorTitle"), 2000);
    }
  }

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
    if (await fService.check(friendWebId) && friendWebId.localeCompare("") !== 0) {
      await fService.delete(friendWebId);
      window.location.reload(true);
    } else {
      NotificationManager.error(t("friends.deleteErrorMessage"), t("friends.deleteErrorTitle"), 2000);
    }
  }

  return (
    <section>
      <LoggedIn>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{t("friends.title")}</h2>
              <hr/>
            </div>
            <div className="modal-body">
              <span className="span-friends">{t("friends.addTitle")}</span>
              <div className="add-friends">
                <input className="input-add" id="friendId" type="text"></input>
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
      </LoggedIn>
      <LoggedOut>
        <Redirect to="/"></Redirect>
      </LoggedOut>
    </section>
  );
};

export default Friends;