import { DictionaryMap } from '../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeBreakStatement(node: any, state: any, context: Context): void {
  state.source += 'break ';
  if (node.label !== null) {
    DictionaryMap[node.label.type](node.label, state, context);
    if (node.asi) state.source += ';';
  }
}
