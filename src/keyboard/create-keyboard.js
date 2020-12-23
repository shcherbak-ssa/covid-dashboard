import { keyboardLayout } from '../data/keyboard-layout';

export function createKeyboard() {
  const keyboard = document.createElement("div");
  const keysContainer = document.createElement("div");

  keysContainer.classList.add("keyboard__keys");
  keysContainer.append(...createKeys());

  keyboard.classList.add("keyboard", "keyboard--hidden");
  keyboard.append(keysContainer);

  return keyboard;
}

function createKeys() {
  const keys = [];
  const keyLayout = keyboardLayout;
  const keyLayoutTemplate = [
    'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
    'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight',
    'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash',
    'ShiftLeft', 'IntlBackslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash',
    'Space', 'ArrowLeft', 'ArrowRight',
  ];

  keyLayoutTemplate.forEach((keyCode) => {
    const keyData = getKeyData(keyCode, keyLayout);
    const keyElement = document.createElement('button');
    const insertLineBreak = /^(Backspace|BracketRight|Backslash|Slash)$/.test(keyCode);

    keyElement.setAttribute('type', 'button');
    keyElement.setAttribute('data-key', keyData.small);
    keyElement.setAttribute('data-shift', keyData.shift);
    keyElement.setAttribute('data-code', keyData.code);
    
    addKeyElementContent(keyElement, keyData);
    addKeyElementClassnames(keyElement, keyData);
    keys.push(keyElement);

    if (insertLineBreak) {
      keys.push(document.createElement("br"));
    }
  });

  return keys;
}

function getKeyData(code, layout) {
  return layout.find((item) => item.code === code);
}

function addKeyElementContent(keyElement, keyData) {
  if (keyData.icon) {
    const icon = createIconHTML(keyData.icon);
    keyElement.innerHTML = icon;
  } else {
    keyElement.innerHTML = keyData.small;
  }

  function createIconHTML(iconName) {
    return `<i class="material-icons">${iconName}</i>`;
  }
}

function addKeyElementClassnames(keyElement, keyData) {
  keyElement.classList.add('keyboard__key');

  if (keyData.classname) {
    keyElement.classList.add(...keyData.classname);
  }
}