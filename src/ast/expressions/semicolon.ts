import { Context } from '../../common';
export function writeSemicolon(_node: any, state: any, _context: Context): void {
  state.source += `;`;
}
