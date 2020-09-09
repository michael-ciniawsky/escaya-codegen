import { DictionaryMap } from '../../dictionary/dictionary-map';
export function writeCatchClause(node: any, state: any): void {
  state.source += 'catch';
  if (node.binding) {
    state.source += '(';
    DictionaryMap[node.binding.type](node.binding, state);
    state.source += ')';
  }
  DictionaryMap[node.block.type](node.block, state);
  state.source += ';';
}
