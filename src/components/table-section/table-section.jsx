import React, { useEffect, useState } from 'react';
import './table-section.scss';

import { COUNTRY_OPTIONS_MENU_TYPE } from '../../constants';
import { textLabelDefaultState, updateTextLabel, getSearchData } from '../../tools';
import Base from '../base';
import Section from '../section';

const DEFAULT_SECTION_TITLE = 'Global';

export default function TableSection(props) {
  const {apiData, isDarkTheme, selectedCountry} = props;
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
    sectionType: 'table',
    optionsMenuType: COUNTRY_OPTIONS_MENU_TYPE,
    headerProps: {
      title: sectionTitle,
      isDarkTheme,
      textLabel,
    },
    updateApiData: (key, label) => {
      const updatedTextLabel = updateTextLabel(key, label, textLabel, setTextLabel);
      const searchData = getSearchData(updatedTextLabel);
      updateContent(searchData);
    },
  };

  function updateContent(searchData) {
    const searchObject = selectedCountry || apiData.global;
    setContent(searchObject[searchData.key]);
  }
  
  return (
    <Section {...sectionProps}>
      <TableSectionContent content={content} />
    </Section>
  );
}

function TableSectionContent({content}) {
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
    <div className="table-section-content">
      <TableSectionContentItem {...casesProps} />
      <TableSectionContentItem {...deathsProps} />
      <TableSectionContentItem {...recoveredProps} />
    </div>
  );
}

function TableSectionContentItem({type, title, number}) {
  return (
    <div className="table-section-content-item">
      <div className="table-section-content-title">{title}</div>
      <Base.NumberView type={type} number={number} />
    </div>
  );
}
