import React from "react";
import ReactDOM from "react-dom";
import MyNavBar from "../components/navBar/NavBar";
import { render, queryByTestId, cleanup, getByTestId } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { getI18n } from "react-i18next";

afterEach(cleanup);
let w;

it("NavBar -> renders without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<MyNavBar></MyNavBar>, div);
    
});

it("NavBar -> renders navBar correctly", () => {
    const {component, getByTestId} =render(<MyNavBar></MyNavBar>);
    expect(getByTestId("navTest"));
    //getByTestId("pruebaClick1").click();
});

it("NavBar -> component navBar has the correct subComponents",() => {
    //w.expect(getByTestId("visualTest")).toBeTruthy();
    expect(document.getElementsByClassName("mr-auto")).toBeTruthy();
    expect(document.getElementsByClassName("navbar-link a-bar")).toBeTruthy();
    expect(document.getElementsByClassName("navbar-link a-bar a-download")).toBeTruthy();
    expect(document.getElementsByClassName("i18nMenu")).toBeTruthy();
    expect(document.getElementsByClassName("logout btn btn-light")).toBeTruthy();
});

