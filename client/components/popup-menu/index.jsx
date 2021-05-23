import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import useEffectOnce from '#/hooks/useEffectOnce';

function PopupMenu({ bgClassName, children, onClose, isOpen }) {
  useEffectOnce(() => {
    // handling escape key is from a video (8:45):
    // https://tailwindcss.com/course/making-the-dropdown-interactive/
    function handleEscapeKey(event) {
      if (event.key === 'Esc' || event.key === 'Escape') {
        onClose(event);
      }
    }

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  });

  return (
    <div className={isOpen ? '' : 'invisible'}>
      <button
        type="button"
        className={`fixed inset-0 w-full h-full cursor-default z-40 ${bgClassName}`}
        onClick={onClose}
        aria-label="Close menu"
        tabIndex="-1"
      />
      <div className="relative z-50">{children}</div>
    </div>
  );
}

PopupMenu.propTypes = {
  bgClassName: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
};

PopupMenu.defaultProps = {
  bgClassName: '',
  children: null,
  onClose: R.always(),
  isOpen: false,
};

export default PopupMenu;
