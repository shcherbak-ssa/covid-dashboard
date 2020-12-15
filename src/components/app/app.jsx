import React, { useState } from 'react';
import classnames from 'classnames';
import './app.scss';

import { DARK_THEME, LIGHT_THEME } from '../../constants';

import AppHeader from './app-header';
import AppFooter from './app-footer';
import GlobalSection from '../global-section';
import Fullscreen from '../fullscreen';
import CountriesSection from '../countries-section';
import MapSection from '../map-section';
import TableSection from '../table-section';
import ChartSection from '../chart-section';

const DARK_THEME_CLASSNAME = 'dark-theme';

export default function App({apiData}) {
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [fullscreenTitle, setFullscreenTitle] = useState('');
  const [fullscreenContent, setFullscreenContent] = useState('');
  const [currentTheme, setCurrentTheme] = useState(LIGHT_THEME);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const classNames = classnames('app', {
    [DARK_THEME_CLASSNAME]: currentTheme === DARK_THEME
  });

  const appHeaderProps = {
    currentTheme,
    toggleCurrentTheme,
  };

  const sectionsProps = {
    global: {
      apiData: apiData.global,
      openFullscreen,
    },
    countries: {
      apiData: apiData.countries,
      currentTheme,
      openFullscreen,
      setSelectedCountry,
    },
    map: {
      apiData: apiData.map,
      currentTheme,
      openFullscreen,
      setSelectedCountry,
    },
    table: {
      apiData: apiData.table,
      currentTheme,
      selectedCountry,
      openFullscreen,
    },
    chart: {
      apiData: apiData.chart,
      currentTheme,
      selectedCountry,
      openFullscreen,
    },
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
      <AppHeader {...appHeaderProps} />
      <div className="app-main">
        <GlobalSection {...sectionsProps.global} />
        <CountriesSection {...sectionsProps.countries} />
        <MapSection {...sectionsProps.map} />
        <TableSection {...sectionsProps.table} />
        <ChartSection {...sectionsProps.chart} />
        <Fullscreen {...fullscreenProps} />
      </div>
      <AppFooter />
    </div>
  );
}
