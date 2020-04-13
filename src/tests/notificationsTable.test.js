import React from "react";
import ReactDOM from "react-dom";
import NotificationsTable from "../components/containers/visualizeNotifications/children/NotificationsTable";
import { render } from "@testing-library/react";

const webId = "https://miguelornia.solid.community/profile/card#me";

it("Download -> renders without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<NotificationsTable myWebId={webId}></NotificationsTable>, div);
});

it("Download -> renders download correctly", () => {
    const {getByTestId} = render(<NotificationsTable myWebId={webId}></NotificationsTable>);
    expect(getByTestId("notificationTableComp"));
    //expect(getByTestId("btnMark"));
    //getByTestId("btnMark").click();
});
