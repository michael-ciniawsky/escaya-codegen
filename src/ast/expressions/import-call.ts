import { Context } from '../../common';
export function writeImportCall(_node: any, state: any, _context: Context): void {
  state.source += `this`;
}
