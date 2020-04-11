import React from "react";
import ReactDOM from "react-dom";
import VisualizeTrack from "../components/containers/visualizeTracks/VisualizeTrack";
import { act, render, queryByTestId, cleanup, getByTestId, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

// it("VisualizeTrack -> renders without crashing",() => {
//     const div = document.createElement("div");
//     ReactDOM.render(<VisualizeTrack></VisualizeTrack>, div);
// })

// it("VisualizeTrack -> renders visualize correctly", () => {
//     const {getByTestId} =render(<VisualizeTrack></VisualizeTrack>);
//     expect(getByTestId("visualizeTest"));
// });

// it("VisualizeTrack -> component visualizeTrack has the correct subComponents", () => {
//     expect(document.getElementsByClassName("myH1")).toBeTruthy();
//     expect(document.getElementsByClassName("map")).toBeTruthy();
//     expect(document.getElementsByClassName("h4-format")).toBeTruthy();
//     expect(document.getElementsByClassName("formal-div")).toBeTruthy();
//     expect(document.getElementsByClassName("button-margin")).toBeTruthy();
//     expect(document.getElementsByClassName("visualizeButton")).toBeTruthy();
//     expect(document.getElementsByClassName("select-format")).toBeTruthy();
// });

let contenedor;
beforeEach(() => act(() => {
    const {container}=render(<VisualizeTrack/>);
    contenedor=container;
}));

describe("PRUEBA", () => {
    
        test("Render", async() => {
            waitForElement(() =>{
                expect(queryByTestId(contenedor,"visualizeTest")).not.toBeNull();
                expect(queryByTestId(contenedor,"h1vTest")).toBeTruthy();
                expect(queryByTestId(contenedor,"mapTest")).toBeTruthy();
                expect(queryByTestId(contenedor,"vVTest")).toBeTruthy();
                queryByTestId(contenedor,"btnPlayTest").click();
                queryByTestId(contenedor,"btnStopTest").click();
                queryByTestId(contenedor,"btnNextTest").click();
                queryByTestId(contenedor,"btnPreviousTest").click();
            }); 
        });
      
});