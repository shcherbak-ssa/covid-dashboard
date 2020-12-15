import React, { useState } from 'react';
import classnames from 'classnames';
import './section.scss';

import { getIconUrl } from '../../tools';
import Base from '../base';
import OptionsMenu from '../options-menu';

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

function SectionHeader(props) {
  const {title, currentTheme, headerIcon, optionsMenuType, textLabel, updateApiData} = props;
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const optionsIconProps = {
    icon: 'options',
    currentTheme,
    iconClickHandle: () => {
      setIsOptionsMenuOpen(!isOptionsMenuOpen);
    },
  };

  const optionsMenuProps = {
    isOpen: isOptionsMenuOpen,
    menuType: optionsMenuType,
    updateApiData,
  };

  function transformTextLabel() {
    const {type, parameter, measurement} = textLabel;
    const measure = measurement ? ` / ${measurement}` : '';
    const param = parameter ? ` ${parameter}` : '';
    return type + param + measure;
  }

  return (
    <div className="section-header flex-space-between">
      <Base.Title value={title} />
      <div className="section-icons">
        {headerIcon ? headerIcon : ''}
        <Base.TextLabel value={transformTextLabel()} />
          <Base.Icon {...optionsIconProps} />
        </div>
        <OptionsMenu {...optionsMenuProps} />
    </div>
  );
}
