import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import Login from "../components/containers/login/Login";


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
        ReactDOM.render(<Login></Login>, container);
    });

    expect(container).toBeTruthy();
    expect(container.querySelector("#loginPane")).toBeTruthy();
    expect(container.querySelector(".loginTitle")).toBeTruthy();
    expect(container.querySelector("#linkGetAPod")).toBeTruthy();
});

////////////////

//it("Login -> renders without crashing",() => {
//    const div = document.createElement("div");
//    ReactDOM.render(<Login></Login>, div);
//    //expect(container).toBeTruthy();
//});
//
//it("Login -> renders Login correctly", () => {
//    const {getByTestId} =render(<Login></Login>);
//    expect(getByTestId("loginPane"));
//});
//
//it("Login -> renders LoggedIn", () => {
//    expect(document.getElementsByClassName("loggedInPane")).toBeTruthy();
//});
//    
//it("Login -> renders LoggedOut", () => {
//    expect(document.getElementsByClassName("loggedOutPane")).toBeTruthy();
//});
//
//it("Login -> renders LogginButton", () => {
//    expect(document.getElementsByClassName("btn btn-primary a-solid button-login")).toBeTruthy();
//});
//
//it("Login -> renders LogginTitle", () => {
//    expect(document.getElementsByClassName("loginTitle")).toBeTruthy();
//});
//
//it("Login -> render Login", () => {
//    const {getByTestId} = render(<Login></Login>);
//    expect(getByTestId("loginPane"));
//});

////////////////


//});

//it("renders without crashing",() => {
//    const div = document.createElement("div");
//    ReactDOM.render(<Login></Login>, div);
//})
//
//it("renders Login correctly", () => {
//    const {getByTestId} =render(<Login></Login>);
//    expect(getByTestId("loginPane"));
//});

//it("renders LoggedIn", () => {
//    const div = document.createElement("div");
//    ReactDOM.render(<Login></Login>, div);
//    expect(document.querySelector(".loggedPane")).toBeTruthy();
//});
