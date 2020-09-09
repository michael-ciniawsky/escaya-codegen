import { DictionaryMap } from './../../dictionary/dictionary-map';
export function writeClassDeclaration(node: any, state: any): void {
  state.source += 'class ' + (node.name ? `${node.name.name} ` : '');

  if (node.superClass) {
    state.source += 'extends ';
    DictionaryMap[node.heritage.type](node.heritage, state);
  }

  state.source += '{';
  const statements = node.elements;
  if (statements != null && statements.length > 0) {
    const { length } = statements;
    for (let i = 0; i < length; i++) {
      const statement = statements[i];
      DictionaryMap[statement.type](statement, state);
    }
  }
  state.source += '}';
}
