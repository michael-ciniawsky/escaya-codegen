import { DictionaryMap } from '../../dictionary/dictionary-map';

export function writeTryStatement(node: any, state: any): void {
  state.source += 'try ';
  state.source += '{';
  DictionaryMap[node.block.type](node.block, state);
  state.source += '} ';
  if (node.catchClause) {
    DictionaryMap[node.catchClause.type](node.catchClause, state);
  }
  if (node.finalizer) {
    state.source += ' finally ';
    DictionaryMap[node.finalizer.type](node.finalizer, state);
  }
  // state += ';';
}
