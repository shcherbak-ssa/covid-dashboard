import React from 'react';
import './global-section.scss';

import Base from '@/components/base';
import Section from '../section';

export default function GlobalSection({openFullscreen}) {
  const sectionProps = {
    sectionType: 'global',
    openFullscreen,
  };
  
  return (
    <Section {...sectionProps}>
      <Base.Title value="Global cases" />
    </Section>
  );
}
