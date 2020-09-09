import { DictionaryMap } from '../../dictionary/dictionary-map';
export function writeDoWhileStatement(node: any, state: any): void {
  state.source += 'do ';
  DictionaryMap[node.statement.type](node.statement, state);
  state.source += '; while (';
  DictionaryMap[node.expression.type](node.expression, state);
  state.source += ');';
}
