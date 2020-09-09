import { DictionaryMap } from '../../dictionary/dictionary-map';
export function writeComputedPropertyName(node: any, state: any): void {
  state.source += `[${DictionaryMap[node.expression.type](node.expression, state)}]`;
}
