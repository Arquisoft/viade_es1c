import React from "react";
import VisualizeService from "../../../services/VisualizeService";
import VisualizePanel from "./children/VisualizePanel";

export const VisualizeTrack = () => {

    return (
      <VisualizePanel service={new VisualizeService()}/>
    );
};

export default VisualizeTrack;