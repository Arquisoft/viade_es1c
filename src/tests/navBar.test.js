import React from "react";
import ReactDOM from "react-dom";
import MyNavBar from "../components/navBar/NavBar";
import { render} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

it("NavBar -> renders without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<MyNavBar></MyNavBar>, div);
});

it("NavBar -> renders navBar correctly", () => {
    const {getByTestId} =render(<MyNavBar></MyNavBar>);
    expect(getByTestId("navTest"));
	/*
    expect(getByTestId("logoTestId"));
    expect(getByTestId("navTest2"));
    getByTestId("logoTestId").click();
    getByTestId("NV_visual_1").click();
    getByTestId("NV_share_2").click();
    getByTestId("NV_friend_3").click();
    getByTestId("NV_not_4").click();
    getByTestId("NV_up_5").click();
    getByTestId("NV_down_6").click();
	*/
});
