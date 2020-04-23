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
