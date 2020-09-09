import { DictionaryMap } from '../../dictionary/dictionary-map';
export function writeConciseBody(node: any, state: any): void {
  DictionaryMap[node.expression.type](node.expression, state);
}
