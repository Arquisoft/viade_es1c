import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, waitForDomChange} from "@testing-library/react";
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
/**
 * Loading of combobox, as checking radiobutton1(my routes)
 */
it("VisualizeTrack --> radiobutton1 is working",() => {
    const {getByTestId} = render(<VisualizePanel service={vService}></VisualizePanel>);
    
    expect(getByTestId("btn1VTest")).toBeTruthy();
    fireEvent.change(getByTestId("inputLabel1"), { target: { checked: true } });
    getByTestId("btn1VTest").click();

    expect(getByTestId("combo")).toBeTruthy();
});

/**
 * Testing the combo has the correct information
 */
it("VisualizeTrack --> combo is loaded", async () => {
    const {container,getByTestId}=render(<VisualizePanel service={vService}></VisualizePanel>);
    fireEvent.change(getByTestId("inputLabel1"), { target: { checked: true } });
    //Filling combo
    getByTestId("btn1VTest").click();
   
    await waitForDomChange(() => {
        expect(getByTestId("combo"));
        expect(getByTestId("combo").length).toEqual(1);
        expect(getByTestId("btn2VTest"));
    });
    getByTestId("btn2VTest").click();
});

/**
 * Loading of combobox as testing radiobutton2(shared routes)
 */
it("VisualizeTrack --> radiobutton2 is working",() => {
    const {getByTestId} = render(<VisualizePanel service={vService}></VisualizePanel>);
    fireEvent.change(getByTestId("inputLabel2"), { target: { checked: true } });
    getByTestId("btn1VTest").click();
});

/**
 * Testing of visualize button
 */
it("VisualizeTrack -> visualize button is working", () => {
    const {getByTestId} = render(<VisualizePanel service={vService}></VisualizePanel>);
    expect(getByTestId("btn2VTest")).toBeTruthy();
    getByTestId("btn2VTest").click();
});

/**
 * Test where errors caused by having both radio-buttons deselected
 */
it("visualizeTrack --> without any radio-button pressed error must be handled",() => {
    
    const {getByTestId} = render(<VisualizePanel service={vService}></VisualizePanel>);
    fireEvent.change(getByTestId("inputLabel1"), { target: { checked: false } });
    fireEvent.change(getByTestId("inputLabel2"), { target: { checked: false } });
    getByTestId("btn1VTest").click();

});

/**
 * Test visualize with multimedia and pressing buttons of multimedia content
 */
it("visualizeTrack --> routes have multimedia", async () => { 
    const {getByTestId} = render(<VisualizePanel service={vService}></VisualizePanel>);
    getByTestId("btn1VTest").click();
   
    await waitForDomChange(() => {
        expect(getByTestId("btn2VTest"));
    });

    fireEvent.change(getByTestId("combo"), { target: { value: "Ruta1" }, });
    getByTestId("btn2VTest").click();

    await waitForDomChange(() => {
        expect(getByTestId("btnPowerOnTest"));
    });

    getByTestId("btnPowerOnTest").click();
    getByTestId("btnPowerOffTest").click();
    getByTestId("btnNextTest").click();
    getByTestId("btnPreviousTest").click();

});

/**
 * Test visualize with only images
 */
it("visualizeTrack --> routes have only images", async () => {
    const {getByTestId} = render(<VisualizePanel service={vService}></VisualizePanel>);
    getByTestId("btn1VTest").click();

    await waitForDomChange(() => {
        expect(getByTestId("btn2VTest"));
    });

    fireEvent.change(getByTestId("combo"), { target: { value: "Ruta2" }, });
    getByTestId("btn2VTest").click();
});

/**
 * Test visualize with only videos
 */
it("visualizeTrack --> routes have only videos", async () => {
    const {getByTestId} = render(<VisualizePanel service={vService}></VisualizePanel>);
    getByTestId("btn1VTest").click();

    await waitForDomChange(() => {
        expect(getByTestId("btn2VTest"));
    });

    fireEvent.change(getByTestId("combo"), { target: { value: "Ruta3" }, });
    getByTestId("btn2VTest").click();
});

