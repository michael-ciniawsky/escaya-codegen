import { Context } from '../../common';
export function writeBigintLiteral(node: any, state: any, _context: Context): void {
  state.source += node.value;
}
