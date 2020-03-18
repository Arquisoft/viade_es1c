import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Select from '../VisualizeTrack';

describe('Visualize Map', () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <Select />
    </Router>
  );

  test('App renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});