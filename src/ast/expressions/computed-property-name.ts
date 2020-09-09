import { DictionaryMap } from '../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeComputedPropertyName(node: any, state: any, context: Context): void {
  state.source += `[${DictionaryMap[node.expression.type](node.expression, state, context)}]`;
}
