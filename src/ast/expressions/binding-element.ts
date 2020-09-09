import { DictionaryMap } from '../../dictionary/dictionary-map';

export function writeBindingElement(node: any, state: any): void {
  DictionaryMap[node.left.type](node.left, state);
  if (node.right !== null) {
    state.source += ' = ';
    DictionaryMap[node.right.type](node.right, state);
  }
}
