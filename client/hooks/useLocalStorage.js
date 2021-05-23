import React from 'react';

// a wrapper for useState, where the state is also stored in the
// browser's local storage
function useLocalStorage(key, initial) {
  const [state, setState] = React.useState(
    initial || JSON.parse(localStorage.getItem(key) || 'null'),
  );

  const setItem = React.useCallback(
    value => {
      localStorage.setItem(key, JSON.stringify(value));
      setState(value);
    },
    [key],
  );

  return [state, setItem];
}

export default useLocalStorage;
