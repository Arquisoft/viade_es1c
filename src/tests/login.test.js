import React from 'react';
import { render, queryByTestId, act } from '@testing-library/react';
import Login from '../components/containers/login/Login';
import ReactDOM from 'react-dom';

test('Prueba de visualize',()=>{
  const div=document.createElement("div");
  ReactDOM.render(<Login/>,div);
  expect(<Login/>).toBeTruthy();
});

