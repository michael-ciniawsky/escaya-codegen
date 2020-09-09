import { Context } from '../../common';
export function writeIdentifierReference(node: any, state: any, _context: Context): void {
  state.source += node.name;
}
