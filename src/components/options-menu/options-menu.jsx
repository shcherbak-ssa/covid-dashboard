import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import './options-menu.scss';

import {
  IS_OPEN_CLASSNAME,
  COUNTRY_OPTIONS_MENU_TYPE,
  MEASUREMENT_TITLE,
} from '../../constants';

import Base from '../base';

export default function OptionsMenu(props) {
  const {isOpen, menuType, optionMenuItems, updateOptions} = props;
  const [menuItems, setMenuItems] = useState({});

  const classNames = classnames('options-menu', {
    [IS_OPEN_CLASSNAME]: isOpen
  });

  useEffect(() => {
    if (menuType === COUNTRY_OPTIONS_MENU_TYPE) {
      const {type, measurement} = optionMenuItems;
      setMenuItems({type, measurement});
    } else {
      setMenuItems(optionMenuItems);
    }
  }, [optionMenuItems]);

  function drawMenu() {
    return Object.entries(menuItems).map(([key, {title, items}], idx) => {
      const itemsProps = items.map((item, index) => {
        return {...item, dataKey: key, index, clickHandle};
      });
      return <OptionsMenuSection key={idx} value={title} itemsProps={itemsProps} />
    });
  }

  function clickHandle(optionForUpdate) {
    updateOptions(optionForUpdate);
  }

  return (
    <div className={classNames}>{drawMenu()}</div>
  );
}

function OptionsMenuSection({value, itemsProps}) {
  return (
    <div className="options-menu-section">
      <div className="options-menu-divider">{value}</div>
      {
        itemsProps.map((props, index) => {
          if (value === MEASUREMENT_TITLE) return <Base.Checkbox key={index} {...props} />
          return <Base.Radio key={index} {...props} />
        })
      }
    </div>
  );
}
