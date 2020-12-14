import React from 'react';
import classnames from 'classnames';
import './fullscreen.scss';

import { IS_OPEN_CLASSNAME } from '@/constants';
import Base from '@/components/base';

export default function Fullscreen(props) {
  const {currentTheme, isOpen, title, content, closeFullscreen} = props;
  const classNames = classnames('fullscreen', {
    [IS_OPEN_CLASSNAME]: isOpen
  });

  const closeIconProps = {
    currentTheme,
    icon: 'close',
    isActionIcon: false,
    iconClickHandle: closeFullscreen,
  }

  return (
    <div className={classNames}>
      <div className="fullscreen-container">
        <div className="fullscreen-header flex-space-between">
          <Base.Title value={title} />
          <Base.Icon {...closeIconProps} />
        </div>
        <div className="fullscreen-content">{content}</div>
      </div>
    </div>
  );
}
