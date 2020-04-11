import React from "react";
import ReactDOM from "react-dom";
import ShareTrack from "../components/containers/shareTracks/ShareTrack";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

it("renders without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<ShareTrack></ShareTrack>, div);
})

it("renders button correctly", () => {
    const {getByTestId} =render(<ShareTrack></ShareTrack>);
    expect(getByTestId("shareTrackTest"));
});
