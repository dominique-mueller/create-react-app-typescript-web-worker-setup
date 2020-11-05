import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./MyWorker.worker', () => {
  return class MockWorker {
    public postMessage(): void {
      // noop
    }
  };
});

jest.mock('./MyComlinkWorker.worker', () => {
  return class MockWorker {};
});

jest.mock('comlink', () => {
  return {
    wrap: () => {
      return {
        createMessage: () => {
          return Promise.resolve('Response');
        },
      };
    },
  };
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
