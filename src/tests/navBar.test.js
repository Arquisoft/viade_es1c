import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MyNavBar from '../components/navBar/NavBar';
import '@testing-library/jest-dom'

afterAll(cleanup);

describe.only('Nav Bar', () => {
  const container = render(
    
      <MyNavBar />
      
  );
   it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  
});