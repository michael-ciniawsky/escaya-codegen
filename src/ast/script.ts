import { DictionaryMap } from '../../src/dictionary/dictionary-map';
export function writeScript(node: any, state: any): void {
  node.leafs.forEach((stmt: any) => DictionaryMap[stmt.type](stmt, state));
}
