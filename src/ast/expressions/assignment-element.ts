import { DictionaryMap } from '../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeAssignmentElement(node: any, state: any, context: Context): void {
  DictionaryMap[node.left.type](node.left, state, context);
  state.source += '=';
  DictionaryMap[node.right.type](node.right, state, context);
}
