import { transformTextLabel } from '../src/tools';

describe('Text label tranformation', () => {
  it('Only type field', () => {
    const testTextLabel = {
      type: 'only type field',
    };
    const expectTextLabel = testTextLabel.type;

    const transformedTextLabel = transformTextLabel(testTextLabel);
    expect(transformedTextLabel).toBe(expectTextLabel);
  });

  it('Type and parameter fields', () => {
    const testTextLabel = {
      type: 'type',
      parameter: 'parameter',
    };
    const expectTextLabel = `${testTextLabel.type} ${testTextLabel.parameter}`;

    const transformedTextLabel = transformTextLabel(testTextLabel);
    expect(transformedTextLabel).toBe(expectTextLabel);
  });

  it('Type and measurement fields', () => {
    const testTextLabel = {
      type: 'type',
      measurement: 'measurement',
    };
    const expectTextLabel = `${testTextLabel.type} / ${testTextLabel.measurement}`;

    const transformedTextLabel = transformTextLabel(testTextLabel);
    expect(transformedTextLabel).toBe(expectTextLabel);
  });

  it('All fields', () => {
    const testTextLabel = {
      type: 'type',
      parameter: 'parameter',
      measurement: 'measurement',
    };
    const expectTextLabel = `${testTextLabel.type} ${testTextLabel.parameter} / ${testTextLabel.measurement}`;

    const transformedTextLabel = transformTextLabel(testTextLabel);
    expect(transformedTextLabel).toBe(expectTextLabel);
  });
});