import { DictionaryMap } from './../../dictionary/dictionary-map';
export function writeWithStatement(node: any, state: any): void {
  state.source += 'with (';
  DictionaryMap[node.expression.type](node.expression, state);
  state.source += ')';
  DictionaryMap[node.statement.type](node.statement, state);
  if (node.asi) state.source += ';';
}
