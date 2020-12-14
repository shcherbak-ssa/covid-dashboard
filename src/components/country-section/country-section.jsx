import React, { useEffect, useState } from 'react';
import './country-section.scss';

import { COUNTRY_OPTIONS_MENU_TYPE } from '../../constants';
import { textLabelDefaultState, updateTextLabel, getSearchData } from '../../tools';
import Section from '../section';

export default function CountrySection(props) {
  const {title = 'Global', currentTheme, openFullscreen, /* selectedCountry */} = props;
  const [textLabel, setTextLabel] = useState(textLabelDefaultState);
  const [searchData, setSearchData] = useState(getSearchData(textLabel));
  // const [apiData, setApiData] = useState(props.apiData);
  // console.log(apiData, searchData);

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
        const updatedTextLabel = updateTextLabel(key, label, textLabel, setTextLabel);
        setSearchData(getSearchData(updatedTextLabel));
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
