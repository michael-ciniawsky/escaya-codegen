import { DictionaryMap } from './../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeNewExpression(node: any, state: any, context: Context): void {
  state.source += `new `;

  DictionaryMap[node.expression.type](node.expression, state, context);
  if (node.arguments != null && node.arguments.length > 0) {
    state.source += '(';
    DictionaryMap[node.arguments[0].type](node.arguments[0], state, context);
    const { length } = node.arguments;
    for (let i = 1; i < length; i++) {
      const param = node.arguments[i];
      state.source += ', ';
      DictionaryMap[param.type](param, state, context);
    }
    state.source += ')';
  }
}
