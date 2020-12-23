/* eslint-disable linebreak-style */
import React from 'react';
import ReactDOM from 'react-dom';

import './assets/icons';
import './assets/favicon.ico';
import './styles/main.scss';
import './styles/keyboard.css';

import { loadData } from './api';
import App from './components/app';

const ROOT_ELEMENT_ID = 'app';

init();

async function init() {
  const apiData = await loadData();
  ReactDOM.render(
    <App apiData={apiData} />,
    document.getElementById(ROOT_ELEMENT_ID)
  );
}
