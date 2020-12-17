import React, { useState } from 'react';
import classnames from 'classnames';
import './checkbox.scss';

import { IS_SELECTED_CLASSNAME } from '../../../constants';
import { getIconUrl } from '../../../tools';

export default function Checkbox(props) {
  const {isSelected, value, dataKey, label, index, clickHandle} = props;

  const iconUrl = getIconUrl('checked');
  const classNames = classnames('base-checkbox click', {
    [IS_SELECTED_CLASSNAME]: isSelected
  });

  function checkboxClickHandle() {
    !isSelected
      ? clickHandle({dataKey, label, index})
      : clickHandle({dataKey, label: '', index: -1});
  }

  return (
    <div className={classNames} onClick={checkboxClickHandle}>
      <div className="base-checkbox-label flex-center">
        <img src={iconUrl} />
      </div>
      {value}
    </div>
  );
}
