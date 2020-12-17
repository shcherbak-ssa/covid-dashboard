import React, { useState } from 'react';
import classnames from 'classnames';
import './app.scss';

import { TOTAL_TYPE_OPTION, CASES_PARAMETER_OPTION } from '../../constants';
import { optionsMenu } from '../../data/options-menu';

import AppHeader from './app-header';
import AppFooter from './app-footer';
import GlobalSection from '../global-section';
// import CountriesSection from '../countries-section';
// import MapSection from '../map-section';
import TableSection from '../table-section';
import ChartSection from '../chart-section';

const DARK_THEME_CLASSNAME = 'dark-theme';

const optionsDefaultState = {
  type: TOTAL_TYPE_OPTION,
  parameter: CASES_PARAMETER_OPTION,
  measurement: '',
};

export default function App({apiData}) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [options, setOptions] = useState(optionsDefaultState);
  const [optionMenuItems, setOptionMenuItems] = useState(optionsMenu);

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
      options,
      selectedCountry,
      optionMenuItems,
      updateOptions,
      setSelectedCountry,
    },
    map: {
      apiData: apiData.map,
      isDarkTheme,
      options,
      selectedCountry,
      optionMenuItems,
      updateOptions,
      setSelectedCountry,
    },
    table: {
      apiData: apiData.table,
      isDarkTheme,
      options,
      selectedCountry,
      optionMenuItems,
      updateOptions,
    },
    chart: {
      apiData: apiData.chart,
      isDarkTheme,
      options,
      selectedCountry,
      optionMenuItems,
      updateOptions,
    },
  };

  function toggleCurrentTheme() {
    setIsDarkTheme(!isDarkTheme);
  }

  function updateOptions({label, dataKey, index}) {
    if (index !== undefined) {
      const updatedMenuItems = {...optionMenuItems};
      updatedMenuItems[dataKey].items.forEach((item, idx) => {
        item.isSelected = idx === index;
      });
  
      setOptionMenuItems(updatedMenuItems);
    }

    const updatedTextLabel = {...options};
    updatedTextLabel[dataKey] = label;
    setOptions(updatedTextLabel);
  }

  return (
    <div className={classNames}>
      <AppHeader {...appHeaderProps} />
      <div className="app-main">
        <GlobalSection {...sectionsProps.global} />
        {/* <CountriesSection {...sectionsProps.countries} />
        <MapSection {...sectionsProps.map} /> */}
        <TableSection {...sectionsProps.table} />
        <ChartSection {...sectionsProps.chart} />
      </div>
      <AppFooter />
    </div>
  );
}
