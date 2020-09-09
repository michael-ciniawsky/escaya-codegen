import { DictionaryMap } from './../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writePostixUpdateExpression(node: any, state: any, context: Context): void {
  state.source += node.operator + ' ';
  DictionaryMap[node.operand.type](node.operand, state, context);
}
