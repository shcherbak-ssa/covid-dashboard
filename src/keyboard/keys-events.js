import {
  BACKSPACE_KEY,
  CAPS_LOCK_KEY,
  SPACE_KEY,
  DONE_KEY,
  SHIFT_KEY,
  ARROW_LEFT_KEY,
  ARROW_RIGHT_KEY,
  SPACE_CHARACTER,
} from './constants';

export default class KeysEvents {
  constructor(properties, keyboardView) {
    this.keyElements = keyboardView.getKeysElements();
    this.properties = properties;
    this.keyboardView = keyboardView;
  }

  static active = null;

  static init(properties, keyboardView, voiceRecording) {
    KeysEvents.active = new KeysEvents(properties, keyboardView, voiceRecording);
    KeysEvents.active.initEvents();
  }

  initEvents() {
    this.keyElements.forEach((keyElement) => {
      const listener = this.getEventListener(keyElement);
      keyElement.addEventListener('click', (e) => {
        listener.call(this, e);
      });
    });
  }

  getEventListener(keyElement) {
    switch (keyElement.dataset.code) {
      case BACKSPACE_KEY:
        return this.backspaceListener;
      case CAPS_LOCK_KEY:
        return this.capsListener;
      case SPACE_KEY:
        return this.spaceListener;
      case DONE_KEY:
        return this.doneListener;
      case SHIFT_KEY:
        return this.shiftListener;
      case ARROW_LEFT_KEY:
        return this.moveCursorToLeft;
      case ARROW_RIGHT_KEY:
        return this.moveCursorToRight;
      default:
        return this.keyListener;
    }
  }

  backspaceListener() {
    this.properties.deleteCharacter();
    this.removeShiftIfIsActive();
  }

  capsListener() {
    this.properties.toggleCapsLock();
    this.keyboardView.toggleCapsLockView();
  }

  spaceListener() {
    this.properties.addCharacter(SPACE_CHARACTER);
    this.removeShiftIfIsActive();
  }

  doneListener() {
    this.keyboardView.hide();
  }

  shiftListener() {
    this.properties.toggleShift();
    this.keyboardView.toggleShiftView();
  }

  keyListener(e) {
    this.properties.addCharacter(e.target.dataset.key);
    this.removeShiftIfIsActive();
  }

  moveCursorToLeft() {
    this.properties.moveCursorToLeft();
  }

  moveCursorToRight() {
    this.properties.moveCursorToRight();
  }

  removeShiftIfIsActive() {
    if (this.properties.shift) this.shiftListener();
  }
}
