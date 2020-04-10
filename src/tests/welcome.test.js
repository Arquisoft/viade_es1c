import React from "react";
import ReactDOM from "react-dom";
import Welcome from "../components/containers/welcome/Welcome";
import { render} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";



it("Welcome -> renders without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<Welcome></Welcome>, div);
})

it("Welcome -> renders Welcome correctly", () => {
    const {container,getByTestId} =render(
        <Welcome></Welcome>
    );
    expect(getByTestId("welcomeTest"));
});

it("Welcome -> renders listOfLinks", () => {
    expect(document.getElementsByClassName("welcomeLinks")).toBeTruthy();
    expect(document.getElementsByClassName("welcomeLinkDocs")).toBeTruthy();
    expect(document.getElementsByClassName("welcomeLinksViade")).toBeTruthy();
});

it("Welcome -> renders LoggedIn", () => {
    expect(document.getElementsByClassName("loggedInPane")).toBeTruthy();
});

it("Welcome -> renders LoggedOut", () => {
    expect(document.getElementsByClassName("loggedOutPane")).toBeTruthy();
});

