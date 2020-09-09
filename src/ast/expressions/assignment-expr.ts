import { DictionaryMap } from '../../dictionary/dictionary-map';

export function writeAssignmentExpression(node: any, state: any): void {
  DictionaryMap[node.left.type](node.left, state);
  state.source += node.operator;
  DictionaryMap[node.right.type](node.right, state);
}
