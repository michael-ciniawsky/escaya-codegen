import { DictionaryMap } from './../../dictionary/dictionary-map';
export function writePropertyName(node: any, state: any): void {
  DictionaryMap[node.key.type](node.key, state);
  state.source += `: `;
  DictionaryMap[node.value.type](node.value, state);
}
