import { DictionaryMap } from './../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeAwaitExpression(node: any, state: any, _context: Context): void {
  state.source += `Await`;
  if (node.argument) {
    if (node.argument.type === 'ArrowFunctionExpression') {
      state.source += '(';
      DictionaryMap[node.argument.type](node.argument, state, context);
      state.source = ')';
    } else {
      DictionaryMap[node.argument.type](node.argument, state, context);
    }
  }
}
