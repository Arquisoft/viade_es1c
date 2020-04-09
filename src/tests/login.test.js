import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../components/containers/login/Login';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

it("renders without crashing",() => {
    const div = document.createElement("div");
    ReactDOM.render(<Login></Login>, div);
})

it("renders button correctly", () => {
    const {getByTestId} = render(<Login></Login>);
    expect(getByTestId('loginButton'));
})
