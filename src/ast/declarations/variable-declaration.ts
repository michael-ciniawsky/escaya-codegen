import { DictionaryMap } from './../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeVariableDeclaration(node: any, state: any, context: Context): void {
  DictionaryMap[node.binding.type](node.binding, state);
  if (node.initializer !== null) {
    state.source += '=';
    DictionaryMap[node.initializer.type](node.initializer, state, context);
  }
  if (node.asi) state.source += ';';
}
