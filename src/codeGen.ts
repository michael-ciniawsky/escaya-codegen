import { CodeGenState, Context, Precedence, stringRepeat } from './common';

export function createState(): CodeGenState {
  return {
    base: stringRepeat('    ', 0),
    currentIndent: 0,
    indent: '    ',
    indentSize: 2
  };
}

// TODO: Fix this
function addIndent(_state: any, str: any): any {
  return str;
}

// Expression :
//   AssignmentExpression
//   Expression `,` AssignmentExpression
export function writeExpressions(node: any, state: CodeGenState, context: Context, prec: Precedence): string {
  let result = '';
  let previousBase;

  switch (node.type) {
    case 'CommaOperator':
      result += writeExpressions(node.expressions[0], state, context, Precedence.Assignment);
      for (let i = 1; i < node.expressions.length; i++) {
        result += ', ' + writeExpressions(node.expressions[i], state, context, Precedence.Assignment);
      }
      break;
    case 'AssignmentExpression':
      result +=
        writeExpressions(node.left, state, context, Precedence.Call) +
        ' ' +
        node.operator +
        ' ' +
        writeExpressions(node.right, state, context, Precedence.Assignment);
      break;
    case 'BindingElement':
      result += writeExpressions(node.left, state, context, Precedence.Call);
      if (node.right) result += ' = ' + writeExpressions(node.right, state, context, Precedence.Assignment);
      break;
    case 'AssignmentElement':
      result +=
        writeExpressions(node.left, state, context, Precedence.Call) +
        ' = ' +
        writeExpressions(node.right, state, context, Precedence.Assignment);
      break;
    case 'AssignmentPattern':
      result +=
        writeExpressions(node.left, state, context, Precedence.Call) +
        ' = ' +
        writeExpressions(node.right, state, context, Precedence.Assignment);
      break;

    case 'ConditionalExpression':
      result =
        writeExpressions(node.shortCircuit, state, context, Precedence.LogicalOR) +
        ' ? ' +
        writeExpressions(node.consequent, state, context, Precedence.Assignment) +
        ' : ' +
        writeExpressions(node.alternate, state, context, Precedence.Assignment);
      break;
    case 'BinaryExpression':
      result =
        writeExpressions(node.left, state, context, prec) +
        ' ' +
        node.operator +
        ' ' +
        writeExpressions(node.right, state, context, prec + 1);
      if (node.operator === 'in') {
        result = '(' + result + ')';
      }
      break;
    case 'NewExpression':
      result += 'new ';
    case 'CallExpression':
      result += writeExpressions(node.expression, state, context, Precedence.Assignment) + '(';
      if (node.arguments != null && node.arguments.length > 0) {
        result += writeExpressions(node.arguments[0], state, context, Precedence.Assignment);
        const { length } = node.arguments;
        for (let i = 1; i < length; i++) {
          const param = node.arguments[i];
          result += ', ';
          result += writeExpressions(param, state, context, Precedence.Assignment);
        }
      }
      result += ')';
      break;
    case 'MemberExpression':
      result = writeExpressions(node.member, state, context, Precedence.Call);
      if (node.computed) {
        result += '[' + writeExpressions(node.member, state, context, prec) + ']';
      } else {
        if (node.member.floatingPoint) {
          if (result.indexOf('.') < 0) result += '.';
        }
        result += '.' + node.expression.name;
      }
      break;

    case 'UnaryExpression':
      result += node.operator + ' ' + writeExpressions(node.operand, state, context, Precedence.Unary);
      break;

    case 'ArrowFunction':
      result = node.async ? 'async ' : '';
      const { params } = node;

      if (params !== null) {
        result += '(';
        if (node.params != null && node.params.length > 0) {
          result += writeExpressions(node.params[0], state, context, Precedence.Unary);
          const { length } = node.params;
          for (let i = 1; i < length; i++) {
            const param = node.params[i];
            result += ', ';
            result += writeExpressions(param, state, context, Precedence.Unary);
          }
        }
        result += ')';
      }
      result += ' => ';
      result += writeExpressions(node.contents, state, context, Precedence.Unary);
      break;

    case 'ConciseBody':
      result += writeExpressions(node.expression, state, context, Precedence.Unary);
      break;

    case 'AwaitExpression':
      result += `await`;
      result += ' ' + writeExpressions(node.expression, state, context, Precedence.Unary);
      break;

    case 'AssignmentRestElement':
    case 'AssignmentRestProperty':
    case 'BindingRestElement':
    case 'BindingRestProperty':
      result += '...' + writeExpressions(node.argument, state, context, Precedence.Unary);
      break;

    case 'PostfixUpdateExpression':
      result = node.operator + writeExpressions(node.operand, state, context, Precedence.Unary);
      break;
    case 'PrefixUpdateExpression':
      result = writeExpressions(node.operand, state, context, Precedence.Postfix) + node.operator;
      break;

    case 'FunctionExpression':
      result +=
        (node.async ? 'async ' : '') +
        (node.generator ? 'function* ' : 'function ') +
        (node.name !== null ? node.name.name : '');
      result += '(';

      if (node.params.length > 0) {
        const { params } = node,
          { length } = params;
        for (let i = 0; ; ) {
          const element = params[i];
          if (element != null) {
            result += writeExpressions(element, state, context, Precedence.Postfix);
          }
          if (++i < length) {
            result += ', ';
          } else {
            if (element == null) {
              result += ', ';
            }
            break;
          }
        }
      }
      result += ')';

      result += writeExpressions(node.contents, state, context, Precedence.Postfix);

      break;

    case 'ArrayLiteral':
    case 'ArrayAssignmentPattern':
    case 'ArrayBindingPattern':
      result = '[';
      if (node.elements.length > 0) {
        result += '\n';
        previousBase = state.base;
        state.base = state.base;
        let i, len;
        for (i = 0, len = node.elements.length; i < len; i += 1) {
          result += addIndent(state, ' ');
          result += writeExpressions(node.elements[i], state, context, Precedence.Assignment);

          if (i + 1 < len) result += ',\n';
        }
        state.base = previousBase;
        result += '\n';
      }
      result += ']';
      break;
    case 'Elison':
      result += ',';
      break;
    case 'ParenthesizedExpression':
      result += '(' + writeExpressions(node.expression, state, context, Precedence.Assignment) + ')';
      break;

    case 'ObjectLiteral':
      result += '{';
      previousBase = state.base;
      state.base += state.indent;
      if (node.properties.length > 0) {
        result += '\n';
        let i, len;
        for (i = 0, len = node.properties.length; i < len; i += 1) {
          result += addIndent(state, writeExpressions(node.properties[i], state, context, prec));
          if (i + 1 < len) result += ',\n';
        }

        state.base = previousBase;
        result += '\n';
      }

      result += addIndent(state, '}');

      break;

    case 'PropertyName':
      result +=
        writeExpressions(node.key, state, context, Precedence.Call) +
        ' : ' +
        writeExpressions(node.value, state, context, Precedence.Assignment);
      break;

    case 'ClassElement':
      if (node.static) result += 'static ';
      result += addIndent(state, writeExpressions(node.method, state, context, prec));
      break;

    case 'ClassExpression':
      result += 'class ' + (node.name ? `${node.name.name} ` : '');
      if (node.heritage) {
        result += 'extends ';
        result += addIndent(state, writeExpressions(node.heritage, state, context, prec));
      }
      result += '{';
      const elements = node.elements;
      if (elements != null && elements.length > 0) {
        const { length } = elements;
        for (let i = 0; i < length; i++) {
          const element = elements[i];
          result += addIndent(state, writeExpressions(element, state, context, prec));
        }
      }
      result += '}';
      break;

    case 'ComputedPropertyName':
      result = `[${writeExpressions(node.expression, state, context, prec)}]`;
      break;

    case 'ImportCall':
      result = ''; // TODO
      break;

    case 'MethodDefinition':
      if (node.async) result += 'async ';
      if (node.getter) {
        result += 'get () ';
      } else if (node.setter) {
        result += 'set ' + writeExpressions(node.name, state, context, prec) + '(';
        result += writeExpressions(node.propertySetParameterList, state, context, prec);
        result += ')';
      } else {
        if (node.generator) result += '*';

        result += writeExpressions(node.name, state, context, prec);
        result += '(';
        result += ')';
      }
      result += writeExpressions(node.contents, state, context, prec);
      break;

    case 'ObjectBindingPattern':
    case 'ObjectAssignmentPattern':
      result += `{`;
      if (node.properties.length > 0) {
        const { properties } = node,
          { length } = properties;
        for (let i = 0; ; ) {
          const property = properties[i];
          result += writeExpressions(property, state, context, prec);
          if (++i < length) {
            result += ', ';
          } else {
            break;
          }
        }
      }
      result += `}`;
      break;

    case 'SuperCall':
      result += `super(`;
      if (node.arguments != null && node.arguments.length > 0) {
        result += writeExpressions(node.arguments[0], state, context, Precedence.Assignment);
        const { length } = node.arguments;
        for (let i = 1; i < length; i++) {
          const param = node.arguments[i];
          result += ', ';
          result += writeExpressions(param, state, context, Precedence.Assignment);
        }
      }
      result += ')';
      break;

    case 'SuperProperty':
      result += `super`;
      if (node.computed) {
        result += '.' + writeExpressions(node.super, state, context, prec);
      } else {
        result += '[' + writeExpressions(node.super, state, context, prec) + ']';
      }
      break;

    case 'YieldExpression':
      result += node.delegate ? 'yield*' : 'yield';
      if (node.argument) {
        result += ' ' + writeExpressions(node.argument, state, context, prec);
      }
      break;

    case 'FunctionBody':
      const statements = node.leafs;
      result += '{';
      for (let i = 0; i < statements.length; i++) {
        result += writeStatements(statements[i], state, context);
      }

      result += '}';

      break;

    case 'RegularExpressionLiteral':
      result += `/${node.pattern}/${node.flag}`;
      break;

    case 'ThisExpression':
      result = 'this';
      break;

    case 'NullLiteral':
    case 'NumericLiteral':
    case 'BigIntLiteral':
    case 'StringLiteral':
    case 'BooleanLiteral':
      result += JSON.stringify(node.value);
      break;

    case 'IdentifierReference':
    case 'IdentifierName':
    case 'BindingIdentifier':
      result += node.name;
      break;
  }

  return result;
}

