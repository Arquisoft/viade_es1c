import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MyFriends from "../components/containers/friends/children/myFriends/MyFriends";
import FriendsService from "./mocks/FriendsService";
import Friends from "../components/containers/friends/Friends";

// Initializing values
const webId = "https://miguelornia.solid.community/profile/card#me";
let fService = new FriendsService();

/**
 * Father renders OK
 */
it("Friends --> Renders Friends without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<Friends></Friends>, div);
});

/**
 * Child renders OK
 */
it("MyFriends --> Renders MyFriends without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<MyFriends myWebId={webId} service={fService}></MyFriends>, div);
});

/**
 * Adding a new friend
 */
it("MyFriends --> Add friend", () => {
    const {getByTestId} = render(<MyFriends myWebId={webId} service={fService}></MyFriends>);
    expect(getByTestId("friendsTest"));
    expect(getByTestId("input-add"));
    const input = getByTestId("input-add");
    fireEvent.change(input, {target: {value: "https://miguelornia.inrupt.net/profile/card#me"}});
    expect(getByTestId("btnAddFriend"));
    getByTestId("btnAddFriend").click();
    fireEvent.change(input, {target: {value: "https://miguelornia.inrupt.net/profile/card#me"}});
    getByTestId("btnAddFriend").click();
    fireEvent.change(input, {target: {value: ""}});
    getByTestId("btnAddFriend").click();
});

/**
 * Deleting a friend
 */
it("MyFriends --> Delete friend", () => {
    const {getByTestId} = render(<MyFriends myWebId={webId} service={fService}></MyFriends>);
    expect(getByTestId("friendsTest"));
    expect(getByTestId("btnDeleteFriend"));
    getByTestId("btnDeleteFriend").click();
});