import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UploadPanel from "../components/containers/uploadTracks/children/UploadPanel";
import UploadService from "./mocks/UploadService";
import { UploadTrack } from "../components/containers/uploadTracks/UploadTrack";

// Initializing values
let uService = new UploadService();

/**
 * UploadTrack renders correctly
 */
it("UploadTrack --> Renders UploadTrack without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<UploadTrack></UploadTrack>, div);
});

/**
 * UploadPanel renders correctly
 */
it("UploadPanel --> Renders UploadPanel without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<UploadPanel service={uService}></UploadPanel>, div);
});

/**
 * Test button Upload (NOT CORRECT FILE)
 */
it("UploadTrack --> Renders button correctly (NOT CORRECT FILE)", () => {
    const {getByTestId} = render(<UploadPanel service={uService}></UploadPanel>);
    expect(getByTestId("uploadTrackTest"));
    expect(getByTestId("input-file-area"));
    const input = getByTestId("input-file-area");
    const file = new File([], "readme.txt", {
        type: "text/plane",
    });
    Object.defineProperty(input, "files", {
        value: [file]
    });
    getByTestId("btnUpload").click();
});

/**
 * Test button Upload (CORRECT FILE)
 */
it("UploadTrack --> Renders button correctly (CORRECT FILE)", () => {
    const {getByTestId} = render(<UploadPanel service={uService}></UploadPanel>);
    expect(getByTestId("uploadTrackTest"));
    expect(getByTestId("input-file-area"));
    const input = getByTestId("input-file-area");
    const file = new File([], "ruta1.json", {
        type: "application/json",
    });
    Object.defineProperty(input, "files", {
        value: [file]
    });
    getByTestId("btnUpload").click();
});

/**
 * Test button Upload (WITHOUT PERMISSIONS)
 */
it("UploadTrack --> Renders button correctly (WITHOUT PERMISSIONS)", () => {
    const {getByTestId} = render(<UploadPanel service={uService}></UploadPanel>);
    expect(getByTestId("uploadTrackTest"));
    expect(getByTestId("input-file-area"));
    const input = getByTestId("input-file-area");
    const file = new File([], "ruta2.ttl", {
        type: "text/turtle",
    });
    Object.defineProperty(input, "files", {
        value: [file]
    });
    getByTestId("btnUpload").click();
});

/**
 * Test button Upload (EMPTY)
 */
it("UploadTrack --> Renders button correctly (EMPTY)", () => {
    const {getByTestId} = render(<UploadPanel service={uService}></UploadPanel>);
    expect(getByTestId("uploadTrackTest"));
    expect(getByTestId("input-file-area"));
    const input = getByTestId("input-file-area");
    fireEvent.change(input, {target: {value: ""}});
    getByTestId("btnUpload").click();
});


