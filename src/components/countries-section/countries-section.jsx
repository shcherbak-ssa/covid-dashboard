import React, { useState } from 'react';
import './countries-section.scss';

import { textLabelDefaultState, updateTextLabel, getSearchData } from '../../tools';
import Section from '../section';

export default function CountriesSection(props) {
  const {currentTheme, openFullscreen, /* setSelectedCountry */} = props;
  const [textLabel, setTextLabel] = useState(textLabelDefaultState);
  const [searchData, setSearchData] = useState(getSearchData(textLabel));
  // const [apiData, setApiData] = useState(props.apiData);
  // console.log(apiData, searchData);

  const sectionProps = {
    sectionType: 'countries',
    headerProps: {
      title: 'Cases by country',
      currentTheme,
      textLabel,
      updateApiData: (key, label) => {
        const updatedTextLabel = updateTextLabel(key, label, textLabel, setTextLabel);
        setSearchData(getSearchData(updatedTextLabel));
      },
    },
    openFullscreen: () => {
      openFullscreen({
        currentFullscreenTitle: 'Cases by country',
        currentFullscreenContent: CountriesSectionFullscreenContent(),
      });
    },
  };
  
  return (
    <Section {...sectionProps}>
      {/* your code */}
    </Section>
  );
}

function CountriesSectionFullscreenContent() {
  return (
    <div className="countries-section-fullscreen-content">
      {/* your code */}
    </div>
  );
}
