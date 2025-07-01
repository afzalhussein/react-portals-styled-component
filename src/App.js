import React, { useState } from 'react';
import Modal from './components/Modal';

const App = () => {
  const [ showModal, setShowModal ] = useState( false );

  const toggleModal = () => {
    setShowModal( !showModal );
  };

  return (
    <div>
      <h1>Styled Modal with React Portals</h1>
      <button onClick={ toggleModal }>Toggle Modal</button>
      { showModal && (
        <Modal onClose={ toggleModal }>
          <h2>Modal Title</h2>
          <p>This is the modal content.</p>
        </Modal>
      ) }
    </div>
  );
};

export default App;