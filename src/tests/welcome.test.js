import React from "react";
//import ReactDOM from "react-dom";
import { render, cleanup, waitForElement, fireEvent, queryByTestId, queryByText, act } from "@testing-library/react";
import "@testing-library/jest-dom";

import Welcome from "../components/containers/welcome/Welcome";
//import { act } from "react-dom/test-utils";

let contenedor = null;
beforeEach( () => {
    const {container} = render(<Welcome></Welcome>);
    contenedor = container;
});

describe("login component", () => {
    afterAll(cleanup);

    test("renders without crashing", () => {
        expect(contenedor).toBeTruthy();
    });

    test("renders the header correctly", () => {
        waitForElement(() => {
            expect(queryByTestId(contenedor,"title")).not.toBeNull();
            expect(queryByTestId(contenedor,"title")).not.toBeNull();
        });
    });
        
});






//it("Welcome -> renders without crashing",() => {
//    const div = document.createElement("div");
//    ReactDOM.render(<Welcome></Welcome>, div);
//});
//
//it("Welcome -> renders Welcome correctly", () => {
//    const { getByTestId } =render(
//        <Welcome></Welcome>
//    );
//    expect(getByTestId("welcomeTest")).toBeInTheDocument();
//    //expect(getByTestId("title")).toBeInTheDocument();
//});
//
//it("Welcome -> renders listOfLinks", () => {
//    const { getByTestId } =render(
//        <Welcome></Welcome>
//    );
//    expect(document.getElementsByClassName("welcomeLinks")).toBeTruthy();
//    console.log(document.getElementsByClassName("welcomeLinks"));
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

