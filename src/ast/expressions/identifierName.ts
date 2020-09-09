import { Context } from '../../common';
export function writeIdentifierName(node: any, state: any, _context: Context): void {
  state.source += node.name;
}
