import React, { useState } from 'react';
import './countries-section.scss';

import { getSearchData } from '../../tools';
import Base from '../base';
import Section from '../section';

export default function CountriesSection(props) {
  const { isDarkTheme, options, updateOptions, optionMenuItems /* setSelectedCountry */ } = props;
  // const [searchData] = useState(getSearchData(options));
  const [apiData, /* setApiData */] = useState(props.apiData);
  // console.log(apiData, searchData);
  const content = {
    apiData: apiData,
    searchData: getSearchData(options)
  };

  const sectionProps = {
    sectionType: 'countries',
    headerProps: {
      title: 'Countries',
      isDarkTheme,
      options
    },
    updateOptions, 
    optionMenuItems,
  };

  return (// {/* your code */}
    <Section {...sectionProps}>
      <CountriesSectionContent {...content} />
    </Section>
  );
}

function CountriesSectionContent(content) {
  const data = content.apiData;
  const parametres = content.searchData;
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
      {myData.sort((a, b) => a.name > b.name)
        .sort((a, b) => a.parameter > b.parameter ? -1 : 1)
        .map((item) => {
          // console.log(item);
          return CountriesSectionContentItem(item);
        })}
    </div>
  );
}
// <Base.NumberView type={type} number={number} />
// <div className="countries-section-content-parameter">{item.parameter}</div>
const CountriesSectionContentItem = (item) => {
  const inside = (
    <div className="countries-section-content-item" onClick={() => { clickListItem(item.name); }} key={item.id}>
      <div className="countries-section-content-flag"><img src={item.flag} alt={item.name} /></div>
      <div className="countries-section-content-name">{item.name}</div>
      <Base.NumberView type={item.type} number={item.parameter} />
    </div>
  );
  return inside;
};

function clickListItem(name) {
  console.log(`you click on ${name}`);
}
