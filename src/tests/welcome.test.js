import React from "react";
import ReactDOM from "react-dom";
import Welcome from "../components/containers/welcome/Welcome";
import { render} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Router } from "react-router-dom";


it("renders without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<Welcome></Welcome>, div);
})

it("renders button correctly", () => {
    const {container,getByTestId} =render(
        <Welcome></Welcome>
    );
    expect(getByTestId("welcomeTest"));
});

