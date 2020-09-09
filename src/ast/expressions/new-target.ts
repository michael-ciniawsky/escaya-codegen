import { Context } from '../../common';
export function writeNewTargetExpression(_node: any, state: any, _context: Context): void {
  state.source += `target`;
}
