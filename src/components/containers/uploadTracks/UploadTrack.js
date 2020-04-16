import React from "react";
import UploadPanel from "./children/UploadPanel";
import UploadService from "../../../services/UploadService";

export const UploadTrack = () => {

  return (
    <UploadPanel service={new UploadService()}/>
  );
};

export default UploadTrack;