export function writeEmptyStatement(_node: any, state: any): void {
  state.source += ';'; // TODO: Track useless semicolons
}
