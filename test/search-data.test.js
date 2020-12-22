import { getSearchData } from '../src/tools';

const TYPE_TEST_FIELD = 'type';
const PARAMETER_TEST_FIELD = 'parameter';
const MEASUREMENT_TEST_FIELD = 'measurement';

describe('Search data from text label', () => {
  it('Only type field', () => {
    const testTextLabel = {
      type: TYPE_TEST_FIELD,
    };
    const expectedSearchData = {
      key: testTextLabel.type
    };

    const searchData = getSearchData(testTextLabel);
    expect(searchData).toMatchObject(expectedSearchData);
  });

  it('Type and parameter fields', () => {
    const testTextLabel = {
      type: TYPE_TEST_FIELD,
      parameter: PARAMETER_TEST_FIELD,
    };
    const expectedSearchData = {
      key: testTextLabel.type,
      parameter: testTextLabel.parameter,
    };

    const searchData = getSearchData(testTextLabel);
    expect(searchData).toMatchObject(expectedSearchData);
  });

  it('Type and measurement fields', () => {
    const testTextLabel = {
      type: TYPE_TEST_FIELD,
      measurement: MEASUREMENT_TEST_FIELD,
    };
    const expectedSearchData = {
      key: testTextLabel.type + testTextLabel.measurement
    };

    const searchData = getSearchData(testTextLabel);
    expect(searchData).toMatchObject(expectedSearchData);
  });

  it('All fields', () => {
    const testTextLabel = {
      type: TYPE_TEST_FIELD,
      parameter: PARAMETER_TEST_FIELD,
      measurement: MEASUREMENT_TEST_FIELD,
    };
    const expectedSearchData = {
      key: testTextLabel.type + testTextLabel.measurement,
      parameter: testTextLabel.parameter
    };

    const searchData = getSearchData(testTextLabel);
    expect(searchData).toMatchObject(expectedSearchData);
  });
});
