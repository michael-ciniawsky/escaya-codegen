export function writeRegularExpression(node: any, state: any): void {
  state.source += `/${node.pattern}/${node.flag}`;
}
