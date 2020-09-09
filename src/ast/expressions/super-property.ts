import { Context } from '../../common';
import { DictionaryMap } from './../../dictionary/dictionary-map';
export function writeSuperProperty(node: any, state: any, context: Context): void {
  state.source += `super.`;
  DictionaryMap[node.super.type](node.super, state, context);
  // TODO: Fix this in next EScaya version - use the computed property
  state.source += `()`;
}
