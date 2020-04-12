import React from "react";
import ReactDOM from "react-dom";
import DownloadTrack  from "../components/containers/downloadTracks/DownloadTrack";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
//import {BrowserRouter as Router} from "react-router-dom";
import {HashRouter} from "react-router-dom";

it("Download -> renders without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<DownloadTrack></DownloadTrack>, div);
});

it("Download -> renders download correctly", () => {
    const {getByTestId} = render(<DownloadTrack></DownloadTrack>);
    expect(getByTestId("downloadComp"));
});

it("Download -> component download has the correct subComponents", () => {
   
});
