import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import Provider from './Provider';
import App from './App';
import './style.css';

// https://github.com/welldone-software/why-did-you-render#installation
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
}

ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root'),
);
