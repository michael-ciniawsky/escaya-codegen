import { DictionaryMap } from '../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeDefaultClause(node: any, state: any, context: Context): void {
  state.source += 'default: ';
  const leafs = node.leafs;
  for (let i = 0; i < leafs.length; i++) {
    DictionaryMap[node.leafs[i].type](node.leafs[i], state, context);
  }
  state.source += ';';
}
