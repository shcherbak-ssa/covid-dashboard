import React, { useState } from 'react';
import classnames from 'classnames';
import './section.scss';

import { getIconUrl, transformTextLabel } from '../../tools';
import Base from '../base';
import OptionsMenu from '../options-menu';

export default function Section(props) {
  const {sectionType, optionsMenuType, updateApiData} = props;
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);

  const fullscreenIconUrl = getIconUrl('fullscreen');
  const classNames = classnames('section', `${sectionType}-section`, {
    'section-fullscreen': isFullscreen,
  });

  const headerProps = {
    ...props.headerProps,
    closeFullscreen,
    toggleOptionsMenu,
  };

  const optionsMenuProps = {
    isOpen: isOptionsMenuOpen,
    menuType: optionsMenuType,
    updateApiData,
  };

  function openFullscreen() {
    setIsFullscreen(true);
    document.body.classList.add('fullscreen');
  }

  function closeFullscreen() {
    setIsFullscreen(false);
    document.body.classList.remove('fullscreen');
  }

  function toggleOptionsMenu() {
    setIsOptionsMenuOpen(!isOptionsMenuOpen);
  }

  return (
    <div className={classNames}>
      <div className="section-fullscreen-icon click flex-center" onClick={openFullscreen}>
        <img src={fullscreenIconUrl} />
      </div>
      <SectionHeader {...headerProps} />
      <div className="section-content">
        {props.children}
        <OptionsMenu {...optionsMenuProps} />
      </div>
    </div>
  );
}

function SectionHeader(props) {
  const {title, currentTheme, headerIcon, textLabel} = props;

  const optionsIconProps = {
    icon: 'options',
    currentTheme,
    iconClickHandle: () => {
      props.toggleOptionsMenu();
    },
  };

  const closeIconProps = {
    currentTheme,
    icon: 'close',
    isActionIcon: false,
    iconClickHandle: props.closeFullscreen,
  }

  return (
    <div className="section-header flex-space-between">
      <Base.Title value={title} />
      <div className="section-icons">
        {headerIcon ? headerIcon : ''}
        <div className="section-options-icon">
          <Base.TextLabel value={transformTextLabel(textLabel)} />
          <Base.Icon {...optionsIconProps} />
        </div>
        <div className="section-fullscreen-close">
          <Base.Icon {...closeIconProps} />
        </div>
      </div>
    </div>
  );
}
