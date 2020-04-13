import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MyFriends from "../components/containers/friends/children/MyFriends";
import FriendsService from "./mocks/FriendsService";

const webId = "https://miguelornia.solid.community/profile/card#me";
let fService = new FriendsService();

it("renders without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<MyFriends myWebId={webId} service={fService}></MyFriends>, div);
})

it("Add friend", () => {
    const {getByTestId} = render(<MyFriends myWebId={webId} service={fService}></MyFriends>);
    expect(getByTestId("friendsTest"));
    expect(getByTestId("input-add"));
    const input = getByTestId("input-add");
    fireEvent.change(input, {target: {value: "https://miguelornia.inrupt.net/profile/card#me"}});
    expect(getByTestId("btnAddFriend"));
    getByTestId("btnAddFriend").click();
    getByTestId("btnAddFriend").click();
    fireEvent.change(input, {target: {value: ""}});
    getByTestId("btnAddFriend").click();
});

it("Delete friend", () => {
    const {getByTestId} = render(<MyFriends myWebId={webId} service={fService}></MyFriends>);
    expect(getByTestId("friendsTest"));
    expect(getByTestId("btnDeleteFriend"));
    getByTestId("btnDeleteFriend").click();
})













