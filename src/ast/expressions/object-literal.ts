import { DictionaryMap } from './../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeObjectLiteral(node: any, state: any, context: Context): void {
  state.source += `{`;
  if (node.properties.length > 0) {
    const { properties } = node,
      { length } = properties;
    for (let i = 0; ; ) {
      const property = properties[i];
      DictionaryMap[property.type](property, state, context);
      if (++i < length) {
        state.source += ', ';
      } else {
        break;
      }
    }
  }
  state.source += `}`;
}
