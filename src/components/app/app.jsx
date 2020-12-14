import React, { useState } from 'react';
import classnames from 'classnames';
import './app.scss';

import { DARK_THEME, LIGHT_THEME } from '@/constants';

import AppHeader from './app-header';
import AppFooter from './app-footer';
import GlobalSection from '../global-section';
import Fullscreen from '../fullscreen';

const DARK_THEME_CLASSNAME = 'dark-theme';

export default function App() {
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [fullscreenTitle, setFullscreenTitle] = useState('');
  const [fullscreenContent, setFullscreenContent] = useState('');
  const [currentTheme, setCurrentTheme] = useState(LIGHT_THEME);

  const classNames = classnames('app', {
    [DARK_THEME_CLASSNAME]: currentTheme === DARK_THEME
  });

  const appHeaderProps = {
    currentTheme,
    toggleCurrentTheme,
  };

  const fullscreenProps = {
    currentTheme,
    isOpen: isFullscreenOpen,
    title: fullscreenTitle,
    content: fullscreenContent,
    closeFullscreen: () => {
      setIsFullscreenOpen(false);
    },
  };

  function openFullscreen({currentFullscreenTitle, currentFullscreenContent}) {
    setIsFullscreenOpen(true);
    setFullscreenTitle(currentFullscreenTitle);
    setFullscreenContent(currentFullscreenContent);
  }

  function toggleCurrentTheme() {
    const nextTheme = currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
    setCurrentTheme(nextTheme);
  }

  return (
    <div className={classNames}>
      <div className="app-container">
        <AppHeader {...appHeaderProps} />
        <div className="app-main">
          <GlobalSection openFullscreen={openFullscreen}/>
          <Fullscreen {...fullscreenProps} />
        </div>
      </div>
      <AppFooter />
    </div>
  );
}
