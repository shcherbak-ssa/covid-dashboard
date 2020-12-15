import React, { useEffect, useState } from 'react';
import './country-section.scss';

import { COUNTRY_OPTIONS_MENU_TYPE } from '../../constants';
import { textLabelDefaultState, updateTextLabel, getSearchData } from '../../tools';
import Base from '../base';
import Section from '../section';

const DEFAULT_SECTION_TITLE = 'Global';

export default function CountrySection(props) {
  const {apiData, currentTheme, openFullscreen, selectedCountry} = props;
  const [sectionTitle, setSectionTitle] = useState('');
  const [textLabel, setTextLabel] = useState(textLabelDefaultState);
  const [content, setContent] = useState({});

  useEffect(() => {
    updateTextLabel('parameter', '', textLabel, setTextLabel);
  }, []);

  useEffect(() => {
    const title = selectedCountry ? selectedCountry.countryName : DEFAULT_SECTION_TITLE;
    setSectionTitle(title);

    const searchData = getSearchData(textLabel);
    updateContent(searchData);
  }, [selectedCountry]);

  const sectionProps = {
    sectionType: 'country',
    headerProps: {
      title: sectionTitle,
      currentTheme,
      textLabel,
      optionsMenuType: COUNTRY_OPTIONS_MENU_TYPE,
      updateApiData: (key, label) => {
        const updatedTextLabel = updateTextLabel(key, label, textLabel, setTextLabel);
        const searchData = getSearchData(updatedTextLabel);
        updateContent(searchData);
      },
    },
    openFullscreen: () => {
      openFullscreen({
        currentFullscreenTitle: sectionTitle,
        currentFullscreenContent: CountrySectionFullscreenContent(),
      });
    },
  };

  function updateContent(searchData) {
    const searchObject = selectedCountry || apiData.global;
    setContent(searchObject[searchData.key]);
  }
  
  return (
    <Section {...sectionProps}>
      <CountrySectionContent content={content} />
    </Section>
  );
}

function CountrySectionContent({content}) {
  const casesProps = {
    type: 'cases',
    title: 'Cases',
    number: content.cases,
  };
  const deathsProps = {
    type: 'deaths',
    title: 'Deaths',
    number: content.deaths,
  };
  const recoveredProps = {
    type: 'recovered',
    title: 'Recovered',
    number: content.recovered,
  };

  return (
    <div className="country-section-content">
      <CountrySectionContentItem {...casesProps} />
      <CountrySectionContentItem {...deathsProps} />
      <CountrySectionContentItem {...recoveredProps} />
    </div>
  );
}

function CountrySectionContentItem({type, title, number}) {
  return (
    <div className="country-section-content-item">
      <div className="country-section-content-title">{title}</div>
      <Base.NumberView type={type} number={number} />
    </div>
  );
}

function CountrySectionFullscreenContent() {
  return (
    <div className="country-section-fullscreen-content">
      {/* your code */}
    </div>
  );
}
