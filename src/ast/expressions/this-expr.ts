import { Context } from '../../common';
export function writeThisExpression(node: any, state: any, _context: Context): void {
  state.source += JSON.stringify(node.value);
}
