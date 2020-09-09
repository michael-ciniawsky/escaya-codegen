import { DictionaryMap } from '../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeIfStatement(node: any, state: any, context: Context): void {
  context |= Context.IfStatement;
  state.source += ' if (';
  DictionaryMap[node.expression.type](node.expression, state, context);
  state.source += ') ';
  DictionaryMap[node.consequent.type](node.consequent, state, context);
  if (node.alternate) {
    state.source += '\n';
    state.source += ' else ';
    DictionaryMap[node.alternate.type](node.alternate, state, context);
  } else {
    if ((context & Context.InBlock1) === 0) state.source += ';';
  }
}
