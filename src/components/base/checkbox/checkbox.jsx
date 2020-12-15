import React, { useState } from 'react';
import classnames from 'classnames';
import './checkbox.scss';

import { IS_SELECTED_CLASSNAME } from '@/constants';
import { getIconUrl } from '@/tools';

export default function Checkbox(props) {
  const {isSelected, value, dataKey, label, clickHandle} = props;
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(isSelected);

  const iconUrl = getIconUrl('checked');
  const classNames = classnames('base-checkbox click', {
    [IS_SELECTED_CLASSNAME]: isCheckboxSelected
  });

  function checkboxClickHandle() {
    const nextIsCheckboxSelected = !isCheckboxSelected;
    setIsCheckboxSelected(nextIsCheckboxSelected);
    nextIsCheckboxSelected ? clickHandle({dataKey, label}) : clickHandle({dataKey, label: ''});
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
