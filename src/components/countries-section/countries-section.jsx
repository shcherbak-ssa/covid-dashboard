import React, { useState } from 'react';
import './countries-section.scss';

import { textLabelDefaultState, updateTextLabel, getSearchData } from '../../tools';
import Section from '../section';

export default function CountriesSection(props) {
  const {currentTheme, openFullscreen, /* setSelectedCountry */ } = props;
  const [textLabel, setTextLabel] = useState(textLabelDefaultState);
  const [searchData, setSearchData] = useState(getSearchData(textLabel));
  const [apiData, /* setApiData */] = useState(props.apiData);
  // console.log(apiData, searchData);
  const content = {
    apiData: apiData,
    searchData: searchData
  };

  const sectionProps = {
    sectionType: 'countries',
    headerProps: {
      title: 'Countries',
      currentTheme,
      textLabel,
      updateApiData: (key, label) => {
        const updatedTextLabel = updateTextLabel(key, label, textLabel, setTextLabel);
        setSearchData(getSearchData(updatedTextLabel));
      }
    },
    openFullscreen: () => {
      openFullscreen({
        currentFullscreenTitle: 'Countries',
        currentFullscreenContent: CountriesSectionFullscreenContent(),
      });
    }
  };

  return ( // 
    //{/* your code */}
    <Section {...sectionProps}>
      <CountriesSectionContent {...content} />
    </Section>
  );
}

// взято из раздела таблицы
function CountriesSectionContent(content) {
  const data = content.apiData;
  const parametres = content.searchData;
  console.log(data, parametres);
  const myData = [];
  data.forEach((datum) => {
    const name = datum.countryName;
    const flag = datum.countryFlag;
    const key = datum[parametres.key];
    const parameter = key[parametres.parameter];
    const obj = {
      name: name,
      flag: flag,
      parameter: parameter
    };
    myData.push(obj);
  });

  return (
    <div className="countries-section-content">
      {myData.sort((a, b) => a.parameter > b.parameter ? -1 : 1)
        .map((item) => {
          // console.log(item);
          return CountriesSectionContentItem(item);
        })}
    </div>
  ); 
}

const CountriesSectionContentItem = (item) => {
  const inside = (
    <div className="countries-section-content-item" key={item.parameter}>
      <div className="countries-section-content-flag"><img src={item.flag} alt={item.name} /></div>
      <div className="countries-section-content-name">{item.name}</div>
      <div className="countries-section-content-parameter">{item.parameter}</div>
    </div>
  );
  console.log(inside);
  return inside;
} 


function CountriesSectionFullscreenContent() {
  return (
    <div className="countries-section-fullscreen-content">
      {/* your code */}
    </div>
  );
}
