import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import Login from "../components/containers/login/Login";


let container;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container= null;
});

it("Login test, renders without crashing", () => {
    act(() => {
        ReactDOM.render(<Login></Login>, container);
    });

    expect(container).toBeTruthy();
    expect(container.querySelector("#loginPane")).toBeTruthy();
    expect(container.querySelector(".loginTitle")).toBeTruthy();
    expect(container.querySelector("#linkGetAPod")).toBeTruthy();
});