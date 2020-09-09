import { Context } from '../../common';
export function writeTemplateElement(_node: any, state: any, _context: Context): void {
  state.source += `this`;
}
