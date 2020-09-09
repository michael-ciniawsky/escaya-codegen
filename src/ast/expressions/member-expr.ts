import { DictionaryMap } from '../../dictionary/dictionary-map';
import { EXPRESSIONS_PRECEDENCE } from '../../common';
export function writeMemberExpression(node: any, state: any): void {
  // TODO: Fix this in next EScaya version - use the isFloat property
  // to avoid wrapping in parenteces
  if (EXPRESSIONS_PRECEDENCE[node.member.type] < EXPRESSIONS_PRECEDENCE.MemberExpression) {
    state.source += '(';
    DictionaryMap[node.member.type](node.member, state);
    state.source += ')';
  } else {
    DictionaryMap[node.member.type](node.member, state);
  }

  if (node.computed) {
    state.source += '[';
    DictionaryMap[node.expression.type](node.expression, state);
    state.source += ']';
  } else {
    state.source += '.';
    DictionaryMap[node.expression.type](node.expression, state);
  }
}
