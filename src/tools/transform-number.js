export function transformNumber(number) {
  return `${number}`.split('').reverse().map(addSpaces).reverse().join('').trim();
}

function addSpaces(item, index) {
  return ((index + 1) % 3 === 0) ? ` ${item}` : item;
}