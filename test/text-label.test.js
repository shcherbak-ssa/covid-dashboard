import { transformTextLabel } from '../src/tools';

const TYPE_TEST_FIELD = 'type';
const PARAMETER_TEST_FIELD = 'parameter';
const MEASUREMENT_TEST_FIELD = 'measurement';

describe('Text label tranformation', () => {
  it('Only type field', () => {
    const testTextLabel = {
      type: TYPE_TEST_FIELD,
    };
    const expectTextLabel = testTextLabel.type;

    const transformedTextLabel = transformTextLabel(testTextLabel);
    expect(transformedTextLabel).toBe(expectTextLabel);
  });

  it('Type and parameter fields', () => {
    const testTextLabel = {
      type: TYPE_TEST_FIELD,
      parameter: PARAMETER_TEST_FIELD,
    };
    const expectTextLabel = `${testTextLabel.type} ${testTextLabel.parameter}`;

    const transformedTextLabel = transformTextLabel(testTextLabel);
    expect(transformedTextLabel).toBe(expectTextLabel);
  });

  it('Type and measurement fields', () => {
    const testTextLabel = {
      type: TYPE_TEST_FIELD,
      measurement: MEASUREMENT_TEST_FIELD,
    };
    const expectTextLabel = `${testTextLabel.type} / ${testTextLabel.measurement}`;

    const transformedTextLabel = transformTextLabel(testTextLabel);
    expect(transformedTextLabel).toBe(expectTextLabel);
  });

  it('All fields', () => {
    const testTextLabel = {
      type: TYPE_TEST_FIELD,
      parameter: PARAMETER_TEST_FIELD,
      measurement: MEASUREMENT_TEST_FIELD,
    };
    const expectTextLabel = `${testTextLabel.type} ${testTextLabel.parameter} / ${testTextLabel.measurement}`;

    const transformedTextLabel = transformTextLabel(testTextLabel);
    expect(transformedTextLabel).toBe(expectTextLabel);
  });
});
