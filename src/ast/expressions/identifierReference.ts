export function writeIdentifierReference(node: any, state: any): void {
  state.source += node.name;
}
