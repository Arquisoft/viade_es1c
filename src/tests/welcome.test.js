import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import Welcome from "../components/containers/welcome/Welcome";


let container;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container= null;
});

it("Welcome test", () => {
    act(() => {
        ReactDOM.render(<Welcome></Welcome>, container);
    });

    expect(container).toBeTruthy();
    expect(container.querySelector("#welcomeTest")).toBeTruthy();
    expect(container.querySelector("#h1-welcome")).toBeTruthy();
    expect(container.querySelector("#h2-welcome")).toBeTruthy();
    expect(container.querySelector("#linkDoc")).toBeTruthy();
    expect(container.querySelector("#linkBuild")).toBeTruthy();
});



//it("Welcome -> renders without crashing",() => {
//    const div = document.createElement("div");
//    ReactDOM.render(<Welcome></Welcome>, div);
//});
//
//it("Welcome -> renders Welcome correctly", () => {
//    const {container,getByTestId} =render(
//        <Welcome></Welcome>
//    );
//    expect(getByTestId("welcomeTest"));
//    expect(getByTestId("welcomeTitle"));
//    expect(container.querySelector(".h1-welcome")).toBeTruthy();
//});





//it("Welcome -> renders listOfLinks", () => {
//    expect(document.getElementsByClassName("welcomeLinks")).toBeTruthy();
//    expect(document.getElementsByClassName("welcomeLinkDocs")).toBeTruthy();
//    expect(document.getElementsByClassName("welcomeLinksViade")).toBeTruthy();
//});
//
//it("Welcome -> renders LoggedIn", () => {
//    expect(document.getElementsByClassName("loggedInPane")).toBeTruthy();
//});
//
//it("Welcome -> renders LoggedOut", () => {
//    expect(document.getElementsByClassName("loggedOutPane")).toBeTruthy();
//});

