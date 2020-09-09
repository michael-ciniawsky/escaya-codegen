import { DictionaryMap } from '../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeLexicalBinding(node: any, state: any, context: Context): void {
  DictionaryMap[node.binding.type](node.binding, state, context);
  if (node.initializer !== null) {
    state.source += ' = ';
    DictionaryMap[node.initializer.type](node.initializer, state, context);
  }
  if (node.asi) state.source += ';';
}
