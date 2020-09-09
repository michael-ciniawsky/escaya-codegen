import { Context } from '../../common';
export function writeSuperCall(_node: any, state: any, _context: Context): void {
  state.source += `superCall`;
}
