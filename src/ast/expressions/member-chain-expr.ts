import { Context } from '../../common';
export function writeMemberChainExpression(_node: any, state: any, _context: Context): void {
  state.source += `this`;
}
