import { DictionaryMap } from '../../dictionary/dictionary-map';
export function writeExpressionStatement(node: any, state: any): void {
  const type = node.expression.type;
  DictionaryMap[node.expression.type](node.expression, state);
  if (node.asi) state.source += ';';
}
