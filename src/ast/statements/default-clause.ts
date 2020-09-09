import { DictionaryMap } from '../../dictionary/dictionary-map';

export function writeDefaultClause(node: any, state: any): void {
  state.source += 'default: ';
  const leafs = node.leafs;
  for (let i = 0; i < leafs.length; i++) {
    DictionaryMap[node.leafs[i].type](node.leafs[i], state);
  }
  state.source += ';';
}
