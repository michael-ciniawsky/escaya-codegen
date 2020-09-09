import { DictionaryMap } from './../../dictionary/dictionary-map';
export function writeSuperProperty(node: any, state: any): void {
  state.source += `super.`;
  DictionaryMap[node.super.type](node.super, state);
  // TODO: Fix this in next EScaya version - use the computed property
  state.source += `()`;
}
