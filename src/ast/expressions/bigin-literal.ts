export function writeBigintLiteral(node: any, state: any): void {
  state.source += node.value;
}
