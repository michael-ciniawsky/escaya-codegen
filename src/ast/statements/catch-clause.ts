import { DictionaryMap } from '../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeCatchClause(node: any, state: any, context: Context): void {
  state.source += 'catch';
  if (node.binding) {
    state.source += '(';
    DictionaryMap[node.binding.type](node.binding, state, context);
    state.source += ')';
  }
  DictionaryMap[node.block.type](node.block, state, context);
  state.source += ';';
}
