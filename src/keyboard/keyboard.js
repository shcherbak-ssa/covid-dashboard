import Properties from './properties';
import KeyboardView from './keyboard-view';
import KeysEvents from './keys-events';

export function createKeyboard(countryInput, updateCountryInputValue) {
  const properties = Properties.init(countryInput, updateCountryInputValue);
  const keyboardView = KeyboardView.init(properties);
  KeysEvents.init(properties, keyboardView);

  return keyboardView;
}
