import { DictionaryMap } from '../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeVariableStatement(node: any, state: any, context: Context): void {
  state.source += 'var ';
  const { declarations } = node;
  const { length } = declarations;
  if (length > 0) {
    DictionaryMap[declarations[0].type](declarations[0], state, context);
    for (let i = 1; i < length; i++) {
      state.source += ', ';
      DictionaryMap[declarations[i].type](declarations[i], state, context);
    }
  }
}
