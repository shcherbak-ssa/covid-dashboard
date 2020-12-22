import React, { useState } from 'react';
import './countries-section.scss';

import { getSearchData } from '../../tools';
import Base from '../base';
import Section from '../section';

export default function CountriesSection(props) {
  const {
    isDarkTheme, options, updateOptions, optionMenuItems, selectedCountry, setSelectedCountry
  } = props;
  const content = {
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

function CountriesSectionContent(content) {
  const [inputValue, setInputValue] = useState('');
  const [allData, setAllData] = useState(content.apiData);
  const archiveData = content.apiData;
  const value = {
    inputValue: inputValue,
    setInputValue: setInputValue
  };
  const parametres = content.searchData;
  const selectCountry = content.selectCountry;
  const key = parametres.key;
  const type = parametres.parameter;

  return (
    <div className="countries-section-content">
      <div className="countries-section-content-search">
        <InputForCountriesSection
          value={value}
          data={allData}
          api={archiveData}
          fn={setAllData} />
      </div>
      <div className="countries-section-content-selected">
        <SelectedCountry
          country={content.selectedCountry}
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

const SelectedCountry = (country) => {
  let content;
  if (country.country) {
    const item = country.country;
    const key = country.data.key;
    const parameter = country.data.parameter;
    const discardCountry = country.fn;

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

function clickDiscardSelected(fn) {
  fn(null);
}

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

function clickListItem(data, selectCountry, api, fn, value) {
  fn(api);
  value.setInputValue('');
  return selectCountry(data);
}

function InputForCountriesSection(content) {
  const onChangeHandler = (event) => {
    event.preventDefault();
    const value = event.target.value.toLowerCase();

    let filter = [];
    content.value.setInputValue(event.target.value);
    if (value.length > content.value.inputValue.length) {
      filter = content.data.filter((country) => country.countryName.toLowerCase().includes(value));
    } else {
      filter = content.api.filter((country) => country.countryName.toLowerCase().includes(value));
    }
    return content.fn(filter);
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
        className="search-field-input"
        type="text"
        value={content.value.inputValue}
        placeholder="Search"
        onClick={onInputCliCKHandler}
        onChange={onChangeHandler} />
    </form>
  );
}
