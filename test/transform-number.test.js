import { transformNumber } from '../src/tools';

describe('Number transformation', () => {
  it('Test for big numbers (> 1 000 000)', () => {
    const testNumbers = [77853691, 18474609, 10806829, 2906503, 1170743];
    const expectedNumbers = [
      '77 853 691', '18 474 609', '10 806 829', '2 906 503', '1 170 743'
    ];

    checkNumbers(testNumbers, expectedNumbers);
  });

  it('Test for medium numbers (> 1000 && < 1 000 000)', () => {
    const testNumbers = [753691, 184609, 16829, 2503, 1743];
    const expectedNumbers = ['753 691', '184 609', '16 829', '2 503', '1 743'];

    checkNumbers(testNumbers, expectedNumbers);
  });

  it('Test for small numbers (< 1000)', () => {
    const testNumbers = [691, 609, 829, 50, 43];
    const expectedNumbers = ['691', '609', '829', '50', '43'];

    checkNumbers(testNumbers, expectedNumbers);
  });
});

function checkNumbers(testNumbers, expectedNumbers) {
  testNumbers.forEach((testNumber, index) => {
    const transformedNumber = transformNumber(testNumber);
    const expectedNumber = expectedNumbers[index];

    expect(transformedNumber).toBe(expectedNumber);
  });
}
