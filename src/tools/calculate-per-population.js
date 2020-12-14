import { POPULATION_100K } from '../constants';

export function calculatePerPopulation(value, population) {
  const calculatedValue = (value * POPULATION_100K) / population;
  return Math.round(calculatedValue);
}
