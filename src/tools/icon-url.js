import { DARK_THEME } from '../constants';

export function getIconUrl(icon, currentTheme) {
  return currentTheme === DARK_THEME ? `./assets/${icon}-dark.svg` : `./assets/${icon}.svg`;
}
