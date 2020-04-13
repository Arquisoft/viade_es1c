import React from "react";
import ReactDOM from "react-dom";
import NotificationsTable from "../components/containers/visualizeNotifications/children/notificationsTable/NotificationsTable";
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

it("Notifications Table render test", () => {
    act(() => {
        ReactDOM.render(<NotificationsTable></NotificationsTable>, container);
    });
    expect(container).toBeTruthy();
});
