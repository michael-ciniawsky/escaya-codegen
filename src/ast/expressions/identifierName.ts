export function writeIdentifierName(node: any, state: any): void {
  state.source += node.name;
}
