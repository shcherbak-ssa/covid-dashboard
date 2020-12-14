import React from 'react';
import ReactDOM from 'react-dom';

import './assets/icons';
import './assets/favicon.ico';
import './styles/main.scss';

import { getGlobalCases } from './api/global';
import App from './components/app';

init();

async function init() {
  const global = await getGlobalCases();
  
  const apiData = {
    global,
  };

  ReactDOM.render(<App apiData={apiData} />, document.getElementById('app'));
}
