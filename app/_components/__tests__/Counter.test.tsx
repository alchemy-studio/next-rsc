import { render, screen, fireEvent } from '@testing-library/react';
import Counter from '../Counter';

describe('Counter', () => {
  it('renders the counter', () => {
    render(<Counter />);
    const counterButton = screen.getByRole('button', { name: /count/i });
    expect(counterButton).toBeInTheDocument();
    expect(counterButton).toHaveTextContent('Count: 0');
  });

  it('increments the counter when clicked', () => {
    render(<Counter />);
    const counterButton = screen.getByRole('button', { name: /count/i });
    fireEvent.click(counterButton);
    expect(counterButton).toHaveTextContent('Count: 1');
    fireEvent.click(counterButton);
    expect(counterButton).toHaveTextContent('Count: 2');
  });
});
