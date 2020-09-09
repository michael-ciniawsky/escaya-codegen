import { DictionaryMap } from '../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeThrowStatement(node: any, state: any, context: Context): void {
  state.source += 'throw ';
  DictionaryMap[node.expression.type](node.expression, state, context);
  if (node.asi) state.source += ';';
}
