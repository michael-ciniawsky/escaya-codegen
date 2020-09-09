import { Context } from '../../common';
export function writeTemplateLiteral(_node: any, state: any, _context: Context): void {
  state.source += `this`;
}
