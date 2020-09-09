import { createState } from './codeGen';
import { DictionaryMap } from './dictionary/dictionary-map';
import { Context } from './common';
export function generate(node: any): any {
  const state = createState();
  DictionaryMap[node.type](node, state, Context.None);
  return state.source;
}
