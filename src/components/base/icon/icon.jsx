import React, { useState } from 'react';
import classnames from 'classnames';
import './icon.scss';

import { getIconUrl } from '../../../tools';
import { IS_ACTIVE_CLASSNAME } from '../../../constants';

export default function Icon(props) {
  const {isDarkTheme, icon, iconClickHandle, isActionIcon = true} = props;
  const [isActive, setIsActive] = useState(false);
  const iconUrl = getIconUrl(icon, isDarkTheme);

  const className = classnames('base-icon click flex-center', {
    [IS_ACTIVE_CLASSNAME]: isActive,
  });

  function clickHandle() {
    if (isActionIcon) {
      isActive ? setIsActive(false) : setIsActive(true);
    }

    iconClickHandle(isActive);
  }
  
  return (
    <div className={className} onClick={clickHandle}>
      <img src={iconUrl}/>
    </div>
  );
}
