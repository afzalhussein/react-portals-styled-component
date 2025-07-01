import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Modal from './Modal';

beforeEach(() => {
  // Ensure a fresh modal-root for each test
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);
});

afterEach(() => {
  cleanup();
  const modalRoot = document.getElementById('modal-root');
  if (modalRoot) document.body.removeChild(modalRoot);
});

describe('Modal component', () => {
  test('renders children content', () => {
    render(
      <Modal onClose={() => {}}>
        <div>Test Modal Content</div>
      </Modal>
    );
    expect(screen.getByText('Test Modal Content')).toBeInTheDocument();
  });

  test('calls onClose when Close Modal button is clicked', () => {
    const onClose = jest.fn();
    render(
      <Modal onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );
    fireEvent.click(screen.getByText(/close modal/i));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('renders inside modal-root portal', () => {
    render(
      <Modal onClose={() => {}}>
        <div>Portal Check</div>
      </Modal>
    );
    const modalRoot = document.getElementById('modal-root');
    expect(modalRoot.textContent).toContain('Portal Check');
  });
});