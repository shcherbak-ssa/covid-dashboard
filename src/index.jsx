import React from 'react';
import ReactDOM from 'react-dom';

import './assets/icons';
import './assets/favicon.ico';
import './styles/main.scss';

import { getGlobalCases } from './api/global';
import App from './components/app';

init();

async function init() {
  await getGlobalCases();

  ReactDOM.render(<App />, document.getElementById('app'));
}
