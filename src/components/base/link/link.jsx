import React from 'react';
import './link.scss';

import { getIconUrl } from '@/tools';

export default function Link({icon, value, href}) {
  const iconUrl = getIconUrl(icon);

  return (
    <a className="base-link click" href={href} target="_blank">
      <img className="base-link-icon" src={iconUrl} />
      {value}
    </a>
  );
}
