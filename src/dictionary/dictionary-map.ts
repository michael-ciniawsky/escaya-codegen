import { writeScript } from '../ast/script';
import { writeModule } from '../ast/module';
import { writeThisExpression } from '../ast/expressions/this-expr';
import { writeExpressionStatement } from '../ast/statements/expression-stmt';
import { writeWhileStatement } from '../ast/statements/while-stmt';
import { writeDoWhileStatement } from '../ast/statements/do-stmt';
import { writeIfStatement } from '../ast/statements/if-stmt';
import { writeCommaOperator } from '../ast/expressions/commaOperator';
import { writeMemberExpression } from '../ast/expressions/member-expr';
import { writeCallExpression } from '../ast/expressions/call-expr';
import { writeIdentifierReference } from '../ast/expressions/identifierReference';
import { writeOptionaExpression } from '../ast/expressions/optional-expr';
import { writeOptionalChain } from '../ast/expressions/optional-chain';
import { writeFunctionExpression } from '../ast/expressions/function-expr';
import { writeFunctionDeclaration } from '../ast/declarations/function-declaration';
import { writeForBinding } from '../ast/statements/for-binding';
import { writeBindingElement } from '../ast/expressions/binding-element';
import { writeArrayBindingPattern } from '../ast/expressions/array-binding-pattern';
import { writeClassElement } from '../ast/expressions/class-element';
import { writeClassExpression } from '../ast/expressions/class-expr';
import { writeClassDeclaration } from '../ast/declarations/class-declaration';
import { writeForInStatement } from '../ast/statements/for-in-stmt';
import { writeForOfStatement } from '../ast/statements/for-of-stmt';
import { writeForStatement } from '../ast/statements/for-stmt';
import { writeArrayLiteral } from '../ast/expressions/array-literal';
import { writeBindingRestElement } from '../ast/expressions/binding-rest-element';
import { writeSuperCall } from '../ast/expressions/super-call';
import { writeSuperProperty } from '../ast/expressions/super-property';
import { writeSpreadElement } from '../ast/expressions/spread-element';
import { writeSpreadProperty } from '../ast/expressions/spread-property';
import { writeConciseBody } from '../ast/expressions/concise-body';
import { writeArrowFunction } from '../ast/expressions/arrow-function';
import { writeMethodDefinition } from '../ast/expressions/method-definition';
import { writeElison } from '../ast/expressions/elison';
import { writeFunctionBody } from '../ast/expressions/function-body';
import { writeObjectLiteral } from '../ast/expressions/object-literal';
import { writeMemberChainExpression } from '../ast/expressions/member-chain-expr';
import { writeNullLiteral } from '../ast/expressions/null-literal';
import { writeBooleanLiteral } from '../ast/expressions/boolean-literal';
import { writeCallChain } from '../ast/expressions/call-chain';
import { writeNewExpression } from '../ast/expressions/new-expr';
import { writeIdentifierName } from '../ast/expressions/identifierName';
import { writeBindingIdentifier } from '../ast/expressions/binding-identifier';
import { writeBindingRestProperty } from '../ast/expressions/binding-rest-property';
import { writeAssignmentExpression } from '../ast/expressions/assignment-expr';
import { writeUnaryExpression } from '../ast/expressions/unary-expr';
import { writeBlockStatement } from '../ast/statements/block-stmt';
import { writeEmptyStatement } from '../ast/statements/empty-stmt';
import { writeDebuggerStatement } from '../ast/statements/debugger-stmt';
import { writeReturnStatement } from '../ast/statements/return-stmt';
import { writeBreakStatement } from '../ast/statements/break-stmt';
import { writeContinueStatement } from '../ast/statements/continue-stmt';
import { writeLabelledStatement } from '../ast/statements/labelled';
import { writeWithStatement } from '../ast/statements/with-stmt';
import { writeThrowStatement } from '../ast/statements/throw-stmt';
import { writeConditionalExpression } from '../ast/expressions/conditional-expr';
import { writeBinaryExpression } from '../ast/expressions/binary-expr';
import { writeLexicalBinding } from '../ast/statements/lexical-binding';
import { writeLexicalDeclaration } from '../ast/declarations/lexical-declaration';
import { writeVariableStatement } from '../ast/statements/variable-stmt';
import { writeVariableDeclaration } from '../ast/declarations/variable-declaration';
import { writeSwitchStatement } from '../ast/statements/switch-stmt';
import { writeNumericLiteral } from '../ast/expressions/numeric-literal';
import { writeBigintLiteral } from '../ast/expressions/bigin-literal';
import { writeStringLiteral } from '../ast/expressions/string-literal';
import { writeCoverInitializedName } from '../ast/expressions/cover-initialized-name';
import { writeParenthesizedExpression } from '../ast/expressions/parenthesized-expr';
import { writePrefixUpdateExpression } from '../ast/expressions/prefix-update-expr';
import { writePostixUpdateExpression } from '../ast/expressions/postfix-update-expr';
import { writeTryStatement } from '../ast/statements/try-stmt';
import { writeCatchClause } from '../ast/statements/catch-clause';
import { writeAssignmentRestElement } from '../ast/expressions/assignment-rest-element';
import { writeObjectBindingPattern } from '../ast/expressions/object-binding-pattern';
import { writeRegularExpression } from '../ast/expressions/regular-expression';
import { writeCaseClause } from '../ast/statements/case-clause';
import { writeDefaultClause } from '../ast/statements/default-clause';
import { writeComputedPropertyName } from '../ast/expressions/computed-property-name';
import { writeLabelledIdentifier } from '../ast/expressions/labelledIdentifier';
import { writeAwaitExpression } from '../ast/expressions/await-expr';
import { writeYieldExpression } from '../ast/expressions/yield-expr';
import { writeNewTargetExpression } from '../ast/expressions/new-target';
import { writeAssignmentElement } from '../ast/expressions/assignment-element';
import { writeArrayAssignmentPattern } from '../ast/expressions/array-assignment-pattern';
import { writeImportDeclaration } from '../ast/module/import-declaration';
import { writeNamedImport } from '../ast/module/named-import';
import { writeImportClause } from '../ast/module/import-clause';
import { writeImportSpecifier } from '../ast/module/import-specifier';
import { writeExportDeclaration } from '../ast/module/export-declaration';
import { writeExportDefault } from '../ast/module/export-default';
import { writeExportSpecifier } from '../ast/module/export-specifier';
import { writeSemicolon } from '../ast/expressions/semicolon';
import { writeTemplateElement } from '../ast/expressions/template-element';
import { writeTemplateExpression } from '../ast/expressions/template-expression';
import { writeTemplateLiteral } from '../ast/expressions/template-literal';
import { writeTaggedTemplate } from '../ast/expressions/tagged-tamplate';
import { writePropertyName } from '../ast/expressions/property-name';
import { writeObjectAssignmentPattern } from '../ast/expressions/object-assignment-pattern';
import { writeImportCall } from '../ast/expressions/import-call';
import { writeImportMeta } from '../ast/expressions/import-meta';
//import { writeDirective } from '../ast/directive-node';
import { writeAssignmentRestProperty } from '../ast/expressions/assignment-rest-property';
import { Context } from '../common';

