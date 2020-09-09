import * as t from 'assert';
import { parseScript } from 'escaya';
import { generate } from '../src/escaya-codegen';

describe('Module goal', () => {
  for (const arg of ['{a ? b : c}']) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(generate(parseScript(`${arg}`)));
      });
    });
  }
});
