import React from 'react';
import PropTypes from 'prop-types';

const classes = ['rounded', 'bg-white', 'p-10', 'shadow-lg'];

function Card({ className, children, ...rest }) {
  return (
    <div className={`${classes.join(' ')} ${className}`} {...rest}>
      {children}
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Card.defaultProps = {
  className: '',
  children: null,
};

export default Card;
