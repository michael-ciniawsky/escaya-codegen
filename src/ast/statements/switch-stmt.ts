import { DictionaryMap } from '../../dictionary/dictionary-map';
export function writeSwitchStatement(node: any, state: any): void {
  state.source += 'switch (';
  DictionaryMap[node.expression.type](node.expression, state);
  state.source += ') {' + state.lineEnd;
  const clauses = node.clauses;
  for (let i = 0; i < clauses.length; i++) {
    DictionaryMap[node.clauses[i].type](node.clauses[i], state);
  }
  state.source += '}';
  if (node.asi) state.source += ';';
}
