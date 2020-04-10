import React from "react";
import ReactDOM from "react-dom";
import Login from "../components/containers/login/Login";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {HashRouter} from "react-router-dom";

describe('Login tests', () => {
    const {container, getByTestId} = render(
        <HashRouter>
            <Login></Login>
        </HashRouter>
    );
    
    test("renders without crashing",() => {
        expect(container).toBeTruthy();
    });

    test("renders LoggedIn", () => {
        expect(document.getElementsByClassName('loggedInPane')).toBeTruthy();
    });
    
    test("renders LoggedOut", () => {
        expect(document.getElementsByClassName('loggedOutPane')).toBeTruthy();
    });

    test("renders LogginButton", () => {
        expect(document.getElementsByClassName('btn btn-primary a-solid button-login')).toBeTruthy();
    });

    test("renders LogginTitle", () => {
        expect(document.getElementsByClassName('loginTitle')).toBeTruthy();
    });

    test("render Login", () => {
        const {getByTestId} = render(<Login></Login>);
        expect(getByTestId("loginPane"));
    });

    
    
});

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
//    expect(document.querySelector('.loggedPane')).toBeTruthy();
//});
