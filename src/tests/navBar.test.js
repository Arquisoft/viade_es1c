import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MyNavBar from '../components/navBar/NavBar';
import '@testing-library/jest-dom'
import ReactDOM from 'react-dom';

test("Prueba barra navegacion",()=>{
  const div=document.createElement("div");
  ReactDOM.render(<MyNavBar/>,div);
  expect(<MyNavBar/>).toBeTruthy();
});
// afterAll(cleanup);

// describe.only('Nav Bar', () => {
//   const container = render(
    
//       <MyNavBar />
      
//   );
//    it('renders without crashing', () => {
//     expect(container).toBeTruthy();
//   });

  
// });