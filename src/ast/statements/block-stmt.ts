import { CodeGenState, writeLeafNodes } from '../../common';
import { BlockStatement } from 'escaya/dist/ast/statements/block-stmt';
export function writeBlockStatement(node: BlockStatement, state: CodeGenState): string {
  return writeLeafNodes(node, state);
}
