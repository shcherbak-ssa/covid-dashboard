import React, { useState } from 'react';
import './countries-section.scss';

import { getSearchData } from '../../tools';
import Section from '../section';

export default function CountriesSection(props) {
  const {isDarkTheme, options, updateOptions, optionMenuItems, /* setSelectedCountry */} = props;
  // const [textLabel, setTextLabel] = useState(textLabelDefaultState);
  // const [searchData, setSearchData] = useState(getSearchData(textLabel));
  // const [apiData, setApiData] = useState(props.apiData);
  // console.log(apiData, searchData);

  const sectionProps = {
    sectionType: 'countries',
    headerProps: {
      title: 'Countries',
      isDarkTheme,
      options,
    },
    updateOptions,
    optionMenuItems,
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
