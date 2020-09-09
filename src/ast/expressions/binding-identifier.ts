export function writeBindingIdentifier(node: any, state: any): void {
  state.source += node.name;
}
