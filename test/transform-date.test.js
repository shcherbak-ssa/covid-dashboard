import { transformDate } from '../src/tools';

describe('Api date transformation', () => {
  it('Test for 21.12.2020', () => {
    const date = new Date(2020, 11, 21);
    const expectedDate = '21 December 2020, Monday';

    const transformedDate = transformDate(date);
    expect(transformedDate).toBe(expectedDate);
  });

  it('Test for 24.12.2020', () => {
    const date = new Date(2020, 11, 24);
    const expectedDate = '24 December 2020, Thursday';

    const transformedDate = transformDate(date);
    expect(transformedDate).toBe(expectedDate);
  });

  it('Test for New Your', () => {
    const date = new Date(2021, 0, 1);
    const expectedDate = '1 January 2021, Friday';

    const transformedDate = transformDate(date);
    expect(transformedDate).toBe(expectedDate);
  });
});
