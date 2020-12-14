import React, { useEffect, useState } from 'react';
import './country-section.scss';

import { COUNTRY_OPTIONS_MENU_TYPE } from '@/constants';
import { textLabelDefaultState, updateTextLabel } from '@/tools';
import Section from '../section';

export default function CountrySection(props) {
  const {apiData, title = 'Global', currentTheme, openFullscreen} = props;
  const [textLabel, setTextLabel] = useState(textLabelDefaultState);

  useEffect(() => {
    updateTextLabel('parameter', '', textLabel, setTextLabel);
  }, []);

  const sectionProps = {
    sectionType: 'country',
    headerProps: {
      title,
      currentTheme,
      textLabel,
      optionsMenuType: COUNTRY_OPTIONS_MENU_TYPE,
      updateApiData: (key, label) => {
        console.log(key, label);
        updateTextLabel(key, label, textLabel, setTextLabel);
      },
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
      {/* your code */}
    </Section>
  );
}

function CountrySectionFullscreenContent({apiData}) {
  return (
    <div className="country-section-fullscreen-content">
      {/* your code */}
    </div>
  );
}
