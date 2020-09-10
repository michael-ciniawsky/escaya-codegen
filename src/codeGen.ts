import { CodeGenState, Context, Precedence, stringRepeat } from './common';

export function createState(): CodeGenState {
  return {
    base: stringRepeat('    ', 0),
    indentLevel: 0,
    indent: '    ',
    indentSize: 2,
    lineEnd: '\n'
  };
}

// Expression :
//   AssignmentExpression
//   Expression `,` AssignmentExpression
export function writeExpressions(node: any, state: CodeGenState, context: Context, prec: Precedence): string {
  let result = '';

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
    case 'ArrayBindingPattern': {
      const indent = state.indent.repeat(state.indentLevel++);
      result = '[';

      const elements = node.elements;

      if (elements.length > 0) {
        result += state.lineEnd + indent + state.indent + writeExpressions(elements[0], state, context, prec);
        for (let i = 1; i < elements.length; i++) {
          result += ',' + state.lineEnd + indent + state.indent + writeExpressions(elements[i], state, context, prec);
        }
        result += state.lineEnd + indent + ']';
      } else {
        result += indent + ']';
      }

      state.indentLevel--;

      break;
    }

    case 'Elison':
      result += ',';
      break;

    case 'ParenthesizedExpression':
      result += '(' + writeExpressions(node.expression, state, context, Precedence.Assignment) + ')';
      break;

    case 'ObjectBindingPattern':
    case 'ObjectAssignmentPattern':
    case 'ObjectLiteral':
      const indent = state.indent.repeat(state.indentLevel++);

      result += '{';
      const properties = node.properties;
      if (properties.length > 0) {
        result += state.lineEnd + indent + state.indent + writeExpressions(properties[0], state, context, prec);
        for (let i = 1; i < properties.length; i++) {
          result += ',' + state.lineEnd + indent + state.indent + writeExpressions(properties[i], state, context, prec);
        }
        result += state.lineEnd + indent + '}';
      } else {
        result += indent + '}';
      }

      break;

    case 'PropertyName':
      result +=
        writeExpressions(node.key, state, context, Precedence.Call) +
        ' : ' +
        writeExpressions(node.value, state, context, Precedence.Assignment);
      break;

    case 'ClassElement':
      if (node.static) result += 'static ';
      result += writeExpressions(node.method, state, context, prec);
      break;

    case 'ClassExpression':
      result += 'class ' + (node.name ? `${node.name.name} ` : '');
      if (node.heritage) {
        result += 'extends ';
        result += writeExpressions(node.heritage, state, context, prec);
      }
      result += '{';
      const elements = node.elements;
      if (elements.length > 0) {
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          result += writeExpressions(element, state, context, prec);
        }
      }
      result += '}';
      break;

    case 'ComputedPropertyName':
      result = `[${writeExpressions(node.expression, state, context, prec)}]`;
      break;

    case 'ImportCall':
      result = 'import(' + writeExpressions(node.import, state, context, prec) + ')';
      break;

    case 'TaggedTemplate':
      result =
        writeExpressions(node.member, state, context, prec) +
        '`' +
        writeExpressions(node.literal, state, context, prec) +
        '`';
      break;

    case 'TemplateLiteral':
      result = '`' + node.value + '`';
      break;

    case 'TemplateElement':
      result += node.value;
      if (node.expression !== null) {
        result += '${' + writeExpressions(node.expression, state, context, prec) + '}`';
      }
      break;

    case 'TemplateExpression':
      result = '`';
      for (let i = 0; i < node.elements.length; i++) {
        result += writeExpressions(node.elements[i], state, context, prec);
      }
      break;

    case 'MethodDefinition':
      if (node.async) result += 'async ';
      if (node.getter) {
        result += 'get () ';
      } else if (node.setter) {
        result +=
          'set ' +
          writeExpressions(node.name, state, context, prec) +
          '(' +
          writeExpressions(node.propertySetParameterList, state, context, prec) +
          ')';
      } else {
        if (node.generator) result += '*';
        result += writeExpressions(node.name, state, context, prec) + '()';
      }
      result += writeExpressions(node.contents, state, context, prec);
      break;

    case 'SuperCall':
      result += `super(`;
      if (node.arguments != null && node.arguments.length > 0) {
        result += writeExpressions(node.arguments[0], state, context, Precedence.Assignment);
        const args = node.arguments;
        for (let i = 1; i < args.length; i++) {
          result += ', ' + writeExpressions(args[i], state, context, Precedence.Assignment);
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
  switch (node.type) {
    case 'FunctionDeclaration':
      result +=
        (node.async ? 'async ' : '') +
        (node.generator ? 'function* ' : 'function ') +
        (node.name ? node.name.name : '');
      result += '(';

      const params = node.params;

      if (params.length > 0) {
        result += writeExpressions(params[0], state, context, Precedence.Postfix);
        for (let i = 1; i < params.length; i++) {
          result += ',' + writeExpressions(params[i], state, context, Precedence.Postfix);
        }
      }
      result += ') ';

      result += writeExpressions(node.contents, state, context, Precedence.Postfix);

      break;

    case 'ClassDeclaration':
      result += 'class ' + (node.name ? `${node.name.name} ` : '');
      if (node.heritage) {
        result += 'extends ';
        result += writeExpressions(node.heritage, state, context, Precedence.Assignment);
      }
      result += '{';
      const elements = node.elements;
      if (elements != null && elements.length > 0) {
        const { length } = elements;
        for (let i = 0; i < length; i++) {
          const element = elements[i];
          result += writeExpressions(element, state, context, Precedence.Assignment);
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
      const indent = state.indent.repeat(state.indentLevel++);
      const statementIndent = indent + state.indent;
      result = '{';
      const statements = node.leafs;
      if (statements != null && statements.length > 0) {
        result += state.lineEnd;
        const { length } = statements;
        for (let i = 0; i < length; i++) {
          result += statementIndent + writeStatements(statements[i], state, context) + state.lineEnd;
        }
        result += indent;
      }
      result += '}';
      state.indentLevel--;
      break;

    case 'BreakStatement':
      result = node.label ? 'break ' + node.label.name + ';' : 'break;';
      break;

    case 'ContinueStatement':
      result = node.label ? 'continue ' + node.label.name + ';' : 'continue;';
      break;

    case 'SwitchStatement': {
      const t = state.indent;
      const indent = state.indent.repeat(state.indentLevel++);
      state.indent = t;
      state.indentLevel++;
      result += 'switch (' + writeStatements(node.expression, state, context) + ') {' + state.lineEnd;
      const clauses = node.clauses;
      for (let i = 0; i < clauses.length; i++) {
        result += writeStatements(node.clauses[i], state, context) + state.lineEnd;
      }
      state.indent = t;
      state.indentLevel -= 2;
      result += indent + '}';

      break;
    }

    case 'CaseClause': {
      const caseIndent = state.indent;
      result += caseIndent + 'case';

      result += ' ' + writeStatements(node.expression, state, context) + ':' + state.lineEnd;
      const leafs = node.leafs;
      for (let i = 0; i < leafs.length; i++) {
        result += state.indent + writeStatements(node.leafs[i], state, context) + state.lineEnd;
      }
      break;
    }
    case 'DefaultClause': {
      const caseIndent = state.indent;

      result += caseIndent + 'default:' + state.lineEnd;
      const leafs = node.leafs;
      for (let i = 0; i < leafs.length; i++) {
        result += state.indent + writeStatements(node.leafs[i], state, context) + state.lineEnd;
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

      result += writeStatements(node.initializer, state, context);
      result += ' in ' + writeExpressions(node.expression, state, context, Precedence.Assignment) + ')';

      result += maybeBlock(node.statement, state, context, false);
      break;

    case 'ForOfStatement':
      result += `for ${node.await ? 'await ' : ''}(`;
      result += writeStatements(node.initializer, state, context);
      result += ' of ' + writeExpressions(node.expression, state, context, Precedence.Assignment) + ')';
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
        result += state.lineEnd;
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
      result = 'while (' + writeExpressions(node.expression, state, context, Precedence.Assignment) + ')';
      result += maybeBlock(node.statement, state, context, false);
      break;

    case 'WithStatement':
      result = 'with (' + writeExpressions(node.expression, state, context, Precedence.Assignment) + ')';
      result += maybeBlock(node.statement, state, context, false);
      break;

    case 'LexicalBinding':
      result += writeExpressions(node.binding, state, context, Precedence.Assignment);
      if (node.initializer !== null) {
        result += ' = ';
        result += writeExpressions(node.initializer, state, context, Precedence.Assignment);
      }
      break;

    case 'VariableStatement':
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

// ModuleItemList :
//   ModuleItem
//   ModuleItemListModuleItem
export function writeModuleItem(node: any, state: any, context: Context): string {
  let result = '';
  switch (node.type) {
    default:
      result += writeStatements(node, state, context);
  }
  return result;
}

function maybeBlock(stmt: any, state: any, context: any, suffix: any): any {
  let result;

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

  result = state.lineEnd + writeStatements(stmt, state, context);

  if (suffix) {
    return result + state.lineEnd + '';
  }
  return result;
}
