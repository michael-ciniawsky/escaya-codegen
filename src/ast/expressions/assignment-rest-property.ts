import { DictionaryMap } from '../../dictionary/dictionary-map';

export function writeAssignmentRestProperty(node: any, state: any): void {
  state.source += `...`;
  DictionaryMap[node.argument.type](node.argument, state);
}
