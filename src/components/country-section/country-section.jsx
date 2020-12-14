import React from 'react';
import './country-section.scss';

import Section from '../section';

export default function CountrySection(props) {
  const {apiData, title = 'Global', currentTheme, openFullscreen} = props;
  const sectionProps = {
    sectionType: 'country',
    headerProps: {
      title,
      currentTheme,
    },
    openFullscreen: () => {
      openFullscreen({
        currentFullscreenTitle: title,
        currentFullscreenContent: CountrySectionFullscreenContent({apiData}),
      });
    },
  };
  
  return (
    <Section {...sectionProps}>
      {/* content */}
    </Section>
  );
}

function CountrySectionFullscreenContent({apiData}) {
  return (
    <div className="country-section-fullscreen-content"></div>
  );
}
