import { DictionaryMap } from '../../dictionary/dictionary-map';
export function writeForInStatement(node: any, state: any): void {
  state.source += `for ${node.await ? 'await ' : ''}(`;

  DictionaryMap[node.initializer.type](node.initializer, state);
  state.source += ' in ';
  DictionaryMap[node.expression.type](node.expression, state);
  state.source += ') ';
  DictionaryMap[node.statement.type](node.statement, state);
  state.source += ';';
}
