import { DictionaryMap } from '../../dictionary/dictionary-map';
export function writeConditionalExpression(node: any, state: any): void {
  DictionaryMap[node.shortCircuit.type](node.shortCircuit, state);
  state.source += ' ? ';
  DictionaryMap[node.consequent.type](node.consequent, state);
  state.source += ' : ';
  DictionaryMap[node.alternate.type](node.alternate, state);
}
