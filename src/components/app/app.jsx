import React, { useState } from 'react';
import classnames from 'classnames';
import './app.scss';

import AppHeader from './app-header';
import AppFooter from './app-footer';
import GlobalSection from '../global-section';
import CountriesSection from '../countries-section';
import MapSection from '../map-section';
import TableSection from '../table-section';
import ChartSection from '../chart-section';

const DARK_THEME_CLASSNAME = 'dark-theme';

export default function App({apiData}) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const classNames = classnames('app', {
    [DARK_THEME_CLASSNAME]: isDarkTheme
  });

  const appHeaderProps = {
    isDarkTheme,
    toggleCurrentTheme,
  };

  const sectionsProps = {
    global: {
      apiData: apiData.global,
      isDarkTheme,
    },
    countries: {
      apiData: apiData.countries,
      isDarkTheme,
      setSelectedCountry,
    },
    map: {
      apiData: apiData.map,
      isDarkTheme,
      setSelectedCountry,
    },
    table: {
      apiData: apiData.table,
      isDarkTheme,
      selectedCountry,
    },
    chart: {
      apiData: apiData.chart,
      isDarkTheme,
      selectedCountry,
    },
  };

  function toggleCurrentTheme() {
    setIsDarkTheme(!isDarkTheme);
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
      </div>
      <AppFooter />
    </div>
  );
}
