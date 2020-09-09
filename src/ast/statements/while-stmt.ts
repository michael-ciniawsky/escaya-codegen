import { DictionaryMap } from './../../dictionary/dictionary-map';
export function writeWhileStatement(node: any, state: any): void {
  state.source += 'while (';
  DictionaryMap[node.expression.type](node.expression, state);
  state.source += ')';
  DictionaryMap[node.statement.type](node.statement, state);
  if (node.asi) state.source += ';';
}
