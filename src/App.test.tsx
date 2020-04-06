import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('./MyWorker.worker', () => {
  return class MockWorker {
    public postMessage(message: string): void {
      // Do nothing
    }
  };
});

describe('App', () => {
  it('renders learn react link', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
});
