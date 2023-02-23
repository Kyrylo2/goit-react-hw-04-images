import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { OverlayDiv, ModalImg } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ onClose, activeImage, activeTags }) => {
  const onClickBackdrop = useCallback(
    event => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const onEscKeyDown = useCallback(
    event => {
      if (event.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', onEscKeyDown);
    return () => {
      window.removeEventListener('keydown', onEscKeyDown);
    };
  }, [onEscKeyDown]);

  return createPortal(
    <OverlayDiv onClick={onClickBackdrop}>
      <ModalImg src={activeImage} alt={activeTags} />
    </OverlayDiv>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
  activeImage: PropTypes.string.isRequired,
  activeTags: PropTypes.string.isRequired,
};

export default Modal;
