import { DictionaryMap } from '../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeDoWhileStatement(node: any, state: any, context: Context): void {
  state.source += 'do ';
  DictionaryMap[node.statement.type](node.statement, state, context);
  state.source += '; while (';
  DictionaryMap[node.expression.type](node.expression, state, context);
  state.source += ');';
}
