import * as t from 'assert';
import { parseScript } from 'escaya';
import { generate } from '../src/escaya-codegen';

describe('Declarations', () => {
  for (const arg of [
    // Async function

    'async function f() {}',
    /* `async function j() {
      (await g()).a;
      await g().a;
      return await f();
    }`, */
    `async function f() {
      await (() => 1);
    }`,
    `async function test() {
      for await (const x of xs) {
        x();
      }
    }`,

    // Class declaration

    'class A{}',
    'class A extends B{}',
    'class A extends(B,C){}',
    'class A extends(+B){}',
    'class A extends(()=>0){}',
    'class A extends[]{}',
    'class A extends{}{}',
    'class A extends B(){}',
    'class A extends new B{}',
    'class A extends B.C{}',
    'class D extends class A {} {}',
    `class ComputedKey {
      [n1 + n2]() {
      }
    }`,
    `class AssignmentExpressionAsKey {
      [n1 = n2]() {
      }
    }`,
    `class SequenceExpressionAsKey {
      [(n1, n2)]() {
      }
    }`,
    `class E extends class {
      constructor() {}
    } {}
    class F extends class {
      constructor() {}
    } {
      constructor() {}
    }
    class G {
      [Symbol.iterator]() {}
      ["method"]() {}
    }
    class H {
      static classMethod() {}
      method() {}
    }
    class I {
      static get property() {}
      static set property(value) {}
    }
    class J extends A {
      constructor() {
        super();
      }
    }`,

    // FunctionDeclaration

    'function f(){}',
    'function*f(){}',
    'function f(a){}',
    'function f(a,b){}',
    'function f(a,b,...rest){}',
    'async function f(){}',
    `function x(a = { a: 6 }, b = null, ...d) {
    }`,
    `function x(a={a:6}, b=null, ...d)
    {
    }`,
    'function* f(){ yield x + y; }',
    'function* f(){ yield; }',
    'function* f(){ yield x; }',
    'function f(){ yield; }',
    'function yield() {} ',
    'function* fn() { (function yield() {}); } ',
    '+function yield() {} ',
    'function* yield() {} ',
    'function fn(x = yield* yield) {} ',
    'function fn(x = yield) {}',
    'function* fn() { () => (yield) => {}; }',
    'function *g() { function f(x = x + yield) {}; }',
    // 'async (x = yield)',
    `function* g(x) { yield x = 3; }`,
    `function* g(x) { yield x = yield 3; }`,
    `function* f(){ call(yield x + y); }`,
    `function* f(){ call(yield x); }`,
    `function *f() { (yield 1) ? yield 2 : yield 3; }`,
    `function *f() { 1 ? yield : 1 ; }`,
    `function *f() { 1 ? 1 : yield ; }`,
    `function *g() { [...yield]; }`,
    `function *f() { 1 ? 2 : yield 3; }`,
    `function *f(){ return { ...(yield) } }`,
    'function* f(){ yield x + y; }',
    'function* f(){ yield; }',
    'function* f(){ yield x; }',
    'function f(){ yield; }',
    'function * yield() { }',
    'function *a(){yield class{}}',
    'function *a(){yield-1}',
    // 'function* fn() {() => yield; () => { yield }; }',
    'function* fn() { () => (x = yield) => {}; }',
    // 'function f(){new.target}',
    'function*f(){yield}',
    'function*f(){yield a}',
    'function*f(){yield 0}',
    'function*f(){yield{}}',
    'function*f(){yield a+b}',
    'function*f(){yield a=b}',
    'function*f(){yield(a,b)}',
    'function*f(){f(yield,yield)}',
    'function*f(){f(yield a,yield b)}',
    'function*f(){yield yield yield}',
    'function*f(){yield*a}',
    'function*f(){yield*0}',
    'function*f(){yield*{}}',
    'function*f(){yield*a+b}',
    'function*f(){yield*a=b}',
    'function*f(){yield*(a,b)}',
    'function*f(){f(yield*a,yield*b)}',
    'function*f(){yield*yield*(yield)*(yield)}',

    // Variable

    'var f, g = 42, h = false;',
    'var {a: [o, {p}]} = d;',
    'var a = {};',
    'var [a, b, ...rest] = array;',

    // Const

    'const a = Infinity;',
    'const b = -Infinity;',
    'const c = +Infinity;',
    'const [a, b, ...rest] = array;',
    'const d = /abc/;',
    'const e = /abc/g;',
    'const f = /abc/gi;',
    'const {g: r = 42} = i;',
    'const {s, ...t} = r;',
    'const c = 21 * 2;',

    // Let
    'let[]=0',
    'let[...a]=0',
    'let[a,...b]=0',
    'let[a,b=0,...c]=0',
    'let[,,]=0',
    'let[,...a]=0',
    'let[a=(0,0)]=0',
    'let{a=(0,0)}=0',
    'let{a,...b}={}',
    'let{}=0',
    'let{...a}={}',
    'let{a=0}=0',
    'let{a:b}=0',
    'let[a=0]=0',
    'let{a:b=0}=0',
    'let {i, j: k} = l;',
    'let {q = 42} = f;',
    'let a = [];',
    'let b = [42];',
    'let c = [42, 7];',
    'let a = {};',
    `let b = {
      "1": "one",
      "2": "two",
      "3": "three"
    };`,
    `let c = {
      [42]: "answer",
      [7]: "lucky"
    };`,
    `let d = {
      a: 1,
      b: 2,
      c: 3
    };`,
    'let e = d.a;',
    'let f = d["c"];',
    `let g = {
      m() {},
      ['n'](a) {},
      o(a) {
        return a;
      }
    };`,
    'let h = ({}).toString();',
    `let i = {
      ...d,
      a
    };`,
    'let a = (x => (x, x * 2), 3);',
    'let b = ((x, y) => (x, x * y), 1);',
    'let c = (x => x * x)(2);',
    'let d = (1, 2, 3);',
    'let {e} = d;',
    'let [d, ...e] = [1, 2, 3, 4, 5];',
    'let q = function* () {};',
    'let r = a => a;',
    'let s = (a, b) => a + b;',
    'let t = (a, b = 0) => a + b;',
    'let u = (a, b) => {};',
    'let v = () => {};',
    'let w = () => ({});',
    /* `let x = () => {
  let a = 42;
  return a;
}; */
    `let y = () => ({
  a: 1,
  b: 2
});`
  ]) {
    it(`${arg}`, () => {
      //  console.log(generate(parseScript(`${arg}`)));
      t.doesNotThrow(() => {
        parseScript(generate(parseScript(`${arg}`)));
      });
    });
  }
});
