import React from 'react';
import './global-section.scss';

import Base from '../base';
import Section from '../section';

export default function GlobalSection({apiData, openFullscreen}) {
  const sectionProps = {
    sectionType: 'global',
    openFullscreen: () => {
      openFullscreen({
        currentFullscreenTitle: 'Global',
        currentFullscreenContent: GlobalSectionFullscreenContent({apiData}),
      });
    },
  };
  
  return (
    <Section {...sectionProps}>
      <Base.Title value="Global cases" />
      <Base.NumberView type="cases" number={apiData.cases} />
    </Section>
  );
}

function GlobalSectionFullscreenContent({apiData}) {
  const casesProps = {
    type: 'cases',
    title: 'Cases',
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
    <div className="global-section-fullscreen-content">
      <GlobalSectionFullscreenItem {...casesProps} />
      <GlobalSectionFullscreenItem {...deathsProps} />
      <GlobalSectionFullscreenItem {...recoveredProps} />
    </div>
  );
}

function GlobalSectionFullscreenItem({type, title, number}) {
  return (
    <div className="global-section-fullscreen-item">
      <Base.Title value={title} />
      <Base.NumberView type={type} number={number} />
    </div>
  );
}
