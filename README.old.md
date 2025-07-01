# react-portals-styled-component

Using React Portals with styled components is quite straightforward. You can create a styled modal component and render it using React Portals to ensure it appears in a specific part of the DOM, detached from its parent hierarchy.

Here's an example of creating a styled modal using styled components and rendering it with React Portals:

First, install the necessary dependencies:

```bash
npm install styled-components
```

Now, let's create a `Modal` component using styled-components and React Portals:

```javascript
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

const modalRoot = document.getElementById('modal-root');

const Modal = ({ children, onClose }) => {
  const el = document.createElement('div');

  useEffect(() => {
    modalRoot.appendChild(el);

    // Cleanup function to remove the modal when unmounting
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

In this example:

- `ModalWrapper` is a styled component that represents the modal's appearance.
- Inside the `Modal` component, an element `el` is created using `document.createElement('div')`. This element will be the target for the React Portal.
- The `useEffect` hook is used to append the `el` to the `modalRoot` when the component mounts and remove it when the component unmounts. This ensures the modal's element is properly attached and detached from the DOM.

Now, let's use this `Modal` component in another part of your application:

```javascript
import React, { useState } from 'react';
import Modal from './Modal';

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

In this example:

- The `App` component maintains the state (`showModal`) and a function (`toggleModal`) to control the visibility of the modal.
- When the `showModal` state is `true`, the `Modal` component is rendered with some content (in this case, a title and a paragraph). The `onClose` prop passed to `Modal` is a function to close the modal when the "Close Modal" button is clicked.

This setup demonstrates how you can create a styled modal component using styled-components and render it using React Portals, ensuring it appears at a specific part of the DOM detached from its parent components. Adjust the styles and content inside the `ModalWrapper` to fit your requirements.
