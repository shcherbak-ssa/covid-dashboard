export function getSearchData(options) {
  const {type = '', parameter = '', measurement = ''} = options;

  return {
    key: type + measurement, // total, last day, total / 100k, last day / 100k
    parameter, // cases, deaths, recovered
  };
}
