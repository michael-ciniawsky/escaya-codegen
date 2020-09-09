import { DictionaryMap } from '../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeExpressionStatement(node: any, state: any, context: Context): void {
  const type = node.expression.type;
  DictionaryMap[node.expression.type](node.expression, state, context);
  if (node.asi) state.source += ';';
}
