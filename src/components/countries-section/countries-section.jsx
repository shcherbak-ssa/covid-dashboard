import React, { useState } from 'react';
import './countries-section.scss';

import { getSearchData } from '../../tools';
import Base from '../base';
import Section from '../section';

export default function CountriesSection(props) {
  const {
    isDarkTheme, options, updateOptions, optionMenuItems, setSelectedCountry
  } = props;
  const [apiData /* setApiData */] = useState(props.apiData);
  const content = {
    apiData: apiData,
    searchData: getSearchData(options),
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
  const value = {
    inputValue: inputValue,
    setInputValue: setInputValue
  };

  const data = content.apiData;
  const parametres = content.searchData;
  const selectCountry = content.selectCountry;
  // console.log(data, parametres);
  const myData = [];
  data.forEach((datum) => {
    const name = datum.countryName;
    const flag = datum.countryFlag;
    const key = datum[parametres.key];
    const parameter = key[parametres.parameter];
    const id = myData.length;
    const obj = {
      id: id,
      datum: datum,
      name: name,
      flag: flag,
      parameter: parameter,
      type: parametres.parameter
    };
    myData.push(obj);
  });
  // console.log(myData);

  return (
    <div className="countries-section-content">
      <div className="countries-section-content-search">
        <InputForCountriesSection {...value} />
      </div>
      <div className="countries-section-content-container">
        {myData.sort((a, b) => a.name > b.name)
          .sort((a, b) => a.parameter > b.parameter ? -1 : 1)
          .map((item) => {
            // console.log(item);
            return CountriesSectionContentItem(item, selectCountry);
          })}
      </div>
    </div>
  );
}

const CountriesSectionContentItem = (item, selectCountry) => {
  // console.log(selectCountry);
  return (
    <div className="countries-section-content-container-item" onClick={() => { clickListItem(item.datum, selectCountry); }} key={item.id}>
      <div className="countries-section-content-container-item-flag"><img src={item.flag} alt={item.name} /></div>
      <div className="countries-section-content-container-item-name">{item.name}</div>
      <Base.NumberView type={item.type} number={item.parameter} />
    </div>
  );
};

function clickListItem(name, selectCountry) {
  console.log(`you click on ${name}`);
  return selectCountry(name);
}

// какая-то полная хрень, еще и блюр после каждой введенной буквы
function InputForCountriesSection(value) {
  const onChangeHandler = (event) => {
    // event.preventDefault();
    value.setInputValue(event.target.value);
    console.log(event.target.value);
  };

  const input = value.inputValue;
  return (
      <input
        className="search-field-input"
        type="text"
        value={input}
        placeholder="Global"
        onChange={onChangeHandler} />
  );
}
