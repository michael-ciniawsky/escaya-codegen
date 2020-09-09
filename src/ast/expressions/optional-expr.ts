import { Context } from '../../common';
export function writeOptionaExpression(_node: any, state: any, _context: Context): void {
  state.source += `this`;
}
