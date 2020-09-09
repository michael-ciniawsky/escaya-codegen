import { DictionaryMap } from '../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeBindingElement(node: any, state: any, context: Context): void {
  DictionaryMap[node.left.type](node.left, state, context);
  if (node.right !== null) {
    state.source += ' = ';
    DictionaryMap[node.right.type](node.right, state, context);
  }
}
