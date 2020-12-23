import React from 'react';
import './number-view.scss';

import { transformNumber } from '../../../tools';

export default function NumberView({type, number}) {
  return (
    <div className="base-number-view" data-number-type={type}>
      {transformNumber(number)}
    </div>
  );
}
