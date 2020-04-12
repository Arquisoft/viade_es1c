import React from "react";
import ReactDOM from "react-dom";
import VisualizeTrack from "../components/containers/visualizeTracks/VisualizeTrack";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

it("VisualizeTrack -> renders without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<VisualizeTrack></VisualizeTrack>, div);
});

it("VisualizeTrack -> renders visualize correctly", () => {
    const {getByTestId} =render(<VisualizeTrack></VisualizeTrack>);
    expect(getByTestId("visualizeTest")).toBeTruthy();
});

it("VisualizeTrack -> component visualizeTrack has the correct subComponents", () => {
    
    const {getByTestId} =render(<VisualizeTrack></VisualizeTrack>);
    expect(getByTestId("containerVisualTest")).toBeTruthy();
    expect(getByTestId("btn1VTest")).toBeTruthy();
    expect(getByTestId("btn2VTest")).toBeTruthy();
    getByTestId("btn2VTest").click();

    
});
