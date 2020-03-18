import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import VisualizeTrack from './VisualizeTrack';

describe('Visualize Map', () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <Map />
    </Router>
  );

  test('App renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});