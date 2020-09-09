import { CodeGenState, writeLeafNodes } from '../../common';
import { BlockStatement } from 'escaya/dist/ast/statements/block-stmt';
import { Context } from '../../common';
export function writeBlockStatement(node: BlockStatement, state: CodeGenState, context: Context): string {
  context |= Context.BlockStatement;
  return writeLeafNodes(node, state, context);
}
