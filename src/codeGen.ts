import { CodeGenState } from './common';

export function createState(): CodeGenState {
  return {
    source: '',
    index: 0,
    indentSize: 2,
    indent: '\t',
    lineEnd: '\n'
  };
}
