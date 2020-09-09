import { Context } from '../../common';
export function writeLabelledIdentifier(node: any, state: any, _context: Context): void {
  state.source += node.name;
}
