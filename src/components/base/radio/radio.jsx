import React from 'react';
import './radio.scss';

export default function Radio({value}) {
  return (
    <div className="base-radio click">
      <div className="base-radio-label flex-center">
        <span></span>
      </div>
      {value}
    </div>
  );
}
