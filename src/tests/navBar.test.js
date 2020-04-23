import React from "react";
import ReactDOM from "react-dom";
import MyNavBar from "../components/navBar/NavBar";
import { render} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

/**
 * NavBar renders correctly in DOM
 */
it("NavBar -> renders without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<MyNavBar></MyNavBar>, div);
});

/**
 * NavBar renders correctly
 */
it("NavBar -> renders navBar correctly", () => {
    const {getByTestId} =render(<MyNavBar></MyNavBar>);
    expect(getByTestId("navTest"));
});
