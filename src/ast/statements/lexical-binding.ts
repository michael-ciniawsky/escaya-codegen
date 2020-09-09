import { DictionaryMap } from '../../dictionary/dictionary-map';

export function writeLexicalBinding(node: any, state: any): void {
  DictionaryMap[node.binding.type](node.binding, state);
  if (node.initializer !== null) {
    state.source += ' = ';
    DictionaryMap[node.initializer.type](node.initializer, state);
  }
  if (node.asi) state.source += ';';
}
