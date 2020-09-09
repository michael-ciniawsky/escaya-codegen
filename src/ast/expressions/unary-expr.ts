import { DictionaryMap } from './../../dictionary/dictionary-map';
export function writeUnaryExpression(node: any, state: any): void {
  state.source += node.operator + ' ';
  DictionaryMap[node.operand.type](node.operand, state);
}
