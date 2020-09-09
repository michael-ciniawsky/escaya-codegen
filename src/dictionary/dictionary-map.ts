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

export type Dictionary = { [key: string]: any };

export const DictionaryMap: Dictionary = {
  Script: (node: any, state: any) => writeScript(node, state),
  Module: (node: any, state: any) => writeModule(node, state),
  ThisExpression: (node: any, state: any) => writeThisExpression(node, state),
  ExpressionStatement: (node: any, state: any) => writeExpressionStatement(node, state),
  ExpressiontStatement: (node: any, state: any) => writeExpressionStatement(node, state),
  Target: (node: any, state: any) => writeNewTargetExpression(node, state),
  Semicolon: (node: any, state: any) => writeSemicolon(node, state),
  ArrayAssignmentPattern: (node: any, state: any) => writeArrayAssignmentPattern(node, state),
  AssignmentElement: (node: any, state: any) => writeAssignmentElement(node, state),
  NumericLiteral: (node: any, state: any) => writeNumericLiteral(node, state),
  BigInt: (node: any, state: any) => writeBigintLiteral(node, state),
  AwaitExpression: (node: any, state: any) => writeAwaitExpression(node, state),
  YieldExpression: (node: any, state: any) => writeYieldExpression(node, state),
  LabelIdentifier: (node: any, state: any) => writeLabelledIdentifier(node, state),
  ComputedPropertyName: (node: any, state: any) => writeComputedPropertyName(node, state),
  StringLiteral: (node: any, state: any) => writeStringLiteral(node, state),
  ArrowFunction: (node: any, state: any) => writeArrowFunction(node, state),
  DefaultClause: (node: any, state: any) => writeDefaultClause(node, state),
  SwitchStatement: (node: any, state: any) => writeSwitchStatement(node, state),
  WhileStatement: (node: any, state: any) => writeWhileStatement(node, state),
  DoWhileStatement: (node: any, state: any) => writeDoWhileStatement(node, state),
  IfStatement: (node: any, state: any) => writeIfStatement(node, state),
  CommaOperator: (node: any, state: any) => writeCommaOperator(node, state),
  RegularExpressionLiteral: (node: any, state: any) => writeRegularExpression(node, state),
  MemberExpression: (node: any, state: any) => writeMemberExpression(node, state),
  CallExpression: (node: any, state: any) => writeCallExpression(node, state),
  IdentifierReference: (node: any, state: any) => writeIdentifierReference(node, state),
  OptionalExpression: (node: any, state: any) => writeOptionaExpression(node, state),
  OptionalChain: (node: any, state: any) => writeOptionalChain(node, state),
  AssignmentRestElement: (node: any, state: any) => writeAssignmentRestElement(node, state),
  AssignmentRestProperty: (node: any, state: any) => writeAssignmentRestProperty(node, state),
  ObjectBindingPattern: (node: any, state: any) => writeObjectBindingPattern(node, state),
  FunctionExpression: (node: any, state: any) => writeFunctionExpression(node, state),
  FunctionDeclaration: (node: any, state: any) => writeFunctionDeclaration(node, state),
  ForBinding: (node: any, state: any) => writeForBinding(node, state),
  BindingElement: (node: any, state: any) => writeBindingElement(node, state),
  ArrayBindingPattern: (node: any, state: any) => writeArrayBindingPattern(node, state),
  ClassElement: (node: any, state: any) => writeClassElement(node, state),
  ClassExpression: (node: any, state: any) => writeClassExpression(node, state),
  ClassDeclaration: (node: any, state: any) => writeClassDeclaration(node, state),
  ForInStatement: (node: any, state: any) => writeForInStatement(node, state),
  ForStatement: (node: any, state: any) => writeForStatement(node, state),
  ParenthesizedExpression: (node: any, state: any) => writeParenthesizedExpression(node, state),
  ArrayLiteral: (node: any, state: any) => writeArrayLiteral(node, state),
  BindingRestElement: (node: any, state: any) => writeBindingRestElement(node, state),
  SuperCall: (node: any, state: any) => writeSuperCall(node, state),
  SuperProperty: (node: any, state: any) => writeSuperProperty(node, state),
  SpreadElement: (node: any, state: any) => writeSpreadElement(node, state),
  SpreadProperty: (node: any, state: any) => writeSpreadProperty(node, state),
  ConciseBody: (node: any, state: any) => writeConciseBody(node, state),
  MethodDefinition: (node: any, state: any) => writeMethodDefinition(node, state),
  Elison: (node: any, state: any) => writeElison(node, state),
  FunctionBody: (node: any, state: any) => writeFunctionBody(node, state),
  CoverInitializedName: (node: any, state: any) => writeCoverInitializedName(node, state),
  ObjectLiteral: (node: any, state: any) => writeObjectLiteral(node, state),
  MemberChain: (node: any, state: any) => writeMemberChainExpression(node, state),
  NullLiteral: (node: any, state: any) => writeNullLiteral(node, state),
  BooleanLiteral: (node: any, state: any) => writeBooleanLiteral(node, state),
  CallChain: (node: any, state: any) => writeCallChain(node, state),
  NewExpression: (node: any, state: any) => writeNewExpression(node, state),
  IdentifierName: (node: any, state: any) => writeIdentifierName(node, state),
  BindingIdentifier: (node: any, state: any) => writeBindingIdentifier(node, state),
  BindingRestProperty: (node: any, state: any) => writeBindingRestProperty(node, state),
  AssignmentExpression: (node: any, state: any) => writeAssignmentExpression(node, state),
  UnaryExpression: (node: any, state: any) => writeUnaryExpression(node, state),
  PrefixUpdateExpression: (node: any, state: any) => writePrefixUpdateExpression(node, state),
  PostfixUpdateExpression: (node: any, state: any) => writePostixUpdateExpression(node, state),
  BlockStatement: (node: any, state: any) => writeBlockStatement(node, state),
  EmptyStatement: (node: any, state: any) => writeEmptyStatement(node, state),
  DebuggerStatement: (node: any, state: any) => writeDebuggerStatement(node, state),
  ReturnStatement: (node: any, state: any) => writeReturnStatement(node, state),
  BreakStatement: (node: any, state: any) => writeBreakStatement(node, state),
  ContinueStatement: (node: any, state: any) => writeContinueStatement(node, state),
  LabelledStatement: (node: any, state: any) => writeLabelledStatement(node, state),
  WithStatement: (node: any, state: any) => writeWithStatement(node, state),
  ThrowStatement: (node: any, state: any) => writeThrowStatement(node, state),
  TryStatement: (node: any, state: any) => writeTryStatement(node, state),
  CatchClause: (node: any, state: any) => writeCatchClause(node, state),
  ConditionalExpression: (node: any, state: any) => writeConditionalExpression(node, state),
  BinaryExpression: (node: any, state: any) => writeBinaryExpression(node, state),
  LexicalBinding: (node: any, state: any) => writeLexicalBinding(node, state),
  LexicalDeclaration: (node: any, state: any) => writeLexicalDeclaration(node, state),
  VariableStatement: (node: any, state: any) => writeVariableStatement(node, state),
  VariableDeclaration: (node: any, state: any) => writeVariableDeclaration(node, state),
  CaseClause: (node: any, state: any) => writeCaseClause(node, state),
  PropertyName: (node: any, state: any) => writePropertyName(node, state),
  ObjectAssignmentPattern: (node: any, state: any) => writeObjectAssignmentPattern(node, state),
  ImportCall: (node: any, state: any) => writeImportCall(node, state),
  ImportMeta: (node: any, state: any) => writeImportMeta(node, state),
  ForOfStatement: (node: any, state: any) => writeForOfStatement(node, state),
  ImportDeclaration: (node: any) => writeImportDeclaration(node),
  ImportClause: (node: any) => writeImportClause(node),
  ImportSpecifier: (node: any) => writeImportSpecifier(node),
  NamedImports: (node: any) => writeNamedImport(node),
  ExportDeclaration: (node: any) => writeExportDeclaration(node),
  ExportDefault: (node: any) => writeExportDefault(node),
  ExportSpecifier: (node: any) => writeExportSpecifier(node),
  TemplateElement: (node: any, state: any) => writeTemplateElement(node, state),
  TemplateExpression: (node: any, state: any) => writeTemplateExpression(node, state),
  TemplateLiteral: (node: any, state: any) => writeTemplateLiteral(node, state),
  TaggedTemplate: (node: any, state: any) => writeTaggedTemplate(node, state)
};
