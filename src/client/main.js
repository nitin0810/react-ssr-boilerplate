import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component'
import App from './App.jsx';

import './styles/index.scss';

export const main = () => {
    loadableReady(() => {
    ReactDOM.hydrate(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      document.getElementById('root')
    );
  });
};
