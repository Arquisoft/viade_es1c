import React from "react";
import ReactDOM from "react-dom";
import DownloadPanel  from "../components/containers/downloadTracks/children/DownloadPanel";
import { fireEvent, render, waitForDomChange } from "@testing-library/react";
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
 * Test the download panel has all his subcomponents and download tracks
 */
it("DownloadPanel -> Renders download correctly and download tracks", async () => {
    const {getByTestId} = render(<DownloadPanel service={dService}></DownloadPanel>);
    expect(getByTestId("downloadComp"));
    expect(getByTestId("titleDownloadh2"));
    expect(getByTestId("instruction"));
    expect(getByTestId("btnDownload"));
    getByTestId("btnDownload").click();
    expect(getByTestId("btnLoadTracks"));
    getByTestId("btnLoadTracks").click();
    await waitForDomChange(() => {
        expect(getByTestId("combo"));
    });
    fireEvent.change(getByTestId("combo"), { target: { value: "Ruta1" }, });
    expect(getByTestId("btnDownload"));
    getByTestId("btnDownload").click();
    fireEvent.change(getByTestId("combo"), { target: { value: "Ruta2" }, });
    expect(getByTestId("btnDownload"));
    getByTestId("btnDownload").click();
    fireEvent.change(getByTestId("combo"), { target: { value: "Ruta3" }, });
    expect(getByTestId("btnDownload"));
    getByTestId("btnDownload").click();
});