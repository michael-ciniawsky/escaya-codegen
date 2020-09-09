import { Context } from '../../common';
export function writeEmptyStatement(_node: any, state: any, _context: Context): void {
  state.source += ';'; // TODO: Track useless semicolons
}
