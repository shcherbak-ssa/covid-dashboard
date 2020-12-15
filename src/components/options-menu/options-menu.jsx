import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import lodash from 'lodash';
import './options-menu.scss';

import {
  IS_OPEN_CLASSNAME,
  COUNTRY_OPTIONS_MENU_TYPE,
  CHART_OPTIONS_MENU_TYPE,
  MEASUREMENT_TITLE,
} from '@/constants';

import { optionsMenu } from '@/data/options-menu';
import Base from '@/components/base';

export default function OptionsMenu({isOpen, menuType, updateApiData}) {
  const [menuItems, setMenuItems] = useState({});
  const classNames = classnames('options-menu', {
    [IS_OPEN_CLASSNAME]: isOpen
  });

  useEffect(() => {
    const clonedOptionsMenu = lodash.cloneDeep(optionsMenu);

    if (menuType === COUNTRY_OPTIONS_MENU_TYPE) {
      const {type, measurement} = clonedOptionsMenu;
      setMenuItems({type, measurement});
    } else if (menuType === CHART_OPTIONS_MENU_TYPE) {
      const {parameter, measurement} = clonedOptionsMenu;
      setMenuItems({parameter, measurement});
    } else {
      setMenuItems(clonedOptionsMenu);
    }
  }, []);

  function drawMenu() {
    return Object.entries(menuItems).map(([key, {title, items}], idx) => {
      const itemsProps = items.map((item, index) => {
        return {...item, dataKey: key, index, clickHandle};
      });
      return <OptionsMenuSection key={idx} value={title} itemsProps={itemsProps} />
    });
  }

  function clickHandle({label, dataKey, index}) {
    if (index !== undefined) {
      const updatedMenuItems = {...menuItems};
      updatedMenuItems[dataKey].items.forEach((item, idx) => {
        item.isSelected = idx === index;
      });
  
      setMenuItems(updatedMenuItems);
    }

    updateApiData(dataKey, label);
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
