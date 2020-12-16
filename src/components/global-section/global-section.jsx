import React, { useState } from 'react';
import './global-section.scss';

import Base from '../base';
import Section from '../section';
import { GLOBAL_SECTION_TYPE } from '../../constants';

export default function GlobalSection({isDarkTheme, apiData}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const sectionProps = {
    sectionType: GLOBAL_SECTION_TYPE,
    fullscreenViewer: (isFullscreenActive) => {
      setIsFullscreen(isFullscreenActive);
    },
    headerProps: {
      title: 'Global',
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
        {isFullscreen ? <GlobalSectionItem {...deathsProps} /> : ''}
        {isFullscreen ? <GlobalSectionItem {...recoveredProps} /> : ''}
      </div>
    </Section>
  );
}

function GlobalSectionItem({type, title, number}) {
  return (
    <div className="global-section-item">
      <Base.Title value={title} />
      <Base.NumberView type={type} number={number} />
    </div>
  );
}
