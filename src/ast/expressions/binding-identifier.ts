import { Context } from '../../common';
export function writeBindingIdentifier(node: any, state: any, _context: Context): void {
  state.source += node.name;
}
