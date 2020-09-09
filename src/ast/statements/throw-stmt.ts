import { DictionaryMap } from '../../dictionary/dictionary-map';
export function writeThrowStatement(node: any, state: any): void {
  state.source += 'throw ';
  DictionaryMap[node.expression.type](node.expression, state);
  if (node.asi) state.source += ';';
}
