import React from 'react';

// useReducer, except the reducer function recieves the dispatch
// function as the third argument
function useReducerWithDispatch(reducer, initialArg, init = a => a) {
  const isSafeToUpdate = React.useRef(true);
  const initialState = React.useMemo(() => init(initialArg), [
    initialArg,
    init,
  ]);

  const [state, setState] = React.useState(initialState);

  React.useEffect(
    () => () => {
      isSafeToUpdate.current = false;
    },
    [],
  );

  const dispatch = React.useCallback(
    action => {
      if (isSafeToUpdate.current) {
        setState(prevState => reducer(prevState, action, dispatch));
      }
    },
    [setState, reducer],
  );

  return [state, dispatch];
}

export default useReducerWithDispatch;
