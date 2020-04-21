import React from "react";
import DownloadService from "../../../services/DownloadService";
import DownloadPanel from "./children/DownloadPanel";

export const DownloadTrack = () => {

  return (
    <DownloadPanel service={new DownloadService()}/>
  );
};

export default DownloadTrack;