import { Context } from '../../common';
export function writeOptionalChain(_node: any, state: any, _context: Context): void {
  state.source += `this`;
}
