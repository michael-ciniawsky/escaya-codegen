import { DictionaryMap } from '../../dictionary/dictionary-map';

export function writeReturnStatement(node: any, state: any): void {
  state.source += 'return';
  if (node.expression) {
    state.source += ' ';
    DictionaryMap[node.expression.type](node.expression, state);
  }
  if (node.asi) state.source += ';';
}
