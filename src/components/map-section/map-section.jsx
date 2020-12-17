import React, { useState } from 'react';
import './map-section.scss';

import { getSearchData } from '../../tools';
import Section from '../section';
import MapLegend from './map-legend';

export default function MapSection(props) {
  const {isDarkTheme, options, updateOptions, optionMenuItems, /* setSelectedCountry */} = props;
  // const [textLabel, setTextLabel] = useState(textLabelDefaultState);
  // const [searchData, setSearchData] = useState(getSearchData(textLabel));
  // const [apiData, setApiData] = useState(props.apiData);
  // console.log(apiData, searchData);

  const sectionProps = {
    sectionType: 'map',
    headerProps: {
      title: 'Map',
      headerIcon: MapLegend({isDarkTheme}),
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

function MapSectionFullscreenContent() {
  return (
    <div className="map-section-fullscreen-content">
      {/* your code */}
    </div>
  );
}
