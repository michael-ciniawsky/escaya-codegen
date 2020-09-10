import { createState, writeScript } from './codeGen';
import { Context } from './common';

/**
 * The code generator options.
 */
export interface Options {
  indent?: any;
  index?: any;
  format?: any;
}

export function generate(node: any, _options?: Options): string {
  const state = createState();
  return writeScript(node, state, Context.None);
}
