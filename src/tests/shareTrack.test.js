import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ShareService from "./mocks/ShareService";
import SharePanel from "../components/containers/shareTracks/children/SharePanel";

const webId = "https://miguelornia.solid.community/profile/card#me";
let sService = new ShareService();

it("renders without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<SharePanel myWebId={webId} service={sService}></SharePanel>, div);
})

it("renders button correctly", () => {
    const {getByTestId} =render(<SharePanel myWebId={webId} service={sService}></SharePanel>);
    expect(getByTestId("shareTrackTest"));
    expect(getByTestId("btnUpload"));
    getByTestId("btnUpload").click();
    expect(getByTestId("btnClean"));
    getByTestId("btnClean").click();
});
