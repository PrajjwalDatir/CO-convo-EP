import React from 'react';

// useEffect, but only on mount
function useEffectOnce(fn) {
  React.useEffect(fn, []);
  return null;
}

export default useEffectOnce;
