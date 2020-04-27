import React from "react";
import SharePanel from "./children/SharePanel";
import ShareService from "../../../services/ShareService";
import FriendGroupService from "../../../services/FriendGroupService";
import { useWebId } from "@inrupt/solid-react-components";

export const ShareTrack = () => {

  const webId = useWebId();

  return (
    <SharePanel myWebId={webId} service={new ShareService()} gService={new FriendGroupService()}/>
  );
};

export default ShareTrack;