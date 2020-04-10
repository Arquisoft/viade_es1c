import React from "react";
import ReactDOM from "react-dom";
import MyNavBar from "../components/navBar/NavBar";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

it("NavBar -> renders without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<MyNavBar></MyNavBar>, div);
    
});

it("NavBar -> renders navBar correctly", () => {
    const {getByTestId, container} =render(<MyNavBar ></MyNavBar>);
    expect(getByTestId("navTest"));
    
    console.log(container.innerHTML);
});

it("NavBar -> component navBar has the correct subComponents",() => {
    expect(document.getElementsByClassName("nav-color")).toBeTruthy();
    expect(document.getElementsByClassName("mr-auto")).toBeTruthy();
    expect(document.getElementsByClassName("navbar-link a-bar")).toBeTruthy();
    expect(document.getElementsByClassName("navbar-link a-bar a-download")).toBeTruthy();
    expect(document.getElementsByClassName("i18nMenu")).toBeTruthy();
    expect(document.getElementsByClassName("logout btn btn-light")).toBeTruthy();
});

//it("NavBar -> click in the DropDown",() => {
//    const divs = document.createElement("div");
//    ReactDOM.render(<DropdownButton></DropdownButton>, divs);
//    const {getByTestId} =render(<DropdownButton ></DropdownButton>);
//    expect(getByTestId("dropDownButtonLanguage"));
//});
