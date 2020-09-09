import { DictionaryMap } from './dictionary/dictionary-map';

export interface CodeGenState {
  source: string;
  index: number;
  indentSize: number;
  indent: string;
  lineEnd: string;
}

export const EXPRESSIONS_PRECEDENCE: any = {
  NumericLiteral: 18
};

export function writeLeafNodes(node: any, state: any): any {
  let str = '';

  const statements = node.leafs;

  state.source += '{';

  for (let i = 0; i < statements.length; i++) {
    DictionaryMap[statements[i].type](statements[i], state);
    str += state.source;
  }

  state.source += '}';
  if (node.asi) state.source += ';';
  return str;
}
