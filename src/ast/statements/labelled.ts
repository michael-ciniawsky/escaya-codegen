import { DictionaryMap } from '../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeLabelledStatement(node: any, state: any, context: Context): void {
  DictionaryMap[node.label.type](node.label, state, context);
  state.source += ':';
  DictionaryMap[node.labelledItem.type](node.labelledItem, state, context);
}
