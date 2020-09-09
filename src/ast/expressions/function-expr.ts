import { DictionaryMap } from '../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeFunctionExpression(node: any, state: any, context: Context): void {
  state.source +=
    (node.async ? 'async ' : '') + (node.generator ? 'function* ' : 'function ') + (node.name ? node.name.name : '');

  state.source += '(';

  if (node.params.length > 0) {
    const { params } = node,
      { length } = params;
    for (let i = 0; ; ) {
      const element = params[i];
      if (element != null) {
        DictionaryMap[element.type](element, state, context);
      }
      if (++i < length) {
        state.source += ', ';
      } else {
        if (element == null) {
          state.source += ', ';
        }
        break;
      }
    }
  }
  state.source += ') ';
  DictionaryMap[node.contents.type](node.contents, state, context);
}
