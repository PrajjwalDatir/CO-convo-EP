import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import PopupMenu from '#/components/popup-menu';

function Modal({ bgClassName, onClose, isOpen, children }) {
  return (
    <PopupMenu bgClassName={bgClassName} onClose={onClose} isOpen={isOpen}>
      <div className="fixed w-screen h-screen inset-0 pointer-events-none">
        <div className="flex w-screen h-screen items-center justify-center">
          <div className="pointer-events-auto">{children}</div>
        </div>
      </div>
    </PopupMenu>
  );
}

Modal.propTypes = {
  bgClassName: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
};

Modal.defaultProps = {
  bgClassName: 'bg-gray-900 opacity-25',
  children: null,
  onClose: R.always(),
  isOpen: false,
};

export default Modal;
