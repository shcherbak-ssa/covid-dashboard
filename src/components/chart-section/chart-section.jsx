import React, { useState } from 'react';
import './chart-section.scss';

import { CHART_OPTIONS_MENU_TYPE } from '../../constants';
import { textLabelDefaultState, updateTextLabel, getSearchData } from '../../tools';
import Section from '../section';

export default function ChartSection(props) {
  const {currentTheme, openFullscreen, /* selectedCountry */} = props;
  const [textLabel, setTextLabel] = useState(textLabelDefaultState);
  const [searchData, setSearchData] = useState(getSearchData(textLabel));
  // const [apiData, setApiData] = useState(props.apiData);
  // console.log(apiData, searchData);

  const sectionProps = {
    sectionType: 'chart',
    headerProps: {
      title: 'Chart',
      currentTheme,
      textLabel,
      optionsMenuType: CHART_OPTIONS_MENU_TYPE,
      updateApiData: (key, label) => {
        const updatedTextLabel = updateTextLabel(key, label, textLabel, setTextLabel);
        setSearchData(getSearchData(updatedTextLabel));
      },
    },
    openFullscreen: () => {
      openFullscreen({
        currentFullscreenTitle: 'Chart',
        currentFullscreenContent: ChartSectionFullscreenContent({apiData}),
      });
    },
  };
  
  return (
    <Section {...sectionProps}>
      {/* your code */}
    </Section>
  );
}

function ChartSectionFullscreenContent({apiData}) {
  return (
    <div className="chart-section-fullscreen-content">
      {/* your code */}
    </div>
  );
}
