import { DictionaryMap } from '../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeForStatement(node: any, state: any, context: Context): void {
  state.source += ` for (`;

  if (node.variableDeclarationList) {
    state.source += 'var ';
    const { initializer } = node;
    const { length } = initializer;
    DictionaryMap[initializer[0].type](initializer[0], state, context);
    for (let i = 1; i < length; i++) {
      state.source += ', ';
      DictionaryMap[initializer[i].type](initializer[i], state, context);
    }
  } else if (node.initializer != null) {
    DictionaryMap[node.initializer.type](node.initializer, state, context);
  }
  state.source += ';';
  if (node.test) {
    DictionaryMap[node.condition.type](node.condition, state, context);
  }
  state.source += ';';
  if (node.incrementor) {
    DictionaryMap[node.incrementor.type](node.incrementor, state, context);
  }
  state.source += ') ';
  DictionaryMap[node.statement.type](node.statement, state, context);
}
