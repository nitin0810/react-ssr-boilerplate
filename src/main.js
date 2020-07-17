import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component'

import App from './App.jsx';


import { ServerDataProvider } from './state/serverDataContext';

import './styles/index.scss';

const serverData = window.__SERVER_DATA__;

export const main = () => {
  // Loadable.preloadReady().then(() => {
    loadableReady(() => {
    ReactDOM.hydrate(
      // <ServerDataProvider value={serverData}>
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      // </ServerDataProvider>,
      document.getElementById('root')
    );
  });
  // });
};
