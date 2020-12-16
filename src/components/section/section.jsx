import React, { useState } from 'react';
import classnames from 'classnames';
import './section.scss';

import { getIconUrl, transformTextLabel } from '../../tools';
import Base from '../base';
import OptionsMenu from '../options-menu';
import { GLOBAL_SECTION_TYPE } from '../../constants';

export default function Section(props) {
  const {sectionType, fullscreenViewer, optionsMenuType, updateApiData} = props;
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
    document.body.style.overflow = 'hidden';

    if (fullscreenViewer) {
      fullscreenViewer(true);
    }
  }

  function closeFullscreen() {
    setIsFullscreen(false);

    document.body.classList.remove('fullscreen');
    document.body.style.overflow = '';

    if (fullscreenViewer) {
      fullscreenViewer(false);
    }
  }

  function toggleOptionsMenu() {
    setIsOptionsMenuOpen(!isOptionsMenuOpen);
  }

  return (
    <div className={classNames}>
      <div className="section-container">
        <div className="section-fullscreen-icon click flex-center" onClick={openFullscreen}>
          <img src={fullscreenIconUrl} />
        </div>
        <SectionHeader {...headerProps} />
        <div className="section-content">
          {props.children}
          {sectionType === GLOBAL_SECTION_TYPE ? '' : <OptionsMenu {...optionsMenuProps} />}
        </div>
      </div>
    </div>
  );
}

function SectionHeader(props) {
  const {title, isDarkTheme, headerIcon, textLabel} = props;

  const optionsIconProps = {
    icon: 'options',
    isDarkTheme,
    iconClickHandle: () => {
      props.toggleOptionsMenu();
    },
  };

  const closeIconProps = {
    isDarkTheme,
    icon: 'close',
    isActionIcon: false,
    iconClickHandle: props.closeFullscreen,
  }

  return (
    <div className="section-header flex-space-between">
      <Base.Title value={title} />
      <div className="section-icons">
        {headerIcon ? headerIcon : ''}
        {textLabel ? SectionOptionsIcon({textLabel, optionsIconProps}) : ''}
        <div className="section-fullscreen-close">
          <Base.Icon {...closeIconProps} />
        </div>
      </div>
    </div>
  );
}

function SectionOptionsIcon({textLabel, optionsIconProps}) {
  return (
    <div className="section-options-icon">
      <Base.TextLabel value={transformTextLabel(textLabel)} />
      <Base.Icon {...optionsIconProps} />
    </div>
  );
}
