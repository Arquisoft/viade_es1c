import React from "react";
import ReactDOM from "react-dom";
import MyNavBar from "../components/navBar/NavBar";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {LoggedIn} from "@solid/react";

it("renders without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<MyNavBar></MyNavBar>, div);
});

it("renders button correctly", () => {
    const {getByTestId} =render(<MyNavBar></MyNavBar>);
    expect(getByTestId("navTest"));
});

it("component has the correct subComponents",()=>{
    const {getByTestId} =render(<MyNavBar></MyNavBar>);
   // expect(getByTestId("navTest")).toContain(<section data-testid="navTest"></section>);
});
