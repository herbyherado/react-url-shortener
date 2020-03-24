import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Renders loading screen on initialization', () => {
  const { getByText } = render(<App />);
  const loadingElement = getByText(/fetching/i);
  expect(loadingElement).toBeInTheDocument();
});
