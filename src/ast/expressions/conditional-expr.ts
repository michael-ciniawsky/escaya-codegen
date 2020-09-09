import { DictionaryMap } from '../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeConditionalExpression(node: any, state: any, context: Context): void {
  DictionaryMap[node.shortCircuit.type](node.shortCircuit, state, context);
  state.source += ' ? ';
  DictionaryMap[node.consequent.type](node.consequent, state, context);
  state.source += ' : ';
  DictionaryMap[node.alternate.type](node.alternate, state, context);
}
