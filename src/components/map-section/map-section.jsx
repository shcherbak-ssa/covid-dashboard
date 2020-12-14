import React, { useState } from 'react';
import './map-section.scss';

import { textLabelDefaultState, updateTextLabel } from '@/tools';
import Section from '../section';

export default function MapSection(props) {
  const {apiData, currentTheme, openFullscreen} = props;
  const [textLabel, setTextLabel] = useState(textLabelDefaultState);

  const sectionProps = {
    sectionType: 'map',
    headerProps: {
      title: 'Map',
      currentTheme,
      textLabel,
      updateApiData: (key, label) => {
        console.log(key, label);
        updateTextLabel(key, label, textLabel, setTextLabel);
      },
    },
    openFullscreen: () => {
      openFullscreen({
        currentFullscreenTitle: 'Map',
        currentFullscreenContent: MapSectionFullscreenContent({apiData}),
      });
    },
  };
  
  return (
    <Section {...sectionProps}>
      {/* your code */}
    </Section>
  );
}

function MapSectionFullscreenContent({apiData}) {
  return (
    <div className="map-section-fullscreen-content">
      {/* your code */}
    </div>
  );
}
