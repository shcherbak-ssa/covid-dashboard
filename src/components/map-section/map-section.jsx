import React, { useState } from 'react';
import './map-section.scss';

import { textLabelDefaultState, updateTextLabel, getSearchData } from '../../tools';
import Section from '../section';
import MapLegend from './map-legend';

export default function MapSection(props) {
  const {currentTheme, openFullscreen, /* setSelectedCountry */} = props;
  const [textLabel, setTextLabel] = useState(textLabelDefaultState);
  const [searchData, setSearchData] = useState(getSearchData(textLabel));
  // const [apiData, setApiData] = useState(props.apiData);
  // console.log(apiData, searchData);

  const sectionProps = {
    sectionType: 'map',
    headerProps: {
      title: 'Map',
      headerIcon: MapLegend({currentTheme}),
      currentTheme,
      textLabel,
      updateApiData: (key, label) => {
        const updatedTextLabel = updateTextLabel(key, label, textLabel, setTextLabel);
        setSearchData(getSearchData(updatedTextLabel));
      },
    },
    openFullscreen: () => {
      openFullscreen({
        currentFullscreenTitle: 'Map',
        currentFullscreenContent: MapSectionFullscreenContent(),
      });
    },
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
