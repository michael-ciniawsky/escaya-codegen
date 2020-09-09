import { DictionaryMap } from '../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeSwitchStatement(node: any, state: any, context: Context): void {
  state.source += 'switch (';
  DictionaryMap[node.expression.type](node.expression, state, context);
  state.source += ') {' + state.lineEnd;
  const clauses = node.clauses;
  for (let i = 0; i < clauses.length; i++) {
    DictionaryMap[node.clauses[i].type](node.clauses[i], state, context);
  }
  state.source += '}';
  if (node.asi) state.source += ';';
}
