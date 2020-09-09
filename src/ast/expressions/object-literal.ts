import { DictionaryMap } from './../../dictionary/dictionary-map';

export function writeObjectLiteral(node: any, state: any): void {
  state.source += `{`;
  if (node.properties.length > 0) {
    const { properties } = node,
      { length } = properties;
    for (let i = 0; ; ) {
      const property = properties[i];
      DictionaryMap[property.type](property, state);
      if (++i < length) {
        state.source += ', ';
      } else {
        break;
      }
    }
  }
  state.source += `}`;
}
