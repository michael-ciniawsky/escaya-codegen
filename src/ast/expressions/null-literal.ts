import { Context } from '../../common';
export function writeNullLiteral(node: any, state: any, _context: Context): void {
  state.source += JSON.stringify(node.value);
}
