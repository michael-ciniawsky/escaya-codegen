import { DictionaryMap } from '../../dictionary/dictionary-map';

export function writeAssignmentElement(node: any, state: any): void {
  DictionaryMap[node.left.type](node.left, state);
  state.source += '=';
  DictionaryMap[node.right.type](node.right, state);
}
