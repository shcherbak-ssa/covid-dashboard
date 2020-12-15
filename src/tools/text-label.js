import {
  TOTAL_TYPE_OPTION,
  CASES_PARAMETER_OPTION,
} from '../constants';

export const textLabelDefaultState = {
  type: TOTAL_TYPE_OPTION,
  parameter: CASES_PARAMETER_OPTION,
  measurement: '',
};

export function updateTextLabel(key, label, textLabel, setTextLabel) {
  const updatedTextLabel = {...textLabel};
  updatedTextLabel[key] = label;

  setTextLabel(updatedTextLabel);
  return updatedTextLabel;
}

export function transformTextLabel(textLabel) {
  const {type, parameter, measurement} = textLabel;
  const measure = measurement ? ` / ${measurement}` : '';
  const param = parameter ? ` ${parameter}` : '';
  return type + param + measure;
}
