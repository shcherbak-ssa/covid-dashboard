import React from 'react';
import './app-header.scss';

import Base from '../../base';

const DARK_THEME_TEXT_LABEL = 'Dark theme';
const LIGHT_THEME_TEXT_LABEL = 'Light theme';

export default function AppHeader({isDarkTheme, lastDay, toggleCurrentTheme}) {

  function setThemeTextLabel() {
    return isDarkTheme ? DARK_THEME_TEXT_LABEL : LIGHT_THEME_TEXT_LABEL;
  }

  function toggleClickHandle() {
    toggleCurrentTheme();
  }

  return (
    <div className="app-header header flex-space-between">
      <div className="header-title title">
        <div className="header-logo"></div>
        COVID-19 Dashboard
      </div>
      <div className="header-date">{lastDay}</div>
      <div className="header-theme">
        <Base.TextLabel value={setThemeTextLabel()} />
        <div className="header-toggle click" onClick={toggleClickHandle}>
          <span></span>
        </div>
      </div>
    </div>
  );
}
