import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UploadPanel from "../components/containers/uploadTracks/children/UploadPanel";
import UploadService from "./mocks/UploadService";
import uploadTracks, { UploadTrack } from "../components/containers/uploadTracks/UploadTrack";

let uService = new UploadService();

/**
 * UploadPanel renders correctly
 */
it("UploadTrack --> renders UploadPanel without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<UploadPanel service={uService}></UploadPanel>, div);
});

/**
 * UploadTarck renders correctly
 */
it("UploadTrack --> renders UploadTrack without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<UploadTrack></UploadTrack>, div);
});

/**
 * Test button Upload
 */
it("UploadTrack --> renders button correctly", () => {
    const {getByTestId} =render(<UploadPanel service={uService}></UploadPanel>);
    expect(getByTestId("uploadTrackTest"));
    expect(getByTestId("btnUpload"));
    getByTestId("btnUpload").click();
});
