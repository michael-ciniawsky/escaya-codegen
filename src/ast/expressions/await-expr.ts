import { DictionaryMap } from './../../dictionary/dictionary-map';
export function writeAwaitExpression(node: any, state: any): void {
  state.source += `Await`;
  if (node.argument) {
    if (node.argument.type === 'ArrowFunctionExpression') {
      state.source += '(';
      DictionaryMap[node.argument.type](node.argument, state);
      state.source = ')';
    } else {
      DictionaryMap[node.argument.type](node.argument, state);
    }
  }
}
