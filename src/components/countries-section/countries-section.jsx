import React, { useEffect, useRef, useState } from 'react';
import './countries-section.scss';

import { getSearchData } from '../../tools';
import Base from '../base';
import Section from '../section';
import { createKeyboard } from '../../keyboard/keyboard';
import { clickDiscardSelected, clickListItem, searchFilter } from './countries-settings';

export default function CountriesSection(props) {
  const {
    isDarkTheme, options, updateOptions, optionMenuItems, selectedCountry, setSelectedCountry
  } = props;
  const content = {
    isDarkTheme,
    apiData: props.apiData,
    searchData: getSearchData(options),
    selectedCountry: selectedCountry,
    selectCountry: setSelectedCountry
  };
  const sectionProps = {
    sectionType: 'countries',
    headerProps: {
      title: 'Countries',
      isDarkTheme,
      options
    },
    updateOptions,
    optionMenuItems
  };

  return (
    <Section {...sectionProps}>
      <CountriesSectionContent {...content} />
    </Section>
  );
}

function CountriesSectionContent(props) {
  const [inputValue, setInputValue] = useState('');
  const [allData, setAllData] = useState(props.apiData);
  const archiveData = props.apiData;
  const value = {
    inputValue: inputValue,
    setInputValue: setInputValue
  };
  const parametres = props.searchData;
  const selectCountry = props.selectCountry;
  const key = parametres.key;
  const type = parametres.parameter;

  const countryInput = useRef(null);
  const [keyboard, setKeyboard] = useState(null);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const keyboardIconProps = {
    icon: 'keyboard',
    isDarkTheme: props.isDarkTheme,
    isActionIcon: false,
    iconClickHandle: () => {
      const nextIsKeyboardOpen = !isKeyboardOpen;
      setIsKeyboardOpen(nextIsKeyboardOpen);

      if (nextIsKeyboardOpen) {
        countryInput.current.focus();
        keyboard.show();
      } else {
        keyboard.hide();
      }
    }
  };

  const inputProps = {
    refCountryInput: countryInput,
    value,
    data: allData,
    api: archiveData,
    fn: setAllData
  };

  useEffect(() => {
    const createdKeyboard = createKeyboard(countryInput.current, updateCountryInputValue);
    setKeyboard(createdKeyboard);
  }, []);

  function updateCountryInputValue(newValue) {
    setInputValue(newValue);
    searchFilter(inputValue.toLowerCase(), inputProps);
  }

  return (
    <div className="countries-section-content">
      <div className="countries-section-content-search">
        <InputForCountriesSection {...inputProps} />
        <div className="countries-section-keyboard">
          <Base.Icon {...keyboardIconProps} />
        </div>
      </div>
      <div className="countries-section-content-selected">
        <SelectedCountry
          country={props.selectedCountry}
          data={parametres}
          fn={selectCountry} />
      </div>
      <div className="countries-section-content-title">Countries</div>
      <div className="countries-section-content-container">
        {allData.sort((a, b) => a.countryName > b.countryName)
          .sort((a, b) => a[key][type] > b[key][type] ? -1 : 1)
          .map((item) => {
            let result;
            if (allData.length > 0) {
              result = CountriesSectionContentItem(
                allData, item, selectCountry,
                key, type, archiveData, setAllData, value
              );
            } else {
              result = (<p></p>);
            }
            return result;
          })}
      </div>
    </div>
  );
}

const SelectedCountry = (props) => {
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
};

const CountriesSectionContentItem = (data, item, selectCountry, key, type, api, fn, value) => {
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
};

function InputForCountriesSection(content) {
  const onChangeHandler = (event) => {
    event.preventDefault();

    content.value.setInputValue(event.target.value);

    const value = event.target.value.toLowerCase();
    searchFilter(value, content);
  };

  const onInputCliCKHandler = (event) => {
    event.preventDefault();
    if (event.target.value !== '') {
      content.value.setInputValue('');
      content.fn(content.api);
    }
  };

  return (
    <form className="search-field">
      <input
        ref={content.refCountryInput}
        className="search-field-input"
        type="text"
        value={content.value.inputValue}
        placeholder="Search"
        onClick={onInputCliCKHandler}
        onChange={onChangeHandler} />
    </form>
  );
}
