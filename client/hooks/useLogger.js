import React from 'react';

// console.log when a value has changed. handy for inspecting state
// changes
function useLogger(tag, value) {
  React.useMemo(() => {
    const [realTag, realValue] = value ? [tag, value] : ['useLogger', tag];
    // eslint-disable-next-line no-console
    console.log(`%c ${realTag}: `, 'color: blue', realValue);
  }, [tag, value]);

  return null;
}

export default useLogger;
