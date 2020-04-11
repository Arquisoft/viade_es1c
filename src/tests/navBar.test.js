import React from "react";
import ReactDOM from "react-dom";
import MyNavBar from "../components/navBar/NavBar";
import { act, render, queryByTestId, cleanup, getByTestId, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { getI18n } from "react-i18next";



let contenedor;
beforeEach(() => {
    const {container}=render(<MyNavBar></MyNavBar>);
    contenedor=container;
});

describe("PRUEBA", () => {
    test("Render", async() => {
        waitForElement(() =>  {
            expect(queryByTestId(contenedor,"navTest")).not.toBeNull();
            expect(queryByTestId(contenedor,"pruebaClick1")).not.toBeNull();
            expect(queryByTestId(contenedor,"pruebaClick2")).not.toBeNull();
            //queryByTestId(contenedor,"pruebaClick1").click();
            //queryByTestId(contenedor,"pruebaClick2").click();
            //queryByTestId(contenedor,"visualTest").click();
        
        }); 
    });
});


// afterEach(cleanup);
// let w;

// it("NavBar -> renders without crashing",() => {
//     const div = document.createElement("div");
//     ReactDOM.render(<MyNavBar></MyNavBar>, div);
// });

// it("NavBar -> renders navBar correctly", () => {
//     const {component, getByTestId} =render(<MyNavBar></MyNavBar>);
//     expect(getByTestId("navTest"));
//     //expect(getByTestId("pruebaClick1"));
// });

// it("NavBar -> component navBar has the correct subComponents",() => {
//     //w.expect(getByTestId("visualTest")).toBeTruthy();
//     expect(document.getElementsByClassName("mr-auto")).toBeTruthy();
//     expect(document.getElementsByClassName("navbar-link a-bar")).toBeTruthy();
//     expect(document.getElementsByClassName("navbar-link a-bar a-download")).toBeTruthy();
//     expect(document.getElementsByClassName("i18nMenu")).toBeTruthy();
//     expect(document.getElementsByClassName("logout btn btn-light")).toBeTruthy();
// });