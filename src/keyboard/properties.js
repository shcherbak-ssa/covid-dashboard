export default class Properties {
  constructor(countryInput, updateCountryInputValue) {
    this.capsLock = false;
    this.shift = false;
    this.countryInput = countryInput;
    this.updateCountryInputValue = updateCountryInputValue;
  }

  static init(countryInput, updateCountryInputValue) {
    return new Properties(countryInput, updateCountryInputValue);
  }

  addCharacter(character) {
    let { value, cursorPosition } = this.getOutputData();

    value.splice(cursorPosition, 0, character);
    cursorPosition += 1;
    
    this.updateCountryInput(value.join(''), cursorPosition);
  }

  deleteCharacter() {
    let { value, cursorPosition } = this.getOutputData();
    if (cursorPosition === 0) return this.countryInput.focus();
    
    value.splice(cursorPosition - 1, 1);
    cursorPosition -= 1;
    
    this.updateCountryInput(value.join(''), cursorPosition);
  }

  toggleCapsLock() {
    this.capsLock = !this.capsLock;
  }

  toggleShift() {
    this.shift = !this.shift;
  }

  moveCursorToLeft() {
    let cursorPosition = this.getCursorPosition();
    if (cursorPosition === 0) return this.countryInput.focus();

    cursorPosition -= 1;
    this.setCursorPosition(cursorPosition);
  }

  moveCursorToRight() {
    let { value, cursorPosition } = this.getOutputData();
    if (cursorPosition === value.length) return this.countryInput.focus();

    cursorPosition += 1;
    this.setCursorPosition(cursorPosition);
  }

  getOutputData() {
    const value = this.countryInput.value.split('');
    const cursorPosition = this.getCursorPosition();
    return { value, cursorPosition };
  }

  getCursorPosition() {
    return this.countryInput.selectionStart;
  }

  updateCountryInput(value, cursorPosition) {
    this.updateCountryInputValue(value);
    this.setCursorPosition(cursorPosition);
  }

  setCursorPosition(cursorPosition) {
    this.countryInput.setSelectionRange(cursorPosition, cursorPosition);
    this.countryInput.focus();
  }
}
