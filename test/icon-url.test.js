import { getIconUrl } from '../src/tools';

const icon = 'icon';

describe('Icon url', () => {
  it('Is light theme', () => {
    const isDarkTheme = false;
    const expectedIconUrl = `./assets/${icon}.svg`;

    const iconUrl = getIconUrl(icon, isDarkTheme);
    expect(iconUrl).toBe(expectedIconUrl);
  });

  it('Is dark theme', () => {
    const isDarkTheme = true;
    const expectedIconUrl = `./assets/${icon}-dark.svg`;

    const iconUrl = getIconUrl(icon, isDarkTheme);
    expect(iconUrl).toBe(expectedIconUrl);
  });
});
