import { DictionaryMap } from '../../dictionary/dictionary-map';

export function writeBindingRestElement(node: any, state: any): void {
  state.source += `...`;
  DictionaryMap[node.argument.type](node.argument, state);
}
