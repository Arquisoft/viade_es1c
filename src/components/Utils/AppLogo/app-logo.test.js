import React from 'react';
import { render, cleanup } from 'react-testing-library';
import AppLogo from './app-logo.component';

afterAll(cleanup);

const { container } = render(<AppLogo />);

describe('AppLogo', () => {
  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});