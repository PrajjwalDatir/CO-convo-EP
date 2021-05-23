import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

const linkTextClasses =
  'relative text-blue-800 group-hover:text-blue-900 z-50';

function FancyLink({ to, className, children }) {
  return (
    <RouterLink className="group relative" to={to}>
      <span className={`${linkTextClasses} ${className}`}>{children}</span>
      <div className="absolute w-full bottom-0 bg-blue-200 group-hover:bg-blue-300 h-1" />
    </RouterLink>
  );
}

FancyLink.propTypes = {
  to: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

FancyLink.defaultProps = {
  to: '#',
  className: '',
  children: null,
};

export default FancyLink;
