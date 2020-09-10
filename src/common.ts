export const enum Context {
  None = 0
}

export interface CodeGenState {
  base: any;
  indent: any;
  currentIndent: number;
  indentSize: number;
}

export const enum Precedence {
  Sequence = 0,
  Assignment = 1,
  Conditional = 2,
  LogicalOR = 3,
  LogicalAND = 4,
  LogicalXOR = 5,
  BitwiseOR = 6,
  BitwiseAND = 7,
  Equality = 8,
  Relational = 9,
  BitwiseSHIFT = 10,
  Additive = 11,
  Multiplicative = 12,
  Unary = 13,
  Postfix = 14,
  Call = 15,
  New = 16,
  Member = 17,
  Primary = 18
}

export function stringRepeat(str: string, num: number): string {
  var result = '';

  for (num |= 0; num > 0; num >>>= 1, str += str) {
    if (num & 1) {
      result += str;
    }
  }

  return result;
}
