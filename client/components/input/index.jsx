import React from 'react';
import PropTypes from 'prop-types';

const classes = [
  'rounded-lg',
  'bg-gray-200',
  'px-3',
  'py-2',
  'border',
  'border-solid',
  'border-transparent',
  'outline-none',
].join(' ');
const focused = 'focus:bg-white focus:border-gray-400';
const hovered = 'hover:border-gray-400';

const Input = React.forwardRef(({ className, ...rest }, ref) => (
  <input
    className={`${classes} ${hovered} ${focused} ${className}`}
    ref={ref}
    {...rest}
  />
));

Input.propTypes = {
  className: PropTypes.string,
};

Input.defaultProps = {
  className: '',
};

export default Input;
