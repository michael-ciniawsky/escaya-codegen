import { DictionaryMap } from './../../dictionary/dictionary-map';

export function writeSpreadProperty(node: any, state: any): void {
  state.source += `...`;
  DictionaryMap[node.argument.type](node.argument, state);
}
