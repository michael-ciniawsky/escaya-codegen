import { DictionaryMap } from './../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeClassExpression(node: any, state: any, context: Context): void {
  state.source += 'class ' + (node.name ? `${node.name.name} ` : '');

  if (node.superClass) {
    state.source += 'extends ';
    DictionaryMap[node.heritage.type](node.heritage, state, context);
  }

  state.source += '{';
  const statements = node.leafs;
  if (statements != null && statements.length > 0) {
    const { length } = statements;
    for (let i = 0; i < length; i++) {
      const statement = statements[i];
      DictionaryMap[statement.type](statement, state, context);
    }
  }
  state.source += '}';
}
