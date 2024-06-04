import { render, screen } from '@testing-library/react';
import App from './App';

test('renders form', () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/enter question/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/enter answer/i)).toBeInTheDocument();
  expect(screen.getByText(/add flashcard/i)).toBeInTheDocument();
});
