import React, { useEffect, useRef, useState } from 'react';
import './countries-section.scss';

import { getSearchData } from '../../tools';
import Base from '../base';
import Section from '../section';
import { createKeyboard } from '../../keyboard/keyboard';
import { searchFilter } from './countries-settings';
import InputForCountriesSection from './countries-section-input';
import CountriesSectionContentItem from './countries-section-item';
import SelectedCountry from './countries-section-select';

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
    searchFilter(newValue.toLowerCase(), inputProps);
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
