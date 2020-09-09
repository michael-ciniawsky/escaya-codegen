import { writeLeafNodes } from '../../common';
import { Context } from '../../common';
export function writeFunctionBody(node: any, state: any, context: Context): void {
  writeLeafNodes(node, state, context);
}
