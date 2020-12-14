import React from 'react';
import './chart-section.scss';

import Section from '../section';

export default function ChartSection(props) {
  const {apiData, currentTheme, openFullscreen} = props;
  const sectionProps = {
    sectionType: 'chart',
    headerProps: {
      title: 'Chart',
      currentTheme,
    },
    openFullscreen: () => {
      openFullscreen({
        currentFullscreenTitle: 'Chart',
        currentFullscreenContent: ChartSectionFullscreenContent({apiData}),
      });
    },
  };
  
  return (
    <Section {...sectionProps}>
      {/* content */}
    </Section>
  );
}

function ChartSectionFullscreenContent({apiData}) {
  return (
    <div className="chart-section-fullscreen-content"></div>
  );
}
