import { Context } from '../../common';
export function writeDebuggerStatement(state: any, _node: any, _context: Context): void {
  state.source += 'debugger;';
}
