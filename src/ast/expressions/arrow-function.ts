import { DictionaryMap } from './../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeArrowFunction(node: any, state: any, context: Context): void {
  state.source += node.async ? 'async ' : '';
  const { params } = node;

  if (params !== null) {
    state.source += '(';
    if (node.params != null && node.params.length > 0) {
      DictionaryMap[node.params[0].type](node.params[0], state, context);
      const { length } = node.params;
      for (let i = 1; i < length; i++) {
        const param = node.params[i];
        state.source += ', ';
        DictionaryMap[param.type](param, state, context);
      }
    }
    state.source += ')';
  }
  state.source += ' => ';
  DictionaryMap[node.contents.type](node.contents, state, context);

  // TODO: If 'minified' we would insert a ';' instead of a '\n'
  if (node.newlineBeforeNextToken) {
    state.source += '\n';
  }
}
