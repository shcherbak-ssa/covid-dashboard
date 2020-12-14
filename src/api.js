import lodash from 'lodash';
import { calculatePerPopulation } from './tools';
import {
  TOTAL_TYPE_OPTION,
  LAST_DAY_TYPE_OPTION,
  MEASUREMENT_OPTION,
} from './constants';

export async function loadData() {
  const allApiData = await request('all');
  const countriesApiData = await request('countries');
  const transfortedCountries = transformForCountries(countriesApiData);

  return {
    global: getTotal(allApiData),
    country: transfromForCountrySection(allApiData),
    countries: lodash.cloneDeep(transfortedCountries),
    map: lodash.cloneDeep(transfortedCountries),
    chart: lodash.cloneDeep(transfortedCountries),
  };
}

async function request(type) {
  const response = await fetch(`https://disease.sh/v3/covid-19/${type}`, {
    method: 'GET',
    headers: {},
  });

  return await response.json();
}

function transformForCountries(countriesApiData) {
  return countriesApiData.map(transformForCountry);
}

function transformForCountry(countryApiData) {
  return {
    countryName: countryApiData.country,
    countryFlag: countryApiData.countryInfo.flag,
    [TOTAL_TYPE_OPTION]: getTotal(countryApiData),
    [LAST_DAY_TYPE_OPTION]: getLastDay(countryApiData),
    [TOTAL_TYPE_OPTION + MEASUREMENT_OPTION]: getTotalCalculatedPer100K(countryApiData),
    [LAST_DAY_TYPE_OPTION + MEASUREMENT_OPTION]: getLastDayCalculatedPer100K(countryApiData),
  }
}

function transfromForCountrySection(allApiData) {
  return {
    default: {
      [TOTAL_TYPE_OPTION]: getTotal(allApiData),
      [LAST_DAY_TYPE_OPTION]: getLastDay(allApiData),
      [TOTAL_TYPE_OPTION + MEASUREMENT_OPTION]: getTotalCalculatedPer100K(allApiData),
      [LAST_DAY_TYPE_OPTION + MEASUREMENT_OPTION]: getLastDayCalculatedPer100K(allApiData),
    },
    country: null,
  };
}

function getTotal(apiData) {
  const {cases, deaths, recovered} = apiData;
  return {cases, deaths, recovered};
}

function getLastDay(apiData) {
  const {todayCases, todayDeaths, todayRecovered} = apiData;

  return {
    cases: todayCases,
    deaths: todayDeaths,
    recovered: todayRecovered,
  };
}

function getTotalCalculatedPer100K(apiData) {
  const {cases, deaths, recovered, population} = apiData;

  return {
    cases: calculatePerPopulation(cases, population),
    deaths: calculatePerPopulation(deaths, population),
    recovered: calculatePerPopulation(recovered, population),
  };
}

function getLastDayCalculatedPer100K(apiData) {
  const {todayCases, todayDeaths, todayRecovered, population} = apiData;

  return {
    cases: calculatePerPopulation(todayCases, population),
    deaths: calculatePerPopulation(todayDeaths, population),
    recovered: calculatePerPopulation(todayRecovered, population),
  };
}
