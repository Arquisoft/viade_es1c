import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import VisualizePanel from "../components/containers/visualizeTracks/children/VisualizePanel";
import VisualizeService from "./mocks/VisualizeService";

let vService = new VisualizeService();

it("VisualizeTrack -> renders without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<VisualizePanel service={vService}></VisualizePanel>, div);
});

it("VisualizeTrack -> renders visualize correctly", () => {
    const {getByTestId} =render(<VisualizePanel service={vService}></VisualizePanel>);
    expect(getByTestId("visualizeTest")).toBeTruthy();
});

it("VisualizeTrack -> component visualizeTrack has the correct subComponents", () => {
    
    const {getByTestId} =render(<VisualizePanel service={vService}></VisualizePanel>);
    expect(getByTestId("containerVisualTest")).toBeTruthy();
    expect(getByTestId("btn1VTest")).toBeTruthy();
    expect(getByTestId("btn2VTest")).toBeTruthy();
    expect(getByTestId("combo")).toBeTruthy();

});

it("VisualizeTrack -> load button is working", () => {

    const {getByTestId} = render(<VisualizePanel service={vService}></VisualizePanel>);
    expect(getByTestId("btn1VTest")).toBeTruthy();
    getByTestId("btn1VTest").click();
    expect(getByTestId("combo")).toBeTruthy();

});
