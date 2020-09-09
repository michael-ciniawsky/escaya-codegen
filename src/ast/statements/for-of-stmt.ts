import { DictionaryMap } from '../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeForOfStatement(node: any, state: any, context: Context): void {
  state.source += `for ${node.await ? 'await ' : ''}(`;
  context |= Context.ForStatement;
  DictionaryMap[node.initializer.type](node.initializer, state, context);
  state.source += ' of ';
  DictionaryMap[node.expression.type](node.expression, state, context);
  state.source += ') ';
  DictionaryMap[node.statement.type](node.statement, state, context);
  state.source += ';';
}
