import { DictionaryMap } from './../../dictionary/dictionary-map';
export function writeClassElement(node: any, state: any): void {
  if (node.static) state.source += 'static ';
  DictionaryMap[node.method.type](node.method, state);
}
