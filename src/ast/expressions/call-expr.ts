import { DictionaryMap } from '../../dictionary/dictionary-map';

export function writeCallExpression(node: any, state: any): void {
  DictionaryMap[node.expression.type](node.expression, state);
  state.source += '(';
  if (node.arguments != null && node.arguments.length > 0) {
    DictionaryMap[node.arguments[0].type](node.arguments[0], state);
    const { length } = node.arguments;
    for (let i = 1; i < length; i++) {
      const param = node.arguments[i];
      state.source += ', ';
      DictionaryMap[param.type](param, state);
    }
  }
  state.source += ')';
  //state.source += ';';
}