// StatementList :
//   StatementListItem
//   StatementList StatementListItem
//
// ModuleItemList :
//   ModuleItem
//   ModuleItemListModuleItem
//
// Statement ::
//   Block
//   VariableStatement
//   EmptyStatement
//   ExpressionStatement
//   IfStatement
//   IterationStatement
//   ContinueStatement
//   BreakStatement
//   ReturnStatement
//   WithStatement
//   LabelledStatement
//   SwitchStatement
//   ThrowStatement
//   TryStatement
//   DebuggerStatement
export function writeStatements(node: any, state: any, context: Context): string {
  let result = '';
  let previousBase;
  switch (node.type) {
    case 'FunctionDeclaration':
      result +=
        (node.async ? 'async ' : '') +
        (node.generator ? 'function* ' : 'function ') +
        (node.name ? node.name.name : '');
      result += '(';

      if (node.params.length > 0) {
        const { params } = node,
          { length } = params;
        for (let i = 0; ; ) {
          const element = params[i];
          if (element != null) {
            result += writeExpressions(element, state, context, Precedence.Postfix);
          }
          if (++i < length) {
            result += ', ';
          } else {
            if (element == null) {
              result += ', ';
            }
            break;
          }
        }
      }
      result += ') ';

      result += writeExpressions(node.contents, state, context, Precedence.Postfix);

      break;
    case 'ClassDeclaration':
      result += 'class ' + (node.name ? `${node.name.name} ` : '');
      if (node.heritage) {
        result += 'extends ';
        result += addIndent(state, writeExpressions(node.heritage, state, context, Precedence.Assignment));
      }
      result += '{';
      const elements = node.elements;
      if (elements != null && elements.length > 0) {
        const { length } = elements;
        for (let i = 0; i < length; i++) {
          const element = elements[i];
          result += addIndent(state, writeExpressions(element, state, context, Precedence.Assignment));
        }
      }
      result += '}';
      break;

    case 'LexicalDeclaration': {
      result += node.isConst ? ` const ` : ' let ';

      const { declarations } = node;
      const { length } = declarations;
      if (length > 0) {
        result += writeStatements(declarations[0], state, context);
        for (let i = 1; i < length; i++) {
          result += ', ';
          result += writeStatements(declarations[i], state, context);
        }
      }
      break;
    }
    case 'VariableDeclaration':
      result += writeExpressions(node.binding, state, context, Precedence.Assignment);
      if (node.initializer !== null) {
        result += '=';
        result += writeExpressions(node.initializer, state, context, Precedence.Assignment);
      }
      break;
    case 'BlockStatement':
      result = '{\n';

      previousBase = state.base;
      state.base += state.indent;
      let i, len;
      for (i = 0, len = node.leafs.length; i < len; i += 1) {
        result += addIndent(state, writeStatements(node.leafs[i], state, context)) + '\n';
      }
      state.base = previousBase;

      result += addIndent(state, '}');
      break;

    case 'BreakStatement':
      result = node.label ? 'break ' + node.label.name + ';' : 'break;';
      break;

    case 'ContinueStatement':
      result = node.label ? 'continue ' + node.label.name + ';' : 'continue;';
      break;

    case 'SwitchStatement':
      previousBase = state.base;
      state.base += state.indent;
      result += 'switch (' + writeStatements(node.expression, state, context) + ') {\n';
      state.base = previousBase;
      const clauses = node.clauses;
      for (let i = 0; i < clauses.length; i++) {
        result += addIndent(state, writeStatements(node.clauses[i], state, context)) + '\n';
      }
      result += addIndent(state, '}');
      break;

    case 'CaseClause':
      result += 'case';
      previousBase = state.base;
      state.base += state.indent;
      result += ' ' + writeStatements(node.expression, state, context);
      result += ':';
      const leafs = node.leafs;
      for (let i = 0; i < leafs.length; i++) {
        result += writeStatements(node.leafs[i], state, context);
      }
      break;

    case 'DefaultClause': {
      result += 'default:';
      const leafs = node.leafs;
      for (let i = 0; i < leafs.length; i++) {
        result += writeStatements(node.leafs[i], state, context);
      }
      break;
    }

    case 'DebuggerStatement':
      result = 'debugger;';
      break;

    case 'EmptyStatement':
      result = ';';
      break;

    case 'ForBinding':
      {
        result += 'var ';
        const { declarations } = node;
        const { length } = declarations;
        if (length > 0) {
          result += writeStatements(declarations[0], state, context);
          for (let i = 1; i < length; i++) {
            result += ', ';
            result += writeStatements(declarations[i], state, context);
          }
        }
      }
      break;

    case 'ForInStatement':
      result += `for (`;
      previousBase = state.base;
      state.base += state.indent;
      result += writeStatements(node.initializer, state, context);
      previousBase = state.base;
      state.base += state.indent;
      result += ' in ' + writeExpressions(node.expression, state, context, Precedence.Assignment) + ')';
      state.base = state.previousBase;
      result += maybeBlock(node.statement, state, context, false);
      break;

    case 'ForOfStatement':
      result += `for ${node.await ? 'await ' : ''}(`;
      previousBase = state.base;
      state.base += state.indent;
      result += writeStatements(node.initializer, state, context);
      previousBase = state.base;
      state.base += state.indent;
      result += ' of ' + writeExpressions(node.expression, state, context, Precedence.Assignment) + ')';
      state.base = state.previousBase;
      result += maybeBlock(node.statement, state, context, false);
      break;

    case 'ForStatement':
      result += ` for (`;
      if (node.variableDeclarationList) {
        result += 'var ';
        const { initializer } = node;
        const { length } = initializer;
        result += writeStatements(initializer[0], state, context);
        for (let i = 1; i < length; i++) {
          result += ', ';
          result += writeStatements(initializer[i], state, context);
        }
      } else if (node.initializer != null) {
        result += writeExpressions(node.initializer, state, context, Precedence.Assignment);
      }

      result += ';';
      if (node.test) {
        result += writeStatements(node.condition, state, context);
      }
      result += ';';
      if (node.incrementor) {
        result += writeStatements(node.incrementor, state, context);
      }
      result += ') ';
      result += writeStatements(node.statement, state, context);
      break;

    case 'IfStatement':
      result += ' if (';
      result += writeStatements(node.expression, state, context);
      result += ') ';
      result += writeStatements(node.consequent, state, context);
      if (node.alternate) {
        result += '\n';
        result += ' else ';
        result += writeStatements(node.alternate, state, context);
      }
      break;

    case 'LabelledStatement':
      result = node.label.name + ':' + maybeBlock(node.labelledItem, state, context, false);
      break;

    case 'ThrowStatement':
      result += 'throw';
      result += writeExpressions(node.expression, state, context, Precedence.Assignment) + ';';
      break;

    case 'TryStatement':
      result += 'try ';
      result += writeStatements(node.block, state, context);
      if (node.catchClause) {
        result += writeStatements(node.catchClause, state, context);
      }
      if (node.finalizer) {
        result += ' finally ';
        result += writeStatements(node.finalizer, state, context);
      }
      break;

    case 'CatchClause':
      result += 'catch';
      if (node.binding) {
        result += '(';
        result += writeStatements(node.binding, state, context);
        result += ')';
      }
      result += writeStatements(node.block, state, context);
      result += ';';
      break;

    case 'WhileStatement':
      previousBase = state.base;
      state.base += state.indent;
      result = 'while (' + writeExpressions(node.expression, state, context, Precedence.Assignment) + ')';
      state.base = previousBase;
      result += maybeBlock(node.statement, state, context, false);
      break;

    case 'WithStatement':
      previousBase = state.base;
      state.base += state.indent;
      result = 'with (' + writeExpressions(node.expression, state, context, Precedence.Assignment) + ')';
      state.base = previousBase;
      result += maybeBlock(node.statement, state, context, false);
      break;

    case 'LexicalBinding':
      previousBase = state.base;
      state.base += state.indent;
      result += writeExpressions(node.binding, state, context, Precedence.Assignment);
      if (node.initializer !== null) {
        result += ' = ';
        result += writeExpressions(node.initializer, state, context, Precedence.Assignment);
      }
      break;

    case 'VariableStatement':
      previousBase = state.base;
      state.base += state.indent;
      result += 'var ';
      const { declarations } = node;
      const { length } = declarations;
      if (length > 0) {
        result += writeStatements(declarations[0], state, context);
        for (let i = 1; i < length; i++) {
          result += ', ';
          result += writeStatements(declarations[i], state, context);
        }
        result += ';';
      }

      break;

    case 'DoWhileStatement':
      result =
        'do' +
        maybeBlock(node.statement, state, context, true) +
        'while (' +
        writeExpressions(node.expression, state, context, Precedence.Assignment) +
        ');';
      break;

    case 'ExpressionStatement':
      result = writeExpressions(node.expression, state, context, Precedence.Assignment) + ';';
      break;
    default:
      result = writeExpressions(node, state, context, Precedence.Assignment);
  }
  return result;
}

function maybeBlock(stmt: any, state: any, context: any, suffix: any): any {
  var previousBase, result;

  if (stmt.type === 'BlockStatement') {
    result = ' ' + writeStatements(stmt, state, context);
    if (suffix) {
      return result + ' ';
    }
    return result;
  }

  if (stmt.type === 'EmptyStatement') {
    return ';';
  }

  previousBase = state.base;
  state.base += state.indent;
  result = '\n' + addIndent(state, writeStatements(stmt, state, context));
  state.base = previousBase;

  if (suffix) {
    return result + '\n' + addIndent(state, '');
  }
  return result;
}

export function writeScript(node: any, state: any, context: Context): string {
  let result = '';
  result = '';
  let i = 0,
    len;
  if (node.leafs.length > 0) {
    for (i = 0, len = node.leafs.length; i < len; i += 1) {
      result += writeStatements(node.leafs[i], state, context);
      if (i + 1 < len) result += '\n';
    }
  }
  return result;
}
