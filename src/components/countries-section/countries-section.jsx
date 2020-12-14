import React, { useState } from 'react';
import './countries-section.scss';

import { textLabelDefaultState, updateTextLabel } from '@/tools';
import Section from '../section';

export default function CountriesSection(props) {
  const {apiData, currentTheme, openFullscreen} = props;
  const [textLabel, setTextLabel] = useState(textLabelDefaultState);

  const sectionProps = {
    sectionType: 'countries',
    headerProps: {
      title: 'Cases by country',
      currentTheme,
      textLabel,
      updateApiData: (key, label) => {
        console.log(key, label);
        updateTextLabel(key, label, textLabel, setTextLabel);
      },
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
      {/* your code */}
    </Section>
  );
}

function CountriesSectionFullscreenContent({apiData}) {
  return (
    <div className="countries-section-fullscreen-content">
      {/* your code */}
    </div>
  );
}
