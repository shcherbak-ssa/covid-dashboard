import { getSearchData } from '../src/tools';

const TYPE_TEST_FIELD = 'type';
const PARAMETER_TEST_FIELD = 'parameter';
const MEASUREMENT_TEST_FIELD = 'measurement';

describe('Search data from options', () => {
  it('Only type field', () => {
    const testOptions = {
      type: TYPE_TEST_FIELD,
    };
    const expectedSearchData = {
      key: testOptions.type
    };

    const searchData = getSearchData(testOptions);
    expect(searchData).toMatchObject(expectedSearchData);
  });

  it('Type and parameter fields', () => {
    const testOptions = {
      type: TYPE_TEST_FIELD,
      parameter: PARAMETER_TEST_FIELD,
    };
    const expectedSearchData = {
      key: testOptions.type,
      parameter: testOptions.parameter,
    };

    const searchData = getSearchData(testOptions);
    expect(searchData).toMatchObject(expectedSearchData);
  });

  it('Type and measurement fields', () => {
    const testOptions = {
      type: TYPE_TEST_FIELD,
      measurement: MEASUREMENT_TEST_FIELD,
    };
    const expectedSearchData = {
      key: testOptions.type + testOptions.measurement
    };

    const searchData = getSearchData(testOptions);
    expect(searchData).toMatchObject(expectedSearchData);
  });

  it('All fields', () => {
    const testOptions = {
      type: TYPE_TEST_FIELD,
      parameter: PARAMETER_TEST_FIELD,
      measurement: MEASUREMENT_TEST_FIELD,
    };
    const expectedSearchData = {
      key: testOptions.type + testOptions.measurement,
      parameter: testOptions.parameter
    };

    const searchData = getSearchData(testOptions);
    expect(searchData).toMatchObject(expectedSearchData);
  });
});
