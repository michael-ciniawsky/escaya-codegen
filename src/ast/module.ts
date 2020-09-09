import { DictionaryMap } from '../../src/dictionary/dictionary-map';
export function writeModule(node: any, state: any): void {
  node.leafs.forEach((stmt: any) => DictionaryMap[stmt.type](stmt, state));
}
