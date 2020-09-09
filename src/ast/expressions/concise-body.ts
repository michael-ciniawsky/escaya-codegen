import { DictionaryMap } from '../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeConciseBody(node: any, state: any, context: Context): void {
  DictionaryMap[node.expression.type](node.expression, state, context);
}
