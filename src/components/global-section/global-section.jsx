import React from 'react';
import './global-section.scss';

import Base from '@/components/base';
import Section from '../section';

export default function GlobalSection({openFullscreen}) {
  const sectionProps = {
    sectionType: 'global',
    openFullscreen: () => {
      openFullscreen({
        currentFullscreenTitle: 'Global',
        currentFullscreenContent: GlobalSectionFullscreenContent(),
      });
    },
  };
  
  return (
    <Section {...sectionProps}>
      <Base.Title value="Global cases" />
      <Base.NumberView type="cases" number={72742299} />
    </Section>
  );
}

function GlobalSectionFullscreenContent() {
  return (
    <div className="global-section-fullscreen-content">
      <GlobalSectionFullscreenItem title="Cases" />
      <GlobalSectionFullscreenItem title="Deaths" />
      <GlobalSectionFullscreenItem title="Recovered" />
    </div>
  );
}

function GlobalSectionFullscreenItem({title}) {
  return (
    <div className="global-section-fullscreen-item">
      <Base.Title value={title} />
    </div>
  );
}
