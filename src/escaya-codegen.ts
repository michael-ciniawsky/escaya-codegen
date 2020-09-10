import { createState, writeModuleItem, writeStatements } from './codeGen';
import { Context } from './common';
import { Script } from 'escaya/dist/ast/script-node';
import { Module } from 'escaya/dist/ast/module-node';

/**
 * The code generator options.
 */
export interface Options {
  indent?: any;
  index?: any;
  format?: any;
}

export function generateRoot(node: Script | Module, cb: any, context: Context, _options?: Options): string {
  const state = createState();
  let result = '';

  for (let i = 0; i < node.leafs.length; i++) {
    result += cb(node.leafs[i], state, context);
  }
  return result;
}

/**
 * Generate a script, optionally with various options.
 */
export function generateScript(node: Script, options?: Options): string {
  return generateRoot(node, writeStatements, Context.None, options);
}

/**
 * Generate a module, optionally with various options.
 */
export function generateModule(node: Module, options?: Options): string {
  return generateRoot(node, writeModuleItem, Context.None, options);
}
