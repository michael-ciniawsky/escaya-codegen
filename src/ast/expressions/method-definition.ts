import { DictionaryMap } from './../../dictionary/dictionary-map';
export function writeMethodDefinition(node: any, state: any): void {
  if (node.async) state.source += 'async ';
  if (node.getter) {
    state.source += 'get () ';
  } else if (node.setter) {
    state.source += 'set ';
    DictionaryMap[node.name.type](node.name, state);
    state.source += '(';
    DictionaryMap[node.propertySetParameterList.type](node.propertySetParameterList, state);
    state.source += ') ';
  } else {
    if (node.generator) state.source += '*';
    DictionaryMap[node.name.type](node.name, state);
    state.source += ' (';
    state.source += ')';
  }

  DictionaryMap[node.contents.type](node.contents, state);
}
