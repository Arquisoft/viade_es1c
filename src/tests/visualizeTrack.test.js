import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import VisualizePanel from "../components/containers/visualizeTracks/children/VisualizePanel";
import VisualizeService from "./mocks/VisualizeService";
import VisualizeTrack from "../components/containers/visualizeTracks/VisualizeTrack";

let vService = new VisualizeService();

//Component visualizePanel renders correctly
it("VisualizeTrack -> renders visualizePanel without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<VisualizePanel service={vService}></VisualizePanel>, div);
});

//Component visualizeTrack renders correctly
it("VisualizeTrack -> renders visualizeTrack without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<VisualizeTrack ></VisualizeTrack>, div);
});

//Check the panel exists after rendering
it("VisualizeTrack -> renders visualize correctly", () => {
    const {getByTestId} =render(<VisualizePanel service={vService}></VisualizePanel>);
    expect(getByTestId("visualizeTest")).toBeTruthy();
});

it("VisualizeTrack -> component visualizeTrack has the correct subComponents", () => {
    
    const {getByTestId} =render(<VisualizePanel service={vService}></VisualizePanel>);
    expect(getByTestId("containerVisualTest")).toBeTruthy();
    expect(getByTestId("combo")).toBeTruthy();
    
});

//Loading of combobox
it("VisualizeTrack --> radiobutton1 is working",() => {
    const {getByTestId} = render(<VisualizePanel service={vService}></VisualizePanel>);
    
    expect(getByTestId("btn1VTest")).toBeTruthy();
    fireEvent.change(getByTestId("inputLabel1"), { target: { checked: true } });
    getByTestId("btn1VTest").click();

    expect(getByTestId("combo")).toBeTruthy();
    //console.log(getByTestId("combo"));
});

it("VisualizeTrack --> radiobutton2 is working",() => {
    const {getByTestId} = render(<VisualizePanel service={vService}></VisualizePanel>);
    fireEvent.change(getByTestId("inputLabel2"), { target: { checked: true } });
    getByTestId("btn1VTest").click();
});

it("VisualizeTrack -> visualize button is working", () => {
    const {getByTestId} = render(<VisualizePanel service={vService}></VisualizePanel>);
    expect(getByTestId("btn2VTest")).toBeTruthy();
    getByTestId("btn2VTest").click();
});

it("visualizeTrack --> without any radio-button pressed error must be handled",() => {
    const {getByTestId} = render(<VisualizePanel service={vService}></VisualizePanel>);
    fireEvent.change(getByTestId("inputLabel1"), { target: { checked: false } });
    fireEvent.change(getByTestId("inputLabel2"), { target: { checked: false } });
    getByTestId("btn1VTest").click();
});