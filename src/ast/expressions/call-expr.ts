import { DictionaryMap } from '../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeCallExpression(node: any, state: any, context: Context): void {
  DictionaryMap[node.expression.type](node.expression, state, context);
  state.source += '(';
  if (node.arguments != null && node.arguments.length > 0) {
    DictionaryMap[node.arguments[0].type](node.arguments[0], state, context);
    const { length } = node.arguments;
    for (let i = 1; i < length; i++) {
      const param = node.arguments[i];
      state.source += ', ';
      DictionaryMap[param.type](param, state, context);
    }
  }
  state.source += ')';
  //state.source += ';';
}
