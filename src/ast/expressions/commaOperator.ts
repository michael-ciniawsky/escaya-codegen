import { DictionaryMap } from '../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeCommaOperator(node: any, state: any, context: Context): void {
  if (node.expressions != null && node.expressions.length > 0) {
    DictionaryMap[node.expressions[0].type](node.expressions[0], state, context);
    const { length } = node.expressions;
    for (let i = 1; i < length; i++) {
      const param = node.expressions[i];
      state.source += ', ';
      DictionaryMap[param.type](param, state, context);
    }
  }
}
