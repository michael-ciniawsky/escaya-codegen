import { DictionaryMap } from './../../dictionary/dictionary-map';

export function writeArrayBindingPattern(node: any, state: any): void {
  state.source += `[`;
  if (node.elements.length > 0) {
    const { elements } = node,
      { length } = elements;
    for (let i = 0; ; ) {
      const element = elements[i];
      if (element != null) {
        DictionaryMap[element.type](element, state);
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
