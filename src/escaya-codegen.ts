import { createState } from './codeGen';
import { DictionaryMap } from './dictionary/dictionary-map';
export function generate(node: any): any {
  const state = createState();
  DictionaryMap[node.type](node, state);
  return state.source;
}
