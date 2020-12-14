export function transfromForGlobal(apiGlobalData) {
  return {
    cases: apiGlobalData.cases,
    deaths: apiGlobalData.deaths,
    recovered: apiGlobalData.recovered,
  };
}
