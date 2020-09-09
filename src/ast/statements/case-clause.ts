import { DictionaryMap } from '../../dictionary/dictionary-map';
export function writeCaseClause(node: any, state: any): void {
  state.source += 'case  ';
  DictionaryMap[node.expression.type](node.expression, state);
  state.source += ': ';
  const leafs = node.leafs;
  for (let i = 0; i < leafs.length; i++) {
    DictionaryMap[node.leafs[i].type](node.leafs[i], state);
  }
  state.source += ';';
}
