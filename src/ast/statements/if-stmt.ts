import { DictionaryMap } from '../../dictionary/dictionary-map';
import { Context } from '../../common';
export function writeIfStatement(node: any, state: any, context: Context): void {
  // TODO: This need
  //
  // - 'if(a){for(a in a)if(a);}else;'
  //
  // For this case need to pass a
  // context masks with a 'InBlock' bit. If in block 'ASI' kicks in.
  //
  // If 'InBlock' bit not set we should check for a 'ForStatement' bit and
  // if it exist we should do '; if (";" ' instead of what we do now.
  //
  // OTHER CASES:
  //
  // - if (foo) a; if (bar) b; else c;
  // - if (x) y(); else z()
  // - if (true) that(); else;

  state.source += 'if (';
  DictionaryMap[node.expression.type](node.expression, state, context);
  state.source += ') ';
  DictionaryMap[node.consequent.type](node.consequent, state, context);
  // state.source += ';';
  if (node.alternate != null) {
    state.source += ' else ';
    DictionaryMap[node.alternate.type](node.alternate, state, context);
  }
}
