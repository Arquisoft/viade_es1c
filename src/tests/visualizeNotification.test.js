import React from "react";
import ReactDOM from "react-dom";
import VisualizeNotification from "../components/containers/visualizeNotifications/VisualizeNotification";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

it("renders without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<VisualizeNotification></VisualizeNotification>, div);
})

it("renders button correctly", () => {
    const {getByTestId} =render(<VisualizeNotification></VisualizeNotification>);
    expect(getByTestId("visualizeNotificationTest"));
});
