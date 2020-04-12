/*
import React from "react";
import ReactDOM from "react-dom";
import VisualizeNotifications from "../components/containers/visualizeNotifications/VisualizeNotifications";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

it("VisualizeNotifications -> renders without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<VisualizeNotifications></VisualizeNotifications>, div);
});

it("VisualizeNotifications -> renders the component correctly", () => {
    const {getByTestId} = render(<VisualizeNotifications></VisualizeNotifications>);
    expect(getByTestId("VN-section_1"));
});
*/

import React from "react";
import ReactDOM from "react-dom";
import VisualizeNotifications from "../components/containers/visualizeNotifications/VisualizeNotifications";
import { act } from "react-dom/test-utils";

let container;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

it("Visualize Notifications render test", () => {
    act(() => {
        ReactDOM.render(<VisualizeNotifications></VisualizeNotifications>, container);
    });
    expect(container).toBeTruthy();
});
