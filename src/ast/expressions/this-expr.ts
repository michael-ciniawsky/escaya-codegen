export function writeThisExpression(node: any, state: any): void {
  state.source += JSON.stringify(node.value);
}
