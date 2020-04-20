import React from "react";
import ReactDOM from "react-dom";
import DownloadPanel  from "../components/containers/downloadTracks/children/DownloadPanel";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DownloadService from "./mocks/DownloadService";
import DownloadTrack  from "../components/containers/downloadTracks/DownloadTrack";

let dService = new DownloadService();

it("Download -> renders DownloadPanel without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<DownloadPanel service={dService}></DownloadPanel>, div);
});

it("Download -> renders DownloadTrack without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<DownloadTrack></DownloadTrack>, div);
});

it("Download -> renders download correctly", () => {
    const {getByTestId} = render(<DownloadPanel service={dService}></DownloadPanel>);
    expect(getByTestId("downloadComp"));
    expect(getByTestId("titleDownloadh2"));
    expect(getByTestId("instruction"));
    expect(getByTestId("inputUrl"));
    expect(getByTestId("extension"));
    expect(getByTestId("btnDownload"));
    getByTestId("btnDownload").click();
});

//it("Download -> component download has the correct subComponents", () => {
//    expect(document.getElementsByClassName("modal-dialog")).toBeTruthy();
//    expect(document.getElementsByClassName("modal-content")).toBeTruthy();
//    expect(document.getElementsByClassName("modal-header")).toBeTruthy();
//    expect(document.getElementsByClassName("modal-body")).toBeTruthy();
//    expect(document.getElementsByClassName("modal-footer")).toBeTruthy();
//});
