import React from 'react';
import { render, cleanup } from '@testing-library/react';
import VisualizeTrack from '../VisualizeTrack.js';

describe('Visualize Map', () => {
  afterAll(cleanup);

  const { container } = render(
      
  );

  test('App renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});