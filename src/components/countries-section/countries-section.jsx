import React from 'react';
import './countries-section.scss';

import Section from '../section';

export default function CountriesSection({apiData, currentTheme, openFullscreen}) {
  const sectionProps = {
    sectionType: 'countries',
    headerProps: {
      title: 'Cases by country',
      currentTheme,
      textLabel: false,
    },
    openFullscreen: () => {
      openFullscreen({
        currentFullscreenTitle: 'Cases by country',
        currentFullscreenContent: CountriesSectionFullscreenContent({apiData}),
      });
    },
  };
  
  return (
    <Section {...sectionProps}>
      {/* content */}
    </Section>
  );
}

function CountriesSectionFullscreenContent({apiData}) {
  return (
    <div className="countries-section-fullscreen-content"></div>
  );
}
