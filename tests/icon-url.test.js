import { getIconUrl } from '../src/tools';

const icon = 'icon';

describe('Icon url', () => {
  it('Is light theme', () => {
    const isDarkTheme = false;
    const expectIconUrl = `./assets/${icon}.svg`;

    const iconUrl = getIconUrl(icon, isDarkTheme);
    expect(iconUrl).toBe(expectIconUrl);
  });

  it('Is dark theme', () => {
    const isDarkTheme = true;
    const expectIconUrl = `./assets/${icon}-dark.svg`;

    const iconUrl = getIconUrl(icon, isDarkTheme);
    expect(iconUrl).toBe(expectIconUrl);
  });
});
