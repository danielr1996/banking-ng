import {SaldoPipe} from './saldo.pipe';
import {PipeTransform} from '@angular/core';

describe('SaldoPipe', () => {
  [
    /** https://www.compart.com/de/unicode/U+2014 */
    {name: 'converts null values', value: null, expected: '—'},
    {name: 'passes 0 as is', value: 0, expected: 0},
    {name: 'passes positive numbers as they are', value: 100, expected: 100},
    {name: 'passes negative numbers as they are', value: -100, expected: -100},
  ].forEach(({name, value, expected}) => {
    it(name, () => {
      const pipe: PipeTransform = new SaldoPipe();
      const actual: string | number = pipe.transform(value);
      /** https://www.compart.com/de/unicode/U+2014 */
      expect(actual).toBe(expected);
    });
  });
});
