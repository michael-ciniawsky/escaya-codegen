import { Context } from '../../common';
import { DictionaryMap } from './../../dictionary/dictionary-map';
export function writeUnaryExpression(node: any, state: any, context: Context): void {
  state.source += node.operator + ' ';
  DictionaryMap[node.operand.type](node.operand, state, context);
}
