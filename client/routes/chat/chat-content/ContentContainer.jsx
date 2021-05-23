import React from 'react';
import PropTypes from 'prop-types';

function ContentContainer({ children, direction }) {
  return (
    <div
      className={`my-8 flex flex-grow bg-white rounded-lg shadow-xl ${direction}`}
    >
      {children}
    </div>
  );
}

ContentContainer.propTypes = {
  children: PropTypes.node,
  direction: PropTypes.string,
};

ContentContainer.defaultProps = {
  children: null,
  direction: 'flex-row',
};

export default ContentContainer;
