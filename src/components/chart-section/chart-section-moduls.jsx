import {
  FILL_MAX_CASES_COLOR,
  FILL_MAX_DEATH_COLOR,
  FILL_MAX_RECOVERED_COLOR
} from './../../constants';

function getDataValue(searchData, countryData, apiData) {
  let obj = {};
  if (searchData.key) {
    if (countryData.Total) {
      if (searchData.key === 'Last day') {
        obj = countryData.Total[searchData.parameter];
      } else if (searchData.key === 'Last day100k') {
        obj = countryData.Total100k[searchData.parameter];
      } else {
        obj = countryData[searchData.key][searchData.parameter];
      }
    } else if (searchData.key === 'Last day') {
      obj = apiData.global.Total[searchData.parameter];
    } else if (searchData.key === 'Last day100k') {
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
    if (searchData.key === 'Last day' || searchData.key === 'Last day100k') {
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
  if (options.parameter === 'deaths') {
    return FILL_MAX_DEATH_COLOR;
  }
  if (options.parameter === 'cases') {
    return FILL_MAX_CASES_COLOR;
  }
  return FILL_MAX_RECOVERED_COLOR;
}

export { getDataValue, getRuleColor };
