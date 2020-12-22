export function getSearchData(textLabel) {
  const {type = '', parameter = '', measurement = ''} = textLabel;

  return {
    key: type + measurement, // total, last day, total / 100k, last day / 100k
    parameter, // cases, deaths, recovered
  };
}
