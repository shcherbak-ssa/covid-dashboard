import React from 'react';
import classnames from 'classnames';
import './section.scss';

import { getIconUrl } from '@/tools';
import Base from '@/components/base';

export default function Section(props) {
  const {sectionType, headerProps, openFullscreen} = props;
  const classNames = classnames('section', `${sectionType}-section`);
  const fullscreenIconUrl = getIconUrl('fullscreen');

  return (
    <div className={classNames}>
      {headerProps ? <SectionHeader {...headerProps}/> : ''}
      <div className="section-fullscreen click flex-center" onClick={openFullscreen}>
        <img src={fullscreenIconUrl} />
      </div>
      <div className="section-content">
        {props.children}
      </div>
    </div>
  );
}

function SectionHeader({title, textLabel = true, iconClickHandle}) {
  const optionsIconProps = {
    icon: 'options',
    iconClickHandle,
  };

  return (
    <div className="section-header flex-space-between">
      <Base.Title value={title} />
      <div className="section-icons">
        {textLabel ? <Base.TextLabel value="[text-label]" /> : ''}
        <Base.Icon {...optionsIconProps} />
      </div>
    </div>
  );
}
