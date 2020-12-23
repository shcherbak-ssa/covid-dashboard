import {
  FILL_MAX_CASES_COLOR,
  FILL_MAX_DEATH_COLOR,
  FILL_MAX_RECOVERED_COLOR,
  LAST_DAY_TYPE_OPTION,
  LAST_DAY_MEASUREMENT_OPTION,
  CASES_PARAMETER_OPTION,
  DEATHS_PARAMETER_OPTION
} from './../../constants';

function getDataValue(searchData, countryData, apiData) {
  let obj = {};
  if (searchData.key) {
    if (countryData.Total) {
      if (searchData.key === LAST_DAY_TYPE_OPTION) {
        obj = countryData.Total[searchData.parameter];
      } else if (searchData.key === LAST_DAY_MEASUREMENT_OPTION) {
        obj = countryData.Total100k[searchData.parameter];
      } else {
        obj = countryData[searchData.key][searchData.parameter];
      }
    } else if (searchData.key === LAST_DAY_TYPE_OPTION) {
      obj = apiData.global.Total[searchData.parameter];
    } else if (searchData.key === LAST_DAY_MEASUREMENT_OPTION) {
      obj = apiData.global.Total100k[searchData.parameter];
    } else {
      obj = apiData.global[searchData.key][searchData.parameter];
    }
  } else {
    obj = apiData.global.Total.cases;
  }
  return convertDataValue(obj, searchData);
}
function convertDataValue(obj, searchData) {
  const newData = [];
  let startValue = 0;
  Object.keys(obj).forEach(key => {
    const newDate = {};
    let correctDate = key.split('/');
    if (correctDate[0].length === 1) correctDate[0] = 0 + correctDate[0];
    if (correctDate[1].length === 1) correctDate[1] = 0 + correctDate[1];
    [correctDate[0], correctDate[1]] = [correctDate[1], correctDate[0]];

    newDate.data = correctDate.join('.') + '20';
    if (searchData.key === LAST_DAY_TYPE_OPTION || searchData.key === LAST_DAY_MEASUREMENT_OPTION) {
      newDate.value = obj[key] - startValue < 0 ? 0 : obj[key] - startValue;
      startValue = obj[key];
    } else {
      newDate.value = obj[key];
    }
    newData.push(newDate);
  });
  return newData;
}
function getRuleColor(options) {
  if (options.parameter === DEATHS_PARAMETER_OPTION) {
    return FILL_MAX_DEATH_COLOR;
  }
  if (options.parameter === CASES_PARAMETER_OPTION) {
    return FILL_MAX_CASES_COLOR;
  }
  return FILL_MAX_RECOVERED_COLOR;
}

export { getDataValue, getRuleColor };
