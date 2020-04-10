import React from "react";
import ReactDOM from "react-dom";
import UploadTrack from "../components/containers/uploadTracks/UploadTrack";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

it("renders without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<UploadTrack></UploadTrack>, div);
})

it("renders button correctly", () => {
    const {getByTestId} =render(<UploadTrack></UploadTrack>);
    expect(getByTestId("uploadTrackTest"));
});
