import { DictionaryMap } from '../../dictionary/dictionary-map';

export function writeContinueStatement(node: any, state: any): void {
  state.source += 'continue';
  if (node.label !== null) {
    DictionaryMap[node.label.type](node.label, state);
  }
  if (node.asi) state.source += ';';
}
