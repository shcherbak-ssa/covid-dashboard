import React, { useState } from 'react';
import classnames from 'classnames';
import './radio.scss';

import { IS_SELECTED_CLASSNAME } from '../../../constants';

export default function Radio(props) {
  const {isSelected, value, dataKey, label, index, clickHandle} = props;
  const classNames = classnames('base-radio click', {
    [IS_SELECTED_CLASSNAME]: isSelected
  });

  function radioClickHandle() {
    clickHandle({dataKey, label, index});
  }

  return (
    <div className={classNames} onClick={radioClickHandle}>
      <div className="base-radio-label flex-center">
        <span></span>
      </div>
      {value}
    </div>
  );
}
