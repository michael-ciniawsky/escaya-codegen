import { DictionaryMap } from './../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeSpreadElement(node: any, state: any, context: Context): void {
  state.source += `...`;
  DictionaryMap[node.argument.type](node.argument, state, context);
}