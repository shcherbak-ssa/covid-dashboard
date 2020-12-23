import React, { useState } from 'react';
import classnames from 'classnames';
import './app.scss';

import { TOTAL_TYPE_OPTION, CASES_PARAMETER_OPTION } from '../../constants';
import { optionsMenu } from '../../data/options-menu';

import AppHeader from './app-header';
import AppFooter from './app-footer';
import GlobalSection from '../global-section';
import CountriesSection from '../countries-section';
import MapSection from '../map-section';
import TableSection from '../table-section';
import ChartSection from '../chart-section';
import { transformDate } from '../../tools';

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
    lastDay: transformDate(apiData.lastDay),
    toggleCurrentTheme,
  };

  const commonSectionProps = {
    isDarkTheme,
    options,
    updateOptions,
    optionMenuItems,
    selectedCountry,
  };

  const sectionsProps = {
    global: {
      apiData: apiData.global,
      isDarkTheme,
    },
    countries: {
      apiData: apiData.countries,
      setSelectedCountry,
      ...commonSectionProps,
    },
    map: {
      apiData: apiData.map,
      setSelectedCountry,
      ...commonSectionProps,
    },
    table: {
      apiData: apiData.table,
      ...commonSectionProps,
    },
    chart: {
      apiData: apiData.chart,
      ...commonSectionProps,
    },
  };

  function toggleCurrentTheme() {
    setIsDarkTheme(!isDarkTheme);
    document.getElementById('keyboard').classList.toggle(DARK_THEME_CLASSNAME);
  }

  function updateOptions({label, dataKey, index}) {
    const updatedOptionMenuItems = {...optionMenuItems};
    updatedOptionMenuItems[dataKey].items.forEach((item, idx) => {
      item.isSelected = idx === index;
    });

    setOptionMenuItems(updatedOptionMenuItems);

    const updatedTextLabel = {...options};
    updatedTextLabel[dataKey] = label;

    setOptions(updatedTextLabel);
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
