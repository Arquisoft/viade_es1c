import React from "react";
import { useWebId } from "@inrupt/solid-react-components";
import MyFriends from "./children/MyFriends";
import FriendsService from "../../../services/FriendsService";

export const Friends = () => {
  const webId = useWebId();

  return (
    <MyFriends myWebId={webId} service={new FriendsService()}/>
  );
};

export default Friends;