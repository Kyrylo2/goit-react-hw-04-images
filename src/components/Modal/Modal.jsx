// import React, { Component } from 'react';
// import { createPortal } from 'react-dom';

// import { OverlayDiv, ModalImg } from './Modal.styled.js';

// const modalRoot = document.querySelector('#modal--root');

// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackDrop = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <OverlayDiv onClick={this.handleBackDrop}>
//         <ModalImg src={this.props.activeImage} alt={this.props.activeTags} />
//       </OverlayDiv>,
//       modalRoot
//     );
//   }
// }

// -------------------------------------------------------------------------
// import React, { useEffect } from 'react';
// import { createPortal } from 'react-dom';

// import { OverlayDiv, ModalImg } from './Modal.styled.js';

// const modalRoot = document.querySelector('#modal--root');

// const Modal = ({ onClose, activeImage, activeTags }) => {
//   // const

//   const handleBackDrop = e => {
//     if (e.currentTarget === e.target) {
//       onClose();
//     }
//   };

//   useEffect(() => {
//     const handleKeyDown = e => {
//       console.log('onKeyDown event fired on handleKeyDown event');
//       if (e.code === 'Escape') {
//         onClose();
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [onClose]);

//   return createPortal(
//     <OverlayDiv onClick={handleBackDrop}>
//       <ModalImg src={activeImage} alt={activeTags} />
//     </OverlayDiv>,
//     modalRoot
//   );
// };

// export default Modal;

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { OverlayDiv, ModalImg } from './Modal.styled.js';

const Modal = ({ onClose, activeImage, activeTags }) => {
  const [modalRoot, setModalRoot] = useState(null);

  useEffect(() => {
    setModalRoot(document.querySelector('#modal--root'));
  }, []);

  const handleBackDrop = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!modalRoot) return null;

  return createPortal(
    <OverlayDiv onClick={handleBackDrop}>
      <ModalImg src={activeImage} alt={activeTags} />
    </OverlayDiv>,
    modalRoot
  );
};

export default Modal;
