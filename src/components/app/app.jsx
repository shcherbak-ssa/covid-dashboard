import React, { useState } from 'react';
import classnames from 'classnames';
import './app.scss';

import { DARK_THEME, LIGHT_THEME } from '@/constants';

import AppHeader from './app-header';
import AppFooter from './app-footer';

const DARK_THEME_CLASSNAME = 'dark-theme';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState(LIGHT_THEME);
  const className = classnames('app', setDarkThemeClassname());

  const headerProps = {
    currentTheme,
    toggleCurrentTheme,
  };

  function setDarkThemeClassname() {
    return {
      [DARK_THEME_CLASSNAME]: currentTheme === DARK_THEME
    }
  }

  function toggleCurrentTheme() {
    const nextTheme = currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
    setCurrentTheme(nextTheme);
  }

  return (
    <div className={className}>
      <div className="app-container">
        <AppHeader {...headerProps} />
        <div className="app-main"></div>
      </div>
      <AppFooter />
    </div>
  );
}
