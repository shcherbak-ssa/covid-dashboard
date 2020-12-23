import React from 'react';
import Base from '../base';
import './countries-section.scss';
import { clickListItem } from './countries-settings';

export default function CountriesSectionContentItem(
  data, item, selectCountry, key, type, api, fn, value
) {
  const clickListHandler = () => clickListItem(item, selectCountry, api, fn, value);

  return (
    <div className="countries-section-content-container-item"
      onClick={clickListHandler}
      key={data.indexOf(item)}>
      <div className="countries-section-content-container-item-flag">
        <img src={item.countryFlag} alt={item.countryName} />
      </div>
      <div className="countries-section-content-container-item-name">{item.countryName}</div>
      <Base.NumberView
        type={type}
        number={item[key][type]} />
    </div>
  );
}
