import React, { useState } from 'react';
import classnames from 'classnames';
import './icon.scss';

import { IS_ACTIVE_CLASSNAME } from '@/constants';

export default function Icon({icon, iconClickHandle}) {
  const [isActive, setIsActive] = useState(false);
  const iconUrl = getIconUrl(icon);

  const className = classnames('base-icon click flex-center', {
    [IS_ACTIVE_CLASSNAME]: isActive,
  });

  function clickHandle() {
    isActive ? setIsActive(false) : setIsActive(true);
    iconClickHandle(isActive);
  }
  
  return (
    <div className={className} onClick={clickHandle}>
      <img src={iconUrl}/>
    </div>
  );
}
