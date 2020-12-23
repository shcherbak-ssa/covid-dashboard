function clickDiscardSelected(fn) {
  fn(null);
}

function clickListItem(data, selectCountry, api, fn, value) {
  fn(api);
  value.setInputValue('');
  return selectCountry(data);
}

function searchFilter(value, props) {
  let filter = [];
  if (value.length > props.value.inputValue.length) {
    filter = props.data.filter((country) => country.countryName.toLowerCase().includes(value));
  } else {
    filter = props.api.filter((country) => country.countryName.toLowerCase().includes(value));
  }
  props.fn(filter);
}

export { clickDiscardSelected, clickListItem, searchFilter };
