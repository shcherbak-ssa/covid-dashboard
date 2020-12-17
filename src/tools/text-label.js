export function transformTextLabel(textLabel) {
  const {type, parameter, measurement} = textLabel;
  const measure = measurement ? ` / ${measurement}` : '';
  const param = parameter ? ` ${parameter}` : '';
  return type + param + measure;
}
