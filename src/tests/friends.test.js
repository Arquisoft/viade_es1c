import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Friends from "../components/containers/friends/Friends";


it("renders without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<Friends></Friends>, div);
})

it("renders button correctly", () => {
    const {getByTestId} =render(<Friends></Friends>);
    expect(getByTestId("friendsTest"));
    
    expect(getByTestId("btnAddFriend"));
    //getByTestId("btnAddFriend").click();
    expect(getByTestId("btnDeleteFriend"));
    //getByTestId("btnDeleteFriend").click();
    
});

//let container;
//
//beforeEach(() => {
//    container = document.createElement("div");
//    document.body.appendChild(container);
//});
//
//afterEach(() => {
//    document.body.removeChild(container);
//    container= null;
//});
//
//it("Friends test, renders without crashing", () => {
//    act(() => {
//        ReactDOM.render(<Friends></Friends>, container);
//    });
//
//    expect(container).toBeTruthy();
//    expect(container.querySelector("#friendsTest")).toBeTruthy();
//    
//    //container.querySelector(".btnAddFriend").click();
//});













