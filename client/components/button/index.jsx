import React from 'react';
import PropTypes from 'prop-types';

const classes = 'rounded focus:shadow-outline cursor-pointer';
const colors = 'bg-blue-700 hover:bg-gray-800 text-gray-100';

function Button({
  className,
  children,
  type,
  overrideColors,
  variant,
  ...rest
}) {
  let classVariants;

  if (variant === 'big') {
    classVariants = 'px-12 py-4 font-bold shadow-md hover:shadow-lg';
  } else {
    classVariants = 'px-4 py-2 shadow hover:shadow-md';
  }

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className={`
        ${overrideColors ? '' : colors}
        ${classes} ${classVariants} ${className}
      `}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string,
  variant: PropTypes.oneOf(['big', undefined]),
  overrideColors: PropTypes.bool,
};

Button.defaultProps = {
  className: '',
  children: null,
  type: 'button',
  variant: undefined,
  overrideColors: false,
};

export default Button;
