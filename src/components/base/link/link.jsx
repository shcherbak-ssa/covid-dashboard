import React from 'react';

export default function Link({icon, value, href}) {
  const iconUrl = `./assets/${icon}.svg`;

  return (
    <a className="base-link click" href={href} target="_blank">
      <img className="base-link-icon" src={iconUrl} />
      {value}
    </a>
  );
}
