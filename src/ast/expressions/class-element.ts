import { DictionaryMap } from './../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeClassElement(node: any, state: any, context: Context): void {
  if (node.static) state.source += 'static ';
  DictionaryMap[node.method.type](node.method, state, context);
}
