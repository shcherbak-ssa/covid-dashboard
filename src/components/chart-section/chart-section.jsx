import React, { useState } from 'react';
import './chart-section.scss';

import { CHART_OPTIONS_MENU_TYPE } from '@/constants';
import { textLabelDefaultState, updateTextLabel } from '@/tools';
import Section from '../section';

export default function ChartSection(props) {
  const {apiData, currentTheme, openFullscreen} = props;
  const [textLabel, setTextLabel] = useState(textLabelDefaultState);

  const sectionProps = {
    sectionType: 'chart',
    headerProps: {
      title: 'Chart',
      currentTheme,
      textLabel,
      optionsMenuType: CHART_OPTIONS_MENU_TYPE,
      updateApiData: (key, label) => {
        updateTextLabel(key, label, textLabel, setTextLabel);
      },
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
      {/* your code */}
    </Section>
  );
}

function ChartSectionFullscreenContent({apiData}) {
  return (
    <div className="chart-section-fullscreen-content">
      {/* your code */}
    </div>
  );
}
