import React from "react";
import ReactDOM from "react-dom";
import DownloadPanel  from "../components/containers/downloadTracks/children/DownloadPanel";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DownloadService from "./mocks/DownloadService";
import DownloadTrack  from "../components/containers/downloadTracks/DownloadTrack";

// Initializing values
let dService = new DownloadService();

/**
 * Father renders OK
 */
it("DownloadTrack -> renders DownloadTrack without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<DownloadTrack></DownloadTrack>, div);
});

/**
 * Child renders OK
 */
it("DownloadPanel --> Renders DownloadPanel without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<DownloadPanel service={dService}></DownloadPanel>, div);
});

/**
 * Checking components from DownloadPanel
 */
it("DownloadPanel --> Renders DownloadPanel correctly", () => {
    const {getByTestId} = render(<DownloadPanel service={dService}></DownloadPanel>);
    expect(getByTestId("downloadComp"));
    expect(getByTestId("titleDownloadh2"));
    expect(getByTestId("instruction"));
    expect(getByTestId("inputUrl"));
    expect(getByTestId("extension"));
    expect(getByTestId("btnDownload"));
    getByTestId("btnDownload").click();
});