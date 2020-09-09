import { DictionaryMap } from './dictionary/dictionary-map';

export const enum Context {
  None = 0,

  InBlock1 = 1 << 0,
  IsArrow = 1 << 1, // For cases like '()=>{}\n(foo)', 'async () => {} \n  /x/', etc

  // Statements for ';' tracking
  BlockStatement = 1 << 2,
  BreakStatement = 1 << 3,
  SwitchStatement = 1 << 4,
  IfStatement = 1 << 5,
  LexicalDeclaration = 1 << 6,
  VariableStatement = 1 << 7,
  IterationStatement = 1 << 8,
  ReturnStatement = 1 << 9,
  ThrowStatement = 1 << 10,
  TryStatement = 1 << 11,
  ForStatement = 1 << 12,
  DebuggerStatement = 1 << 13,
  ExpressionStatement = 1 << 14
}

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

export function writeLeafNodes(node: any, state: any, context: Context): any {
  let str = '';

  const statements = node.leafs;

  state.source += '{';

  for (let i = 0; i < statements.length; i++) {
    DictionaryMap[statements[i].type](statements[i], state, context);
    str += state.source;
  }

  state.source += '}';
  if (node.asi) state.source += ';';
  return str;
}
