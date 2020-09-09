import { DictionaryMap } from '../../dictionary/dictionary-map';
export function writeCommaOperator(node: any, state: any): void {
  if (node.expressions != null && node.expressions.length > 0) {
    DictionaryMap[node.expressions[0].type](node.expressions[0], state);
    const { length } = node.expressions;
    for (let i = 1; i < length; i++) {
      const param = node.expressions[i];
      state.source += ', ';
      DictionaryMap[param.type](param, state);
    }
  }
}
