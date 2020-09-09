import { DictionaryMap } from './../../dictionary/dictionary-map';
export function writeYieldExpression(node: any, state: any): void {
  state.source += node.delegate ? 'yield*' : 'yield';
  if (node.argument) {
    state.source += ' ';
    DictionaryMap[node.argument.type](node.argument, state);
  }
}
