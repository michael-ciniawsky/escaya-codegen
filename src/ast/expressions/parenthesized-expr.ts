import { Context } from '../../common';
import { DictionaryMap } from '../../dictionary/dictionary-map';

export function writeParenthesizedExpression(node: any, state: any, context: Context): void {
  state.source += `(`;
  DictionaryMap[node.expression.type](node.expression, state, context);
  state.source += `)`;
}
