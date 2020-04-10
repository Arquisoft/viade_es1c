import React from "react";
import ReactDOM from "react-dom";
import VisualizeTrack from "../components/containers/visualizeTracks/VisualizeTrack";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

it("renders without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<VisualizeTrack></VisualizeTrack>, div);
})

it("renders button correctly", () => {
    const {getByTestId} =render(<VisualizeTrack></VisualizeTrack>);
    expect(getByTestId("visualizeTest"));
});
