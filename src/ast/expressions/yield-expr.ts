import { DictionaryMap } from './../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeYieldExpression(node: any, state: any, context: Context): void {
  state.source += node.delegate ? 'yield*' : 'yield';
  if (node.argument) {
    state.source += ' ';
    DictionaryMap[node.argument.type](node.argument, state, context);
  }
}
