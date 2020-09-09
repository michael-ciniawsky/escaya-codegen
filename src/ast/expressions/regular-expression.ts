import { Context } from '../../common';
export function writeRegularExpression(node: any, state: any, _context: Context): void {
  state.source += `/${node.pattern}/${node.flag}`;
}
