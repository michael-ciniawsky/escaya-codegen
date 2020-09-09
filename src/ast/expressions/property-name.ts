import { DictionaryMap } from './../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writePropertyName(node: any, state: any, context: Context): void {
  DictionaryMap[node.key.type](node.key, state, context);
  state.source += `: `;
  DictionaryMap[node.value.type](node.value, state, context);
}
