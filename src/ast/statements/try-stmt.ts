import { DictionaryMap } from '../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeTryStatement(node: any, state: any, context: Context): void {
  state.source += 'try ';
  state.source += '{';
  DictionaryMap[node.block.type](node.block, state, context);
  state.source += '} ';
  if (node.catchClause) {
    DictionaryMap[node.catchClause.type](node.catchClause, state, context);
  }
  if (node.finalizer) {
    state.source += ' finally ';
    DictionaryMap[node.finalizer.type](node.finalizer, state, context);
  }
  // state += ';';
}
