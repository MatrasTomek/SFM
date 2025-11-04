import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the main application component', () => {
  render(<App />);
  const linkElement = screen.getByText(/your main app text/i);
  expect(linkElement).toBeInTheDocument();
});