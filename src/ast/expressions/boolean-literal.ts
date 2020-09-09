import { Context } from '../../common';
export function writeBooleanLiteral(node: any, state: any, _context: Context): void {
  state.source += node.value;
}
