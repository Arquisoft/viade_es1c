import React from "react";
import ReactDOM from "react-dom";
import VisualizeNotifications from "../components/containers/visualizeNotifications/VisualizeNotifications";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

it("renders without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<VisualizeNotifications></VisualizeNotifications>, div);
});

it("renders button correctly", () => {
    const {getByTestId} =render(<VisualizeNotifications></VisualizeNotifications>);
    expect(getByTestId("visualizeNotificationTest"));
});
