import { Context } from '../../common';
export function writeTemplateExpression(_node: any, state: any, _context: Context): void {
  state.source += `this`;
}
