import { DictionaryMap } from '../../dictionary/dictionary-map';
export function writeForStatement(node: any, state: any): void {
  state.source += ` for (`;

  if (node.variableDeclarationList) {
    state.source += 'var ';
    const { initializer } = node;
    const { length } = initializer;
    DictionaryMap[initializer[0].type](initializer[0], state);
    for (let i = 1; i < length; i++) {
      state.source += ', ';
      DictionaryMap[initializer[i].type](initializer[i], state);
    }
  } else if (node.initializer != null) {
    DictionaryMap[node.initializer.type](node.initializer, state);
  }
  state.source += ';';
  if (node.test) {
    DictionaryMap[node.condition.type](node.condition, state);
  }
  state.source += ';';
  if (node.incrementor) {
    DictionaryMap[node.incrementor.type](node.incrementor, state);
  }
  state.source += ') ';
  DictionaryMap[node.statement.type](node.statement, state);
}
