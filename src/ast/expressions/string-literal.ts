import { Context } from '../../common';
export function writeStringLiteral(node: any, state: any, _context: Context): void {
  state.source += JSON.stringify(node.value);
}
