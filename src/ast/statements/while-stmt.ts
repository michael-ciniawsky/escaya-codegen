import { DictionaryMap } from './../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeWhileStatement(node: any, state: any, context: Context): void {
  state.source += 'while (';
  DictionaryMap[node.expression.type](node.expression, state, context);
  state.source += ')';
  DictionaryMap[node.statement.type](node.statement, state, context);
  if (node.asi) state.source += ';';
}
