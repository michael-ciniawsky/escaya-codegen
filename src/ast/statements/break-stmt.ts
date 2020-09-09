import { DictionaryMap } from '../../dictionary/dictionary-map';

export function writeBreakStatement(node: any, state: any): void {
  state.source += 'break ';
  if (node.label !== null) {
    DictionaryMap[node.label.type](node.label, state);
    if (node.asi) state.source += ';';
  }
}
