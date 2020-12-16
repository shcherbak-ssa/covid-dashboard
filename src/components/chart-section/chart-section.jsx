import React, { useState } from 'react';
import './chart-section.scss';

import { CHART_OPTIONS_MENU_TYPE } from '../../constants';
import { textLabelDefaultState, updateTextLabel, getSearchData } from '../../tools';
import Section from '../section';

export default function ChartSection(props) {
  const {currentTheme, /* selectedCountry */} = props;
  const [textLabel, setTextLabel] = useState(textLabelDefaultState);
  const [searchData, setSearchData] = useState(getSearchData(textLabel));
  // const [apiData, setApiData] = useState(props.apiData);
  // console.log(apiData, searchData);

  const sectionProps = {
    sectionType: 'chart',
    optionsMenuType: CHART_OPTIONS_MENU_TYPE,
    headerProps: {
      title: 'Chart',
      currentTheme,
      textLabel,
    },
    updateApiData: (key, label) => {
      const updatedTextLabel = updateTextLabel(key, label, textLabel, setTextLabel);
      setSearchData(getSearchData(updatedTextLabel));
    },
  };
  
  return (
    <Section {...sectionProps}>
      {/* your code */}
    </Section>
  );
}