export type Dictionary = { [key: string]: any };

export const DictionaryMap: Dictionary = {
  Script: (node: any, state: any, context: Context) => writeScript(node, state, context),
  Module: (node: any, state: any, context: Context) => writeModule(node, state, context),
  ThisExpression: (node: any, state: any, context: Context) => writeThisExpression(node, state, context),
  ExpressionStatement: (node: any, state: any, context: Context) => writeExpressionStatement(node, state, context),
  ExpressiontStatement: (node: any, state: any, context: Context) => writeExpressionStatement(node, state, context),
  Target: (node: any, state: any, context: Context) => writeNewTargetExpression(node, state, context),
  Semicolon: (node: any, state: any, context: Context) => writeSemicolon(node, state, context),
  ArrayAssignmentPattern: (node: any, state: any, context: Context) =>
    writeArrayAssignmentPattern(node, state, context),
  AssignmentElement: (node: any, state: any, context: Context) => writeAssignmentElement(node, state, context),
  NumericLiteral: (node: any, state: any, context: Context) => writeNumericLiteral(node, state, context),
  BigInt: (node: any, state: any, context: Context) => writeBigintLiteral(node, state, context),
  AwaitExpression: (node: any, state: any, context: Context) => writeAwaitExpression(node, state, context),
  YieldExpression: (node: any, state: any, context: Context) => writeYieldExpression(node, state, context),
  LabelIdentifier: (node: any, state: any, context: Context) => writeLabelledIdentifier(node, state, context),
  ComputedPropertyName: (node: any, state: any, context: Context) => writeComputedPropertyName(node, state, context),
  StringLiteral: (node: any, state: any, context: Context) => writeStringLiteral(node, state, context),
  ArrowFunction: (node: any, state: any, context: Context) => writeArrowFunction(node, state, context),
  DefaultClause: (node: any, state: any, context: Context) => writeDefaultClause(node, state, context),
  SwitchStatement: (node: any, state: any, context: Context) => writeSwitchStatement(node, state, context),
  WhileStatement: (node: any, state: any, context: Context) => writeWhileStatement(node, state, context),
  DoWhileStatement: (node: any, state: any, context: Context) => writeDoWhileStatement(node, state, context),
  IfStatement: (node: any, state: any, context: Context) => writeIfStatement(node, state, context),
  CommaOperator: (node: any, state: any, context: Context) => writeCommaOperator(node, state, context),
  RegularExpressionLiteral: (node: any, state: any, context: Context) => writeRegularExpression(node, state, context),
  MemberExpression: (node: any, state: any, context: Context) => writeMemberExpression(node, state, context),
  CallExpression: (node: any, state: any, context: Context) => writeCallExpression(node, state, context),
  IdentifierReference: (node: any, state: any, context: Context) => writeIdentifierReference(node, state, context),
  OptionalExpression: (node: any, state: any, context: Context) => writeOptionaExpression(node, state, context),
  OptionalChain: (node: any, state: any, context: Context) => writeOptionalChain(node, state, context),
  AssignmentRestElement: (node: any, state: any, context: Context) => writeAssignmentRestElement(node, state, context),
  AssignmentRestProperty: (node: any, state: any, context: Context) =>
    writeAssignmentRestProperty(node, state, context),
  ObjectBindingPattern: (node: any, state: any, context: Context) => writeObjectBindingPattern(node, state, context),
  FunctionExpression: (node: any, state: any, context: Context) => writeFunctionExpression(node, state, context),
  FunctionDeclaration: (node: any, state: any, context: Context) => writeFunctionDeclaration(node, state, context),
  ForBinding: (node: any, state: any, context: Context) => writeForBinding(node, state, context),
  BindingElement: (node: any, state: any, context: Context) => writeBindingElement(node, state, context),
  ArrayBindingPattern: (node: any, state: any, context: Context) => writeArrayBindingPattern(node, state, context),
  ClassElement: (node: any, state: any, context: Context) => writeClassElement(node, state, context),
  ClassExpression: (node: any, state: any, context: Context) => writeClassExpression(node, state, context),
  ClassDeclaration: (node: any, state: any, context: Context) => writeClassDeclaration(node, state, context),
  ForInStatement: (node: any, state: any, context: Context) => writeForInStatement(node, state, context),
  ForStatement: (node: any, state: any, context: Context) => writeForStatement(node, state, context),
  ParenthesizedExpression: (node: any, state: any, context: Context) =>
    writeParenthesizedExpression(node, state, context),
  ArrayLiteral: (node: any, state: any, context: Context) => writeArrayLiteral(node, state, context),
  BindingRestElement: (node: any, state: any, context: Context) => writeBindingRestElement(node, state, context),
  SuperCall: (node: any, state: any, context: Context) => writeSuperCall(node, state, context),
  SuperProperty: (node: any, state: any, context: Context) => writeSuperProperty(node, state, context),
  SpreadElement: (node: any, state: any, context: Context) => writeSpreadElement(node, state, context),
  SpreadProperty: (node: any, state: any, context: Context) => writeSpreadProperty(node, state, context),
  ConciseBody: (node: any, state: any, context: Context) => writeConciseBody(node, state, context),
  MethodDefinition: (node: any, state: any, context: Context) => writeMethodDefinition(node, state, context),
  Elison: (node: any, state: any, context: Context) => writeElison(node, state, context),
  FunctionBody: (node: any, state: any, context: Context) => writeFunctionBody(node, state, context),
  CoverInitializedName: (node: any, state: any, context: Context) => writeCoverInitializedName(node, state, context),
  ObjectLiteral: (node: any, state: any, context: Context) => writeObjectLiteral(node, state, context),
  MemberChain: (node: any, state: any, context: Context) => writeMemberChainExpression(node, state, context),
  NullLiteral: (node: any, state: any, context: Context) => writeNullLiteral(node, state, context),
  BooleanLiteral: (node: any, state: any, context: Context) => writeBooleanLiteral(node, state, context),
  CallChain: (node: any, state: any, context: Context) => writeCallChain(node, state, context),
  NewExpression: (node: any, state: any, context: Context) => writeNewExpression(node, state, context),
  IdentifierName: (node: any, state: any, context: Context) => writeIdentifierName(node, state, context),
  BindingIdentifier: (node: any, state: any, context: Context) => writeBindingIdentifier(node, state, context),
  BindingRestProperty: (node: any, state: any, context: Context) => writeBindingRestProperty(node, state, context),
  AssignmentExpression: (node: any, state: any, context: Context) => writeAssignmentExpression(node, state, context),
  UnaryExpression: (node: any, state: any, context: Context) => writeUnaryExpression(node, state, context),
  PrefixUpdateExpression: (node: any, state: any, context: Context) =>
    writePrefixUpdateExpression(node, state, context),
  PostfixUpdateExpression: (node: any, state: any, context: Context) =>
    writePostixUpdateExpression(node, state, context),
  BlockStatement: (node: any, state: any, context: Context) => writeBlockStatement(node, state, context),
  EmptyStatement: (node: any, state: any, context: Context) => writeEmptyStatement(node, state, context),
  DebuggerStatement: (node: any, state: any, context: Context) => writeDebuggerStatement(node, state, context),
  ReturnStatement: (node: any, state: any, context: Context) => writeReturnStatement(node, state, context),
  BreakStatement: (node: any, state: any, context: Context) => writeBreakStatement(node, state, context),
  ContinueStatement: (node: any, state: any, context: Context) => writeContinueStatement(node, state, context),
  LabelledStatement: (node: any, state: any, context: Context) => writeLabelledStatement(node, state, context),
  WithStatement: (node: any, state: any, context: Context) => writeWithStatement(node, state, context),
  ThrowStatement: (node: any, state: any, context: Context) => writeThrowStatement(node, state, context),
  TryStatement: (node: any, state: any, context: Context) => writeTryStatement(node, state, context),
  CatchClause: (node: any, state: any, context: Context) => writeCatchClause(node, state, context),
  ConditionalExpression: (node: any, state: any, context: Context) => writeConditionalExpression(node, state, context),
  BinaryExpression: (node: any, state: any, context: Context) => writeBinaryExpression(node, state, context),
  LexicalBinding: (node: any, state: any, context: Context) => writeLexicalBinding(node, state, context),
  LexicalDeclaration: (node: any, state: any, context: Context) => writeLexicalDeclaration(node, state, context),
  VariableStatement: (node: any, state: any, context: Context) => writeVariableStatement(node, state, context),
  VariableDeclaration: (node: any, state: any, context: Context) => writeVariableDeclaration(node, state, context),
  CaseClause: (node: any, state: any, context: Context) => writeCaseClause(node, state, context),
  PropertyName: (node: any, state: any, context: Context) => writePropertyName(node, state, context),
  ObjectAssignmentPattern: (node: any, state: any, context: Context) =>
    writeObjectAssignmentPattern(node, state, context),
  ImportCall: (node: any, state: any, context: Context) => writeImportCall(node, state, context),
  ImportMeta: (node: any, state: any, context: Context) => writeImportMeta(node, state, context),
  ForOfStatement: (node: any, state: any, context: Context) => writeForOfStatement(node, state, context),
  ImportDeclaration: (node: any) => writeImportDeclaration(node),
  ImportClause: (node: any) => writeImportClause(node),
  ImportSpecifier: (node: any) => writeImportSpecifier(node),
  NamedImports: (node: any) => writeNamedImport(node),
  ExportDeclaration: (node: any) => writeExportDeclaration(node),
  ExportDefault: (node: any) => writeExportDefault(node),
  ExportSpecifier: (node: any) => writeExportSpecifier(node),
  TemplateElement: (node: any, state: any, context: Context) => writeTemplateElement(node, state, context),
  TemplateExpression: (node: any, state: any, context: Context) => writeTemplateExpression(node, state, context),
  TemplateLiteral: (node: any, state: any, context: Context) => writeTemplateLiteral(node, state, context),
  TaggedTemplate: (node: any, state: any, context: Context) => writeTaggedTemplate(node, state, context)
};
