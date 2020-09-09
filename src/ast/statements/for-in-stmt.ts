import { DictionaryMap } from '../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeForInStatement(node: any, state: any, context: Context): void {
  state.source += `for ${node.await ? 'await ' : ''}(`;

  DictionaryMap[node.initializer.type](node.initializer, state, context);
  state.source += ' in ';
  DictionaryMap[node.expression.type](node.expression, state, context);
  state.source += ') ';
  DictionaryMap[node.statement.type](node.statement, state, context);
  state.source += ';';
}
