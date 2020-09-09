export function writeDebuggerStatement(state: any, _node: any): void {
  state.source += 'debugger;';
}
