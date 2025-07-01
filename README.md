# React Portals Styled Component

This project demonstrates how to use **React Portals** together with **styled-components** to create a modal dialog that renders outside the main React app hierarchy.

![image](https://github.com/user-attachments/assets/335a75fe-8de3-4df4-b5b5-2fd40df9faec)
---

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

- Node.js (v14 or higher recommended)
- npm

### Installation

```bash
npm install
```

### Running the App

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## Using styled-components

This project uses [styled-components](https://styled-components.com/) for styling React components.

To add `styled-components` to your project, run:

```bash
npm install styled-components
```

You can then import and use it in your components:

```js
import styled from 'styled-components';

const Button = styled.button`
  background: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
`;
```

---

## Using React Portals for Modals

The modal is rendered using React Portals. Make sure your `public/index.html` contains:

```html
<div id="root"></div>
<div id="modal-root"></div>
```

---

## Example Modal Component

The `Modal` component is located in `src/components/Modal.js`:

```js
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const Modal = ({ children, onClose }) => {
  const el = document.createElement('div');

  useEffect(() => {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return;
    modalRoot.appendChild(el);
    return () => {
      modalRoot.removeChild(el);
    };
  }, [el]);

  return ReactDOM.createPortal(
    <ModalWrapper>
      {children}
      <button onClick={onClose}>Close Modal</button>
    </ModalWrapper>,
    el
  );
};

export default Modal;
```

**Note:**  
The `modalRoot` lookup is now inside the `useEffect` hook to ensure it works correctly in both browser and test environments.

---

## Example Usage

The `App` component demonstrates how to use the modal:

```js
import React, { useState } from 'react';
import Modal from './components/Modal';

const App = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <h1>Styled Modal with React Portals</h1>
      <button onClick={toggleModal}>Toggle Modal</button>
      {showModal && (
        <Modal onClose={toggleModal}>
          <h2>Modal Title</h2>
          <p>This is the modal content.</p>
        </Modal>
      )}
    </div>
  );
};

export default App;
```

---

## Running Tests

This project uses [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) and [Jest](https://jestjs.io/) for unit testing.  
The Modal and App tests ensure correct portal rendering and modal behavior.

To run tests:

```bash
npm test
```

---

## Learn More

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)
- [styled-components documentation](https://styled-components.com/)

---

## License

This project is licensed under the MIT License.
