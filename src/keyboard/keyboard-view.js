import {
  KEYBOARD_HIDDEN_CLASSNAME,
  ACTIVE_KEY_CLASSNAME,
  KEYBOARD_DOCUMENT_ID,
} from './constants';
import { createKeyboard } from './create-keyboard';

export default class KeyboardView {
  constructor(keyboard, properties) {
    this.properties = properties;
    this.keyboard = keyboard;
    this.keyElements = keyboard.querySelectorAll('.keyboard__key');
    this.capsLockKeyElement = keyboard.querySelector('[data-key="CapsLock"]');
    this.shiftKeyElement = keyboard.querySelector('[data-key="Shift"]');
    this.soundKeyElement = keyboard.querySelector('[data-code="Sound"]');
    this.voiceKeyElement = keyboard.querySelector('[data-code="Voice"]');
  }

  static init(properties) {
    const keyboard = createKeyboard();
    document.getElementById(KEYBOARD_DOCUMENT_ID).append(keyboard);

    return new KeyboardView(keyboard, properties);
  }

  getKeysElements() {
    return this.keyElements;
  }

  show() {
    this.keyboard.classList.remove(KEYBOARD_HIDDEN_CLASSNAME);
  }

  hide() {
    this.keyboard.classList.add(KEYBOARD_HIDDEN_CLASSNAME);
  }
  
  toggleSoundView() {
    this.toggleActiveView(this.soundKeyElement);
  }

  toggleVoiceView() {
    this.toggleActiveView(this.voiceKeyElement);
  }

  toggleCapsLockView() {
    this.toggleActiveView(this.capsLockKeyElement);
    this.keyElements.forEach((keyElement) => {
      if (!this.isLetterKey(keyElement)) return;
      this.toggleKeyElementView(keyElement);
    });
  }

  toggleShiftView() {
    this.toggleActiveView(this.shiftKeyElement);
    this.keyElements.forEach((keyElement) => {
      if (this.shiftIsNull(keyElement)) return;
      this.toggleKeyElementView(keyElement);
    });
  }

  toggleActiveView(element) {
    element.classList.toggle(ACTIVE_KEY_CLASSNAME);
  }

  isLetterKey(keyElement) {
    const { code } = keyElement.dataset;
    return /^Key/.test(code);
  }

  shiftIsNull(keyElement) {
    return keyElement.dataset.shift === 'null';
  }

  toggleKeyElementView(keyElement) {
    const { key, shift } = keyElement.dataset;
    keyElement.setAttribute('data-key', shift);
    keyElement.setAttribute('data-shift', key);
    keyElement.innerHTML = shift;
  }
}
