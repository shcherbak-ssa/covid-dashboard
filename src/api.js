import lodash from 'lodash';
import { calculatePerPopulation } from './tools';
import {
  TOTAL_TYPE_OPTION,
  LAST_DAY_TYPE_OPTION,
  MEASUREMENT_OPTION,
} from './constants';

const countriesToRemove = [
  'Diamond Princess',
  'MS Zaandam',
];

export async function loadData() {
  const global = await request('all');
  const countries = await request('countries');
  const historicalGlobal = await request('historical/all?lastdays=all');
  const transfortedCountries = transformForCountries(countries);

  return {
    global: getTotal(global),
    table: transfromForTable(global),
    countries: lodash.cloneDeep(transfortedCountries),
    map: lodash.cloneDeep(transfortedCountries),
    chart: transfromForChart(historicalGlobal, global.population),
  };
}

async function request(type) {
  const response = await fetch(`https://disease.sh/v3/covid-19/${type}`, {
    method: 'GET',
    headers: {},
  });

  return await response.json();
}

/* transform functions */
function transformForCountries(countries) {
  return countries
    .map(transformForCountry)
    .filter(filterCountries);
}

function transformForCountry(country) {
  return {
    countryName: country.country,
    countryFlag: country.countryInfo.flag,
    iso2Id: country.countryInfo.iso2,
    [TOTAL_TYPE_OPTION]: getTotal(country),
    [LAST_DAY_TYPE_OPTION]: getLastDay(country),
    [TOTAL_TYPE_OPTION + MEASUREMENT_OPTION]: getTotalCalculatedPer100K(country),
    [LAST_DAY_TYPE_OPTION + MEASUREMENT_OPTION]: getLastDayCalculatedPer100K(country),
  }
}

function filterCountries(country) {
  return !(country === null || countriesToRemove.includes(country.countryName));
}

function transfromForTable(global) {
  return {
    global: {
      [TOTAL_TYPE_OPTION]: getTotal(global),
      [LAST_DAY_TYPE_OPTION]: getLastDay(global),
      [TOTAL_TYPE_OPTION + MEASUREMENT_OPTION]: getTotalCalculatedPer100K(global),
      [LAST_DAY_TYPE_OPTION + MEASUREMENT_OPTION]: getLastDayCalculatedPer100K(global),
    },
    country: null,
  };
}

function transfromForChart(historicalGlobal, population) {
  return {
    global: {
      [TOTAL_TYPE_OPTION]: historicalGlobal,
      [TOTAL_TYPE_OPTION + MEASUREMENT_OPTION]: getTotalCalculatedPer100KTimeline(
        historicalGlobal, population
      ),
    },
    country: null,
  };
}

/* get functions */
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

function getTotalCalculatedPer100KTimeline(historical, population) {
  const transformedHistorical = Object.entries(historical).map(([value, timeline]) => {
    const transformedTimeline = Object.entries(timeline).map(([day, number]) => {
      return [day, calculatePerPopulation(number, population)];
    });

    return [value, Object.fromEntries(transformedTimeline)];
  });

  return Object.fromEntries(transformedHistorical);
}
