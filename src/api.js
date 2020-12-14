import lodash from 'lodash';
import { calculatePerPopulation } from './tools';
import {
  TOTAL_TYPE_OPTION,
  LAST_DAY_TYPE_OPTION,
  MEASUREMENT_OPTION,
} from './constants';

export async function loadData() {
  const global = await request('all');
  const countries = await request('countries');
  const historicalGlobal = await request('historical/all');
  const historicalCountries = await request('historical');
  const transfortedCountries = transformForCountries(countries, historicalCountries);

  return {
    global: getTotal(global),
    country: transfromForCountrySection(global),
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
function transformForCountries(countries, historicalCountries) {
  return countries
    .map((country) => {
      const countryHistorical = historicalCountries.find((historicalCountry) => {
        if (historicalCountry.country === country.country) return true;
        else return false;
      });

      return countryHistorical ? transformForCountry(country, countryHistorical.timeline) : null;
    })
    .filter((country) => country !== null);
}

function transformForCountry(country, countryHistorical) {
  return {
    countryName: country.country,
    countryFlag: country.countryInfo.flag,
    [TOTAL_TYPE_OPTION]: getTotal(country),
    [LAST_DAY_TYPE_OPTION]: getLastDay(country),
    [TOTAL_TYPE_OPTION + MEASUREMENT_OPTION]: getTotalCalculatedPer100K(country),
    [LAST_DAY_TYPE_OPTION + MEASUREMENT_OPTION]: getLastDayCalculatedPer100K(country),
    timeline: {
      [TOTAL_TYPE_OPTION]: countryHistorical,
      [TOTAL_TYPE_OPTION + MEASUREMENT_OPTION]: getTotalCalculatedPer100KTimeline(
        countryHistorical, country.population
      ),
    }
  }
}

function transfromForCountrySection(global) {
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
