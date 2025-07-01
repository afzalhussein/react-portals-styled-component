import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Ensure modal-root exists for portal rendering
beforeAll(() => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild( modalRoot );
  console.log( 'Modal root created' );
  console.log( 'Modal root exists:', !!document.getElementById( 'modal-root' ) );
});

afterAll(() => {
  const modalRoot = document.getElementById('modal-root');
  if (modalRoot) document.body.removeChild(modalRoot);
});

describe('App component', () => {
  test('renders main heading and toggle button', () => {
    render(<App />);
    expect(screen.getByText(/Styled Modal with React Portals/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /toggle modal/i })).toBeInTheDocument();
  });

  test('shows modal when toggle button is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /toggle modal/i }));
    expect(screen.getByText(/Modal Title/i)).toBeInTheDocument();
    expect(screen.getByText(/This is the modal content/i)).toBeInTheDocument();
  });

  test('closes modal when Close Modal button is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /toggle modal/i }));
    fireEvent.click(screen.getByRole('button', { name: /close modal/i }));
    expect(screen.queryByText(/Modal Title/i)).not.toBeInTheDocument();
  });
});
