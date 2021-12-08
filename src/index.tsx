import React from 'react';

import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import 'styles/index.css';

import { App } from './a1-main/m1-ui/components/main/App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
