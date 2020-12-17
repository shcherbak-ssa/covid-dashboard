export function getIconUrl(icon, isDarkTheme) {
  return isDarkTheme ? `./assets/${icon}-dark.svg` : `./assets/${icon}.svg`;
}
