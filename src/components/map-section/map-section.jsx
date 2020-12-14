import React from 'react';
import './map-section.scss';

import Section from '../section';

export default function MapSection({apiData, currentTheme, openFullscreen}) {
  const sectionProps = {
    sectionType: 'map',
    headerProps: {
      title: 'Map',
      currentTheme,
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
      {/* content */}
    </Section>
  );
}

function MapSectionFullscreenContent({apiData}) {
  return (
    <div className="map-section-fullscreen-content"></div>
  );
}
