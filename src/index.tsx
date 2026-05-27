import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './components/app/app';
import store from './services/store';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container was not found');
}

const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
