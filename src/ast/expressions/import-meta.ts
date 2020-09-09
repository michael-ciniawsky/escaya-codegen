import { Context } from '../../common';
export function writeImportMeta(_node: any, state: any, _context: Context): void {
  state.source += `this`;
}
