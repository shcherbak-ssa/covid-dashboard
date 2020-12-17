import React, { useEffect, useState } from 'react';
import './table-section.scss';

import { COUNTRY_OPTIONS_MENU_TYPE } from '../../constants';
import Base from '../base';
import Section from '../section';

const DEFAULT_SECTION_TITLE = 'Global';

export default function TableSection(props) {
  const {apiData, isDarkTheme, options, updateOptions, optionMenuItems, selectedCountry} = props;
  const [sectionTitle, setSectionTitle] = useState('');
  const [content, setContent] = useState({});

  useEffect(() => {
    updateContent();
  }, [options]);

  useEffect(() => {
    const title = selectedCountry ? selectedCountry.countryName : DEFAULT_SECTION_TITLE;
    setSectionTitle(title);
    updateContent();
  }, [selectedCountry]);

  const sectionProps = {
    sectionType: 'table',
    optionsMenuType: COUNTRY_OPTIONS_MENU_TYPE,
    headerProps: {
      title: sectionTitle,
      isDarkTheme,
      options: transformOptions(options),
    },
    updateOptions,
    optionMenuItems,
  };

  function updateContent() {
    const searchData = getSearchData(options);
    const searchObject = selectedCountry || apiData.global;
    setContent(searchObject[searchData.key]);
  }

  function transformOptions({type, measurement}) {
    return {
      type,
      parameter: '',
      measurement,
    };
  }

  function getSearchData({type, measurement}) {
    return {
      key: type + measurement,
    };
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
    <div className="table-section-item">
      <div className="table-section-title">{title}</div>
      <Base.NumberView type={type} number={number} />
    </div>
  );
}
