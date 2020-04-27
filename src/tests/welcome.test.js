import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Welcome from "../components/containers/welcome/Welcome";

let container;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container= null;
});

/**
 * Test Welcome renders correctly and has all the subcomponents
 */
it("Welcome test, renders without crashing", () => {
    act(() => {
        ReactDOM.render(<Welcome></Welcome>, container);
    });

    expect(container).toBeTruthy();
    expect(container.querySelector("#welcomeTest")).toBeTruthy();
    expect(container.querySelector("#h1-welcome")).toBeTruthy();
    expect(container.querySelector("#h2-welcome")).toBeTruthy();
    expect(container.querySelector("#linkDoc")).toBeTruthy();
    expect(container.querySelector("#linkBuild")).toBeTruthy();
});
