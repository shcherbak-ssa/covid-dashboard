import React from 'react';
import Base from '../base';
import './countries-section.scss';
import { clickDiscardSelected } from './countries-settings';

export default function SelectedCountry(props) {
  let content;
  if (props.country) {
    const item = props.country;
    const key = props.data.key;
    const parameter = props.data.parameter;
    const discardCountry = props.fn;

    const clickDiscardHandler = () => clickDiscardSelected(discardCountry);

    content = (
      <div className="selected-country">
        <div className="selected-country-title">
          <div className="selected-country-title-name">Selected</div>
          <div className="selected-country-title-discard"
            onClick={clickDiscardHandler}></div>
        </div>
        <div className="selected-country-item">
          <div className="selected-country-item-flag">
            <img src={item.countryFlag} alt={item.countryName} />
          </div>
          <div className="selected-country-content-item-name">{item.countryName}</div>
          <Base.NumberView
            type={parameter}
            number={item[key][parameter]} />
        </div>
      </div>
    );
  } else {
    content = '';
  }
  return content;
}
