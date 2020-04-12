import React from "react";
import { useWebId } from "@inrupt/solid-react-components";
import MyFriends from "./children/MyFriends";

export const Friends = () => {
  const webId = useWebId();

  return (
    <MyFriends myWebId={webId}/>
  );
};

export default Friends;