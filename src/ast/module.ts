import { DictionaryMap } from '../../src/dictionary/dictionary-map';
import { Context } from '../common';
export function writeModule(node: any, state: any, context: Context): void {
  node.leafs.forEach((stmt: any) => DictionaryMap[stmt.type](stmt, state, context));
}
