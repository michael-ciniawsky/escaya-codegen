import { Context } from '../../common';
export function writeTaggedTemplate(_node: any, state: any, _context: Context): void {
  state.source += `this`;
}
