import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';

export const UserContext = React.createContext(null);

function Provider({ children }) {
  const userStore = useLocalStorage('user');

  return (
    <UserContext.Provider value={userStore}>
      <BrowserRouter>{children}</BrowserRouter>
    </UserContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
};

Provider.defaultProps = {
  children: null,
};

export default Provider;
