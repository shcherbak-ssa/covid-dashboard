import React, { useEffect, useState } from 'react';
import './chart-section.scss';

import { CHART_OPTIONS_MENU_TYPE, TOTAL_TYPE_OPTION } from '../../constants';
import Section from '../section';

export default function ChartSection(props) {
  const {isDarkTheme, options, updateOptions, optionMenuItems, /* selectedCountry */} = props;
  const [searchData, setSearchData] = useState({});
  // const [apiData, setApiData] = useState(props.apiData);
  // console.log(apiData, searchData);

  useEffect(() => {
    setSearchData(getSearchData(options));
  }, [options]);

  const sectionProps = {
    sectionType: 'chart',
    optionsMenuType: CHART_OPTIONS_MENU_TYPE,
    headerProps: {
      title: 'Chart',
      isDarkTheme,
      options: transformOptions(options),
    },
    updateOptions,
    optionMenuItems,
  };

  function transformOptions({parameter, measurement}) {
    return {
      type: TOTAL_TYPE_OPTION,
      parameter,
      measurement,
    };
  }

  function getSearchData({parameter, measurement}) {
    return {
      key: TOTAL_TYPE_OPTION + measurement,
      parameter,
    };
  }
  
  return (
    <Section {...sectionProps}>
      <div className="chart-section-content">
        {/* your code */}
      </div>
    </Section>
  );
}
