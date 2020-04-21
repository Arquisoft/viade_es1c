import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, waitForDomChange } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ShareService from "./mocks/ShareService";
import SharePanel from "../components/containers/shareTracks/children/SharePanel";
import ShareTrack from "../components/containers/shareTracks/ShareTrack";
import FriendGroupService from "./mocks/FriendGroupService";

// Initializing values
const webId = "https://miguelornia.solid.community/profile/card#me";
let sService = new ShareService();
let groupService = new FriendGroupService();

/**
 * Father renders OK
 */
it("ShareTrack --> Renders ShareTrack without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<ShareTrack ></ShareTrack>, div);
});

/**
 * Child renders OK
 */
it("SharePanel --> Renders SharePanel without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<SharePanel myWebId={webId} service={sService} gService={groupService}></SharePanel>, div);
});

/**
 * Pressing load button
 */
it("ShareTrack --> Renders load button correctly", () => {
    const {getByTestId} = render(<SharePanel myWebId={webId} service={sService} gService={groupService}></SharePanel>);
    expect(getByTestId("shareTrackTest"));
    expect(getByTestId("btnLoad"));
    getByTestId("btnLoad").click();
});

/**
 * Pressing load and share button (FRIENDS)
 */
test("SharePanel --> Renders load and share buttons correctly (FRIENDS)", async () => {
    const {getByTestId} = render(<SharePanel myWebId={webId} service={sService} gService={groupService}></SharePanel>);
    expect(getByTestId("shareTrackTest"));
    expect(getByTestId("radio-1"));
    expect(getByTestId("radio-2"));
    fireEvent.change(getByTestId("radio-1"), { target: { checked: true } });
    expect(getByTestId("btnLoad"));
    getByTestId("btnLoad").click();
    // Wait for appearance
    await waitForDomChange(() => {
        expect(getByTestId("friendsList"));
        expect(getByTestId("btnShare"));
    });
    getByTestId("btnShare").click();
});

/**
 * Pressing load and share button (GROUPS)
 */
test("SharePanel --> Renders load and share buttons correctly (GROUPS)", async () => {
    const {getByTestId} = render(<SharePanel myWebId={webId} service={sService} gService={groupService}></SharePanel>);
    expect(getByTestId("shareTrackTest"));
    expect(getByTestId("radio-1"));
    expect(getByTestId("radio-2"));
    fireEvent.change(getByTestId("radio-2"), { target: { checked: true } });
    expect(getByTestId("btnLoad"));
    getByTestId("btnLoad").click();
    // Wait for appearance
    await waitForDomChange(() => {
        expect(getByTestId("groupList"));
        expect(getByTestId("_0"));
        expect(getByTestId("btnShare"));
    });
    getByTestId("_0").click();
    getByTestId("btnShare").click();
});

