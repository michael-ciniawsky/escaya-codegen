import { Context } from '../../common';
export function writeCallChain(_node: any, state: any, _context: Context): void {
  state.source += `this`;
}
