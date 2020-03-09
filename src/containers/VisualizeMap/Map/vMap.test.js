import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import vMap from '../vMap.component';

describe('Visualize Map', () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <vMap />
    </Router>
  );

  test('App renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
