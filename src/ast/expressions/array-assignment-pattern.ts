import { DictionaryMap } from './../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeArrayAssignmentPattern(node: any, state: any, context: Context): void {
  state.source += `[`;
  if (node.elements.length > 0) {
    const { elements } = node,
      { length } = elements;
    for (let i = 0; ; ) {
      const element = elements[i];
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
  state.source += `]`;
}
