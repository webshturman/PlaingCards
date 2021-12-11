import React from 'react';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import 'styles/index.css';

import { App } from './a1-main/m1-ui/components/main/App';
import reportWebVitals from './reportWebVitals';

import { store } from 'a1-main/m2-bll/store';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
