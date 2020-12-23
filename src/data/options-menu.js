import {
  MEASUREMENT_TITLE,
  TOTAL_TYPE_OPTION,
  LAST_DAY_TYPE_OPTION,
  CASES_PARAMETER_OPTION,
  DEATHS_PARAMETER_OPTION,
  RECOVERED_PARAMETER_OPTION,
  MEASUREMENT_OPTION,
} from '../constants';

export const optionsMenu = {
  type: {
    title: 'Type',
    items: [
      {
        isSelected: true,
        value: 'Total',
        label: TOTAL_TYPE_OPTION,
      },
      {
        isSelected: false,
        value: 'Last day',
        label: LAST_DAY_TYPE_OPTION,
      },
    ],
  },
  parameter: {
    title: 'Parameter',
    items: [
      {
        isSelected: true,
        value: 'Cases',
        label: CASES_PARAMETER_OPTION,
      },
      {
        isSelected: false,
        value: 'Deaths',
        label: DEATHS_PARAMETER_OPTION,
      },
      {
        isSelected: false,
        value: 'Recovered',
        label: RECOVERED_PARAMETER_OPTION,
      },
    ],
  },
  measurement: {
    title: MEASUREMENT_TITLE,
    items: [
      {
        isSelected: false,
        value: '100K population',
        label: MEASUREMENT_OPTION,
      },
    ],
  },
};
