import React from "react";
import ReactDOM from "react-dom";
import NotificationsTable from "../components/containers/visualizeNotifications/children/NotificationsTable";
import { render, waitForDomChange } from "@testing-library/react";
import NotificationsService from "./mocks/NotificationsService";
import VisualizeNotifications from "../components/containers/visualizeNotifications/VisualizeNotifications";

// Initializing values
const webId1 = "https://miguelornia.solid.community/profile/card#me";
const webId2 = "https://es1c.solid.community/profile/card#me";
let nService = new NotificationsService();

/**
 * Father renders OK
 */
it("VisualizeNotifications --> Renders without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<VisualizeNotifications/>, div);
});

/**
 * Child renders OK
 */
test("NotificationsTable --> Renders table correctly (With notifications to show)", async () => {
    const {getByTestId} = render(<NotificationsTable myWebId={webId1} service={nService}></NotificationsTable>);
    expect(getByTestId("notificationTableComp"));
    await waitForDomChange(() => {
        expect(getByTestId("searchForm"));
        expect(getByTestId("btnSearch"));
    });
});

/**
 * Child renders OK
 */
test("NotificationsTable --> Renders table correctly (With no notifications to show)", async () => {
    const {getByTestId} = render(<NotificationsTable myWebId={webId2} service={nService}></NotificationsTable>);
    expect(getByTestId("notificationTableComp"));
    await waitForDomChange(() => {
        expect(getByTestId("errorMessage"));
    });
});
