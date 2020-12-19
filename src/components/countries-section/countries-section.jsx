import React, { useState } from 'react';
import './countries-section.scss';

import { getSearchData } from '../../tools';
import Base from '../base';
import Section from '../section';

export default function CountriesSection(props) {
  const {
    isDarkTheme, options, updateOptions, optionMenuItems, selectedCountry, setSelectedCountry
  } = props;
  const [apiData /* setApiData */] = useState(props.apiData);
  const content = {
    apiData: apiData,
    searchData: getSearchData(options),
    selectedCountry: selectedCountry,
    selectCountry: setSelectedCountry
  };
  // console.log(content);
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
  const [myData, setMyData] = useState([]);
  const [archiveData] = useState([]);
  const props = (dataArr) => {
    setMyData(dataArr);
  };
  const value = {
    inputValue: inputValue,
    setInputValue: setInputValue
  };
  const parametres = content.searchData;
  const selectCountry = content.selectCountry;
  console.log(myData.length);
  if (myData.length === 0) {
    const data = content.apiData;
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
      archiveData.push(obj);
    });
  } else {
    const data = myData;
    const keyForAll = parametres.key; // e g total
    const paramForAll = parametres.parameter; // e g cases-deaths-recovered
    data.forEach((datum) => {
      datum.parameter = datum.datum[keyForAll][paramForAll];
      datum.type = paramForAll;
    });
    // console.log(data);
  }
  // console.log(myData);

  return (
    <div className="countries-section-content">
      <div className="countries-section-content-search">
        <InputForCountriesSection value={value} data={myData} api={archiveData} fn={props} />
      </div>
      <div className="countries-section-content-selected">
        <SelectedCountry country={content.selectedCountry} data={parametres} fn={selectCountry} />
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

const SelectedCountry = (country) => {
  let content;
  console.log(country);
  if (country.country) {
    console.log(country.data);
    const item = country.country;
    const key = country.data.key;
    const parameter = country.data.parameter;
    const discardCountry = country.fn;
    content = (
      <div className="selected-country">
        <div className="selected-country-title">
          <div className="selected-country-title-name">Selected</div>
          <div className="selected-country-title-discard" onClick={() => {clickDiscardSelected(discardCountry)}}></div>
        </div>
        <div className="selected-country-item">
          <div className="selected-country-item-flag"><img src={item.countryFlag} alt={item.countryName} /></div>
          <div className="selected-country-content-item-name">{item.countryName}</div>
          <Base.NumberView type={parameter} number={item[key][parameter]} />
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

const CountriesSectionContentItem = (item, selectCountry) => {
  return (
    <div className="countries-section-content-container-item" onClick={() => { clickListItem(item.datum, selectCountry); }} key={item.id}>
      <div className="countries-section-content-container-item-flag"><img src={item.flag} alt={item.name} /></div>
      <div className="countries-section-content-container-item-name">{item.name}</div>
      <Base.NumberView type={item.type} number={item.parameter} />
    </div>
  );
};

function clickListItem(data, selectCountry) {
  return selectCountry(data);
}

function InputForCountriesSection(content) {
  const onChangeHandler = (event) => {
    event.preventDefault();
    // если набирать буквы, а потом убирать, то не возвращаются все страны из апи
    const value = event.target.value.toLowerCase();
    console.log('value:' + value);
    let filter = [];
    if (value.length > content.value.inputValue.length) {
      content.value.setInputValue(event.target.value);
      filter = content.data.filter((country) => country.name.toLowerCase().includes(value));
    } else {
      content.value.setInputValue(event.target.value);
      filter = content.api.filter((country) => country.name.toLowerCase().includes(value));
    }
    content.fn(filter);
    // console.log(filter);
  };

  const onInputCliCKHandler = (event) => {
    event.preventDefault();
    if (event.target.value !== '') {
      content.value.setInputValue('');
      content.fn([]);
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
