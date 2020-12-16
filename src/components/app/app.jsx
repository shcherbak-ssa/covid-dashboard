import React, { useState } from 'react';
import classnames from 'classnames';
import './app.scss';

import { DARK_THEME, LIGHT_THEME } from '../../constants';

import AppHeader from './app-header';
import AppFooter from './app-footer';
import GlobalSection from '../global-section';
import CountriesSection from '../countries-section';
import MapSection from '../map-section';
import TableSection from '../table-section';
import ChartSection from '../chart-section';

const DARK_THEME_CLASSNAME = 'dark-theme';

export default function App({apiData}) {
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
    },
    countries: {
      apiData: apiData.countries,
      currentTheme,
      setSelectedCountry,
    },
    map: {
      apiData: apiData.map,
      currentTheme,
      setSelectedCountry,
    },
    table: {
      apiData: apiData.table,
      currentTheme,
      selectedCountry,
    },
    chart: {
      apiData: apiData.chart,
      currentTheme,
      selectedCountry,
    },
  };

  function toggleCurrentTheme() {
    const nextTheme = currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
    setCurrentTheme(nextTheme);
  }

  return (
    <div className={classNames}>
      <AppHeader {...appHeaderProps} />
      <div className="app-main">
        {/* <GlobalSection {...sectionsProps.global} />
        <CountriesSection {...sectionsProps.countries} />
        <MapSection {...sectionsProps.map} /> */}
        <TableSection {...sectionsProps.table} />
        {/* <ChartSection {...sectionsProps.chart} /> */}
      </div>
      <AppFooter />
    </div>
  );
}
