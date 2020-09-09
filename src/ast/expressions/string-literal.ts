export function writeStringLiteral(node: any, state: any): void {
  state.source += JSON.stringify(node.value);
}
