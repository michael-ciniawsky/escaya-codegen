import { DictionaryMap } from '../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeReturnStatement(node: any, state: any, context: Context): void {
  state.source += 'return';
  if (node.expression) {
    state.source += ' ';
    DictionaryMap[node.expression.type](node.expression, state, context);
  }
  if (node.asi) state.source += ';';
}
