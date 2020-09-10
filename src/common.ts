export const enum Context {
  None = 0
}

export interface CodeGenState {
  base: any;
  indent: number;
  currentIndent: number;
  indentSize: number;
}

export const enum Precedence {
  Sequence,
  Assignment = 1 << 1,
  Conditional = 1 << 2,
  LogicalOR = 1 << 3,
  LogicalAND = 1 << 4,
  LogicalXOR = 1 << 5,
  BitwiseOR = 1 << 6,
  BitwiseAND = 1 << 7,
  Equality = 1 << 8,
  Relational = 1 << 9,
  BitwiseSHIFT = 1 << 10,
  Additive = 1 << 11,
  Multiplicative = 1 << 12,
  Unary = 1 << 13,
  Postfix = 1 << 14,
  Call = 1 << 15,
  New = 1 << 16,
  Member = 1 << 17,
  Primary = 1 << 18
}

export function indent(state: CodeGenState, buffer: string, str: string): any {
  if (str !== undefined) {
    buffer = println(state, buffer, str);
  }
  state.currentIndent++;
  return buffer;
}

export function println(state: CodeGenState, buffer: string, str: any): any {
  buffer += ' '.repeat(state.currentIndent * state.indentSize);
  buffer += str + '\n';
  return buffer;
}

export function dedent(state: CodeGenState, buffer: string, str: string): any {
  if (state.currentIndent > 0) {
    state.currentIndent--;
  }
  if (str !== undefined) {
    buffer = println(state, buffer, str);
  }
  return buffer;
}
