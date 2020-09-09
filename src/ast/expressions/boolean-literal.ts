export function writeBooleanLiteral(node: any, state: any): void {
  state.source += node.value;
}
