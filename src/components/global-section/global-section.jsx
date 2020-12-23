import React, { useState } from 'react';
import './global-section.scss';

import Base from '../base';
import Section from '../section';
import { GLOBAL_SECTION_TYPE } from '../../constants';

const GLOBAL_SECTION_TITLE = 'Global';

export default function GlobalSection({isDarkTheme, apiData}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const sectionProps = {
    sectionType: GLOBAL_SECTION_TYPE,
    fullscreenViewer: (isFullscreenActive) => {
      setIsFullscreen(isFullscreenActive);
    },
    headerProps: {
      title: GLOBAL_SECTION_TITLE,
      isDarkTheme,
    },
  };

  const casesProps = {
    type: 'cases',
    title: isFullscreen ? 'Cases' : 'Global cases',
    number: apiData.cases,
  };

  const deathsProps = {
    type: 'deaths',
    title: 'Deaths',
    number: apiData.deaths,
  };

  const recoveredProps = {
    type: 'recovered',
    title: 'Recovered',
    number: apiData.recovered,
  };
  
  return (
    <Section {...sectionProps}>
      <div className="global-section-content">
        <GlobalSectionItem {...casesProps} />
        {isFullscreen ? getFullscreenItems(deathsProps, recoveredProps) : ''}
      </div>
    </Section>
  );
}

function getFullscreenItems(deathsProps, recoveredProps) {
  return [
    <GlobalSectionItem key={0} {...deathsProps} />,
    <GlobalSectionItem key={1} {...recoveredProps} />
  ];
}

function GlobalSectionItem({type, title, number}) {
  return (
    <div className="global-section-item">
      <Base.Title value={title} />
      <Base.NumberView type={type} number={number} />
    </div>
  );
}
