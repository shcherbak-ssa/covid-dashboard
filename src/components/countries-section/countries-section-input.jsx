import React from 'react';
import './countries-section.scss';
import { searchFilter } from './countries-settings';

export default function InputForCountriesSection(content) {
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
    <div className="search-field">
      <input
        ref={content.refCountryInput}
        className="search-field-input"
        type="text"
        value={content.value.inputValue}
        placeholder="Search"
        onClick={onInputCliCKHandler}
        onChange={onChangeHandler} />
    </div>
  );
}
