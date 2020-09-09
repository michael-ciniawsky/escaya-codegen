import { DictionaryMap } from '../../dictionary/dictionary-map';

export function writeLabelledStatement(node: any, state: any): void {
  DictionaryMap[node.label.type](node.label, state);
  state.source += ':';
  DictionaryMap[node.labelledItem.type](node.labelledItem, state);
}
