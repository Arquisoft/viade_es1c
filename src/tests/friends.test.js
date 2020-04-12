import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MyFriends from "../components/containers/friends/children/MyFriends";

const webId = 'https://miguelornia.solid.community/profile/card#me';

it("renders without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<MyFriends myWebId={webId}></MyFriends>, div);
})

it("renders button correctly", () => {
    const {getByTestId} =render(<MyFriends myWebId={webId}></MyFriends>);
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
//it("MyFriends test, renders without crashing", () => {
//    act(() => {
//        ReactDOM.render(<MyFriends></MyFriends>, container);
//    });
//
//    expect(container).toBeTruthy();
//    expect(container.querySelector("#friendsTest")).toBeTruthy();
//    
//    //container.querySelector(".btnAddFriend").click();
//});













