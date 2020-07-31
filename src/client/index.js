import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component'
import App from './App.jsx';
import SSRContext from '../server/ssrContext'

import './styles/index.scss';

loadableReady(() => {
    ReactDOM.hydrate(
        <SSRContext.Provider value={null}>
            <BrowserRouter  >
                <App />
            </BrowserRouter>
        </SSRContext.Provider>,
        document.getElementById('root')
    );
});
