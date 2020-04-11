import React from "react";
import ReactDOM from "react-dom";
import Login from "../components/containers/login/Login";
import { render, cleanup, waitForElement, fireEvent, queryByTestId, queryByText, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

let contenedor = null;
beforeEach( () => {
    const {container} = render(<Login></Login>);
    contenedor = container;
});

describe('login component', () => {
    afterAll(cleanup);

    test('renders without crashing', () => {
        expect(contenedor).toBeTruthy();
    });

    test('renders the header correctly', () => {
        waitForElement(() => {
            expect(queryByTestId(contenedor,"loginPane")).not.toBeNull();
            expect(queryByTestId(contenedor,"loginTitle")).not.toBeNull();
        });
    });
        
});


//describe("Login tests", () => {
//    const {container, getByTestId} = render(
//        <Login></Login>
//    );
    
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
