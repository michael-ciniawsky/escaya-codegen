import * as t from 'assert';
import { parseScript } from 'escaya';
import { generateScript } from '../src/escaya-codegen';

describe('Expressions', () => {
  for (const arg of [
    // Class expression

    '(class{})',
    '(class A{})',
    '(class A extends B{})',
    '(class extends B{})',
    '(class A extends(B,C){})',
    '(class A extends(+B){})',
    '(class A extends(()=>0){})',
    '(class A extends[]{})',
    '(class A extends{}{})',
    '(class A extends B(){})',
    '(class A extends new B{})',
    '(class A extends B.C{})',
    '(class{a(){}})',
    '(class{*a(){}})',
    '(class{static a(){}})',
    '(class{static*a(){}})',
    '(class{constructor(){}})',

    // Call expression

    'f();',
    'g(a);',
    'h(a, b);',
    'i(a, b, ...c);',
    'j(...a);',
    'a.k();',
    '(a + b).l();',
    'a.m().n();',
    'a(a,)',
    'foo(a)',
    `new (a().b)()`,
    '+ ++x',
    'call(await)',
    'call(await.foo)',
    'foo(x,y,);',
    'async({c=3} = {})',
    'async({a})',
    'x(x,);',
    'a(b,)',
    'async(a,)',
    'x(a)(b)',
    'x(a)(b)(c)(d)(e)',
    'x(...a)',
    'foo({a})',
    'yield({a})',
    'x(b, c, d, !e)',
    ` obj
     .foo
         ["bar"]
             .baz()
                 .foo
                     ["bar"]()
                         .baz()()`,
    'foo({c=3} = {})',
    '"foo", async',
    'foo(123, async,await,)',
    'foo("string", async / 1 -2, await,)',
    'a.b( foo() );',
    'foo(async,)',
    'foo("abc", async)',
    'foo(1, async,)',
    'foo(async,await,)',
    'foo(async.await[foo])',
    'foo(async.abc = await)',
    'foo(...[1.1, 2.2, 3.3, 4.4, 5.5])',
    'foo(...[1])',
    'foo(...[1, 2, 3])',
    'foo(...new Set([1]))',
    'foo(...new Set([1, 2, 3, 4, 5, 6]))',
    'async(a)(s)(y)(n)(c)',
    'async().a',
    'async()()',
    'x -= 1 ',
    ` obj
        .foo
            ["bar"]
                .baz()
                    .foo
                        ["bar"]()
                            .baz()()`,
    'foo({c=3} = {})',
    '"foo", async',
    'foo(123, async,await,)',
    'foo("string", async / 1 -2, await,)',
    'a.b( foo() );',
    'foo(async,)',
    'foo("abc", async)',
    'foo(1, async,)',
    'foo(async,await,)',
    'foo(async.await[foo])',
    'foo(async.abc = await)',
    'foo(...[1.1, 2.2, 3.3, 4.4, 5.5])',
    'foo(...[1])',
    'foo(...[1, 2, 3])',
    'foo(...new Set([1]))',
    'foo(...new Set([1, 2, 3, 4, 5, 6]))',
    'async(a)(s)(y)(n)(c)',
    'async().a',
    'async()()',
    'x -= 1 ',
    'y1 = (y %= 2);',
    'foo([a, b] = arr);',
    '0..toString();',
    '0.5.toString();',
    '1.0.toString();',
    '1.000.toString();',
    'abc.package',
    'x[a, b]',
    '(2[x,x],x)>x',
    '(a[b]||(c[d]=e))',
    'a&&(b=c)&&(d=e)',
    'typeof x',
    '"use strict"; delete 1 + 2;',
    'typeof [1,2,3] ',
    'typeof {hi: "world"}',
    'delete lunch.beans;',
    'console.log(Math.PI);',
    'typeof void 0',
    'void x !== undefined',
    '(new x ** 2)',
    '(new x() ** 2)',
    '(true ** a)',
    `(delete O.p) ** 10`,
    `(~O.p) ** 10`,
    `(-O.p) ** 10`,
    `(typeof O.p) ** 10`,
    `(void 0) ** 10`,
    `2 ** ++exponent, 8`,
    `2 ** -1 * 2, 1`,
    `(-x) ** y`,
    `(+c * b ** a ** 3)`,
    `2 ** 3 ** 2, 512`,
    'new Date(1.009804e12);',
    'new function(foo) {\n    this.foo = foo;\n}(1);',
    'new function(foo) {\n    this.foo = foo;\n}();',
    'new function test(foo) {\n    this.foo = foo;\n}(1);',
    'new function test(foo) {\n    this.foo = foo;\n}();',
    'class a { foo(){   class x extends y { [super.foo](){} }    }}',
    'class f extends bar { constructor(){  class x { [super()](){} }  }}',
    'class f extends bar { constructor(){  class x extends feh(super()) { }  }}',
    'class f extends bar { constructor(){  class x extends super() { }  }}',
    'class f extends bar { xxx(){  class x { [super.foo](){} }  }}',
    'class f extends bar { xxx(){  class x { foo(x=new (super.foo)()){} }  }}',
    'class f extends bar { xxx(){  class x { foo(x=super.foo){} }  }}',
    'class f extends bar { xxx(){  class x extends feh(super.foo) { }  }}',
    'class f extends bar { xxx(){  class x extends super.foo { }  }}',
    'class C { set x(_) { () => new super.x(); } }',
    '({ method() { () => new super.x(); } })',
    '({ *method() { () => new super.x; } })',
    '({ set x(_) { () => new super.x; } })',
    'class C { constructor() { () => new super.x; } }',
    'class C { *method() { () => new super.x; } }',
    'class f extends bar { constructor(){  class x { super(){} }  }}',
    'class f { bar(){  class x { super(){} }  }}',
    'class Mid extends Base { constructor() { super(); } f() { return new super.constructor(); } }',
    'class Derived extends Mid { constructor() { super(); } }',
    'class f { constructor(){  class x { super(){} }  }}',
    'class a { foo(){   class x { [super.foo](){} }    }}',
    'x[a, b]',
    '(2[x,x],x)>x',
    '1..typeof()',
    'class f extends bar { xxx(){  class x { super(){} }  }}',
    'class x { foo(x=new (super.foo)()){} }',
    'class x { foo(x=super.foo){} }',
    '({ method() { () => new super.x(); } })',
    '({ *method() { () => new super.x; } })',
    '({ set x(_) { () => new super.x; } })',
    'class a extends b { constructor(){   class x extends y { [super()](){} }    }}',
    'class a extends b { constructor(){      class x extends super() {}    }}',
    'class a extends b { constructor(){   class x { [super()](){} }    }}',
    'class a extends b { foo(){      class x extends super.foo {}    }}',
    'class a { foo(){      class x extends super.foo {}    }}',
    'class a extends b { foo(){   class x extends y { [super.foo](){} }    }}',
    'class a extends b { foo(){   class x { [super.foo](){} }    }}',
    'class a { foo(){   class x extends y { [super.foo](){} }    }}',
    'true ? y : z',
    'a === b ? c : d % e;',
    '0 ? v => (v) : v => 0;',
    '("1" ? "" : "1")',
    'x() ? 1 : 2, 1',
    '(false ? false : true)',
    'foo => bar ? zoo : doo',
    'await === b ? c : d % e;',
    'a === await ? c : d % e;',
    'a === b ? await : d % e;',
    '(async function(x = 1, ...a) {})',
    '(async function a() { await 0; })',
    '(async function(x, y = 1, z, v = 2, ...a) {})',
    '(async function(x, y = 1, z, v = 2) {})',
    '(async function foo(a, b = 39,) {})',
    '(async function(){})',
    '(function(x) { async function inner() { await x } })',
    'async(x,) => x',
    'async(a, ...b);',
    'async()',
    'async/x',
    'async \n / x',
    'async[x] * y',
    'async + c',
    'async: foo',
    '((async + c) + d)',
    '(async + c)',
    '((((a + b) + async) + c) + d)',
    '(((a + async) + c) + d)',
    '((a+b)+(async+d))',
    'async \n instanceof obj',
    'async \n in obj',
    'async \n in x',
    'async \n foo;',
    'async\n()',
    'async in x',
    'async instanceof x',
    'async \n function f(){}',
    'x = async \n a => b',
    'x = async \n function f(){}',
    'async \n [x]',
    '(async \n [x])',
    'new async;',
    //'()=>{}\n(foo)',
    'async (x, {a: {x}})',
    'async (x, {a: {b: x}})',
    'async ({[a]: x, b: x})',
    'async ({[a]: x, [b]: x})',
    'async ({a: x, b: x})',
    'async ({a: x, c: {b: x}})',
    'async ({a: x, ...x})',
    'async ({a: x, ...x = y})',
    'async(x, y)',
    'async \n (x, y)',
    'async(a, b) * c',
    'async() * b',
    'async \n (a, b) * c',
    `async?.("string", async?.a, async?.a)`,
    'async ({__proto__: a, __proto__: b});',
    'async ({__proto__: a, __proto__: b}) => x;',
    '(a, [b, [c, {__proto__: d, __proto__: e}]], f) => x;',
    `async (...await)`,
    `async (await)`,
    `async ([a = await])`,
    `async ({await})`,
    `async ({a: b = await})`,
    'async ({a: x, ...{x}})',
    //'()=>{}\n`x`',
    '`a${b}`',
    '`a`',
    'a``',
    //'a`b`',
    'async => {}\n++foo',
    'x({async foo(){}, bar(){}});',
    '(async((a), ...b))',
    '(async(a, ...b))',
    '(async(a, ...[b] = xxx))',
    '(async(a, ...([b] = xxx)))',
    'async () => {} \n  /x/',
    'async () => {} \n  /x/',
    //'async()=>{} \n [x]',
    'a&&(b=c)&&(d=e)',
    'X.count.bind({hits: 77})()',
    'X.count instanceof Function',
    'a.$._.B0',
    'a.if',
    'a().b',
    'x.y / z',
    'a[b, c]',
    'a[b]||(c[d]=e)',
    'new f(g, ...h = i);',
    'delete true.__proto__.foo',
    'delete "x".y',
    'delete ("foo".bar = 20)',
    'delete ((((foo))).x)',
    'delete a[2]',
    'delete await;',
    'delete false;',
    'delete null;',
    '++this.x',
    'foo = !a',
    '(typeof async (x))',
    'a(void b)',
    '(delete a.b)',
    'foo = ~b',
    'y1 === -1',
    'x *= "1";',
    'x /= null;',
    'x >>>= true;',
    'f();',
    'g(a);',
    'h(a, b);',
    `f(...a, ...b)`,
    'f();',

    // New expression

    'new A();',
    'new A(a);',
    'new a.B();',
    'new a.b.C();',
    'new (a().B)();',
    'new A().b();',
    'new new A()();',
    'new (A, B)();',

    // Object literal,
    '({})',
    '({a:1})',
    '({a:1,})',
    '({}.a--)',
    '({1:1})',
    '({1.0:1})',
    '({a:b})',
    '({255:0})',
    '({0xFF:0})',
    '({63:0})',
    '({0o77:0})',
    '({3:0})',
    '({0b11:0})',
    '({0:0})',
    '({0.:0})',
    '({0:0})',
    '({.0:0})',
    '({.1:0})',
    '({0.1:0})',
    '({.1:0})',
    '({"+0":b})',
    '({"+1":b})',
    '({"-0":b})',
    '({"\t0":b})',
    '({"\\t0":b})',
    '({"\\n0":b})',
    '({a:b})',
    '({"a":b})',
    '({[a]:b})',
    '({" ":b})',
    '({get a(){;}})',
    '({set a(param){;}})',
    '({get a(){;},set a(param){;},b:1})',
    '({a:(a,b)})',
    '({a})',
    '({async a(){}})',
    '({...{}})',
    '({...a.b}=0)',
    '({a,b:0,c})',
    '({...a=[]})',

    // Await expression
    'async function f(){await 0}',
    'async function f(){await(a+b)}',

    // Array assignment pattern

    '[]=0',
    '[...a]=0',
    '[a,...a]=0',
    '[a,a=0,...a]=0',
    '[,,]=0',
    '[,...a]=0',
    '[a=(0,0)]=0',

    // Object assignment pattern

    '({a=(0,0)}=0)',
    '({a,...b}={})',
    '({}=0)',
    '({...a}={})',

    // Array binding pattern

    // Assignment

    'a=b',
    'a+=b',
    'a*=b',
    'a%=b',
    'a**=b',
    'a<<=b',
    'a>>=b',
    'a>>>=b',
    'a/=b',
    'a|=b',
    'a^=b',
    'a,b=c',
    'a=b,c',
    'a=(b,c)',
    'a,b^=c',
    'a^=b,c',
    'a^=(b,c)',
    'a.b=0',
    'a[b]=0',

    // Conditional

    'a?b:c',
    'a?b?c:d:e',
    'a?b:c?d:e',
    'a?b?c:d:e?f:g',
    '(a?b:c)?d:e',
    '(a,b)?(c,d):(e,f)',
    'a?b=c:d',
    'a?b=c:d=e',
    'a||b?c=d:e=f',
    '(a=b)?c:d',
    'a||(b?c:d)',
    'a?b||c:d',
    'a?b:c||d',

    // Others

    'a,b,c,d',
    'a||b',
    'a|b',
    'a&b',
    'a!=b',
    'a==(b==c)',
    'a instanceof b',
    'a in b',
    'a==b<b',
    'a<<b',
    '(a*b)+(c/d)',
    'a*b+c/d',
    'a+b<<b',
    'a+(b+b)',
    'a-b',
    'a+b',
    'a%b%c',
    'a*(b+c)',
    '(a+b)%c',
    'a+b%c',
    'a%(b%c)',
    'a%b%c',
    'a*b**c',
    '(a*b)**c',
    '(-a)**b',
    '-(a**b)',
    '-(a**b)',
    'void(a**b)',
    '(a<<b)+(c>>d)',
    '+a',
    '-a',
    '!a',
    '~a',
    'typeof a',
    'void a',
    'delete a.b',
    '++a',
    '--a',
    '+ ++a',
    '- --a',
    'a+ +a',
    'a-a',
    'typeof-a',
    '!a++',
    '!!a',
    '!!(a+a)',
    '(x ** y) * z;',
    'x ** (y * z);',
    '(x * y) ** z;',
    'x * (y ** z);',
    'x ** (y ** z);',
    '(x ** y) ** z;',
    '(-1) ** 0;',
    'a++ ** b;',
    '0 ** (-1);',
    'x ** y * z;',
    'x ** (y * z);',
    '(x * y) ** z;',
    'x * y ** z;',
    'x ** y ** z;',
    '(x ** y) ** z;',
    '(-1) ** 0;',
    'a++ ** b;',
    '0 ** -1;',
    `([a, b, ...rest]) => {
   };`,
    '([a, b, ...rest]) => { };',
    'new a',
    'new a(a)',
    'new a(a,b)',
    'new this.a',
    'a()',
    'a(a)',
    'a(a,b)',
    'a((a,b))',
    'new a((a,b))',
    'a.a',
    'a[a]',
    'new a',
    'new a()',
    'new a(a)',
    '(new a).a',
    'new a().a',
    'new a(a).v',
    'new(a(a).v)',
    '(new a)()',
    '(new new a(a).a.a).a',
    '(new (new a(a).a).a).a',
    'new((new a)().a)',
    'new((new a)()).a',
    'new a.a',
    'new(a().a)',
    'a[1] = "...";',
    '[0, 1, 2, 3, 4, 5, 6, 8, null];',
    'a[0] = 1;',
    `(interface, eval) => {}`,
    `"a"
   "/b"`,
    `({})=>0`,
    `(x = 9, y) => {}`,
    `"x\\0" + 1; "use strict";`,
    '[[]]',
    '[...[x]] = x',
    '[[{},{}]]',
    '[{}[foo]] = x',
    '[this]',
    '[a.b=[c.d]=e] = f',
    '[{x: y.z}]',
    '[((((a)))), b] = [];',
    '[...z = 1]',
    '[ x , , ]',
    '[ x , ...y ]',
    '[...x, y]',
    '[...x,]',
    '[...x, ...y]',
    '[ { x = 10 } = {} ] = x',
    '[ { x : y = 10 } = {} ] = x',
    '[ { x : foo().y = 10 } = {} ] = x',
    '[[y] = /a/ ]',
    '[{y} = /a/ ]',
    '[ { x : foo()[y] = 10 } = {} ] = x',
    '[ [ x = 10 ] = {} ] = x',
    '[ [ foo()[x] = 10 ] = {} ] = x',
    '[ [ x.y = 10 ] = {} ] = x',
    '[x,y,z] = x',
    '[x, y = 42, z] = x',
    '[{x:x = 1, y:y = 2}, [z = 3, z = 4, z = 5]] = x',
    '[(x)] = x',
    '[((x, y) => z).x] = x',
    '[((x, y) => z)["x"]] = x',
    '[ ...(a) ] = x',
    '[ (foo.bar) ] = x',
    '[[].length] = x',
    '[[x].length] = x',
    '[{}.length] = x',
    '[ ([a] = []) ]',
    '[(foo())]',
    'x, [foo, bar] = doo;',
    '[(50)]',
    '[(a) = b] = [];',
    '[(a.b)] = [];',
    '[x().foo = x] = x',
    '[x + y]',
    '[x]',
    '[a.b] = c',
    '[a] = b;',
    '[x, y]',
    '[(a), ] = x;',
    'a in (b == c)',
    '[ [b].c.d === e ? f : g ]',
    '[ c.d === (e ? f : g ) ? x : y]',
    '[x = y]',
    '[x.y = z]',
    '[x = y, z]',
    '[x = true]',
    '[x, z]',
    '[x, z = {}]',
    '[x, (z)]',
    '[(x), (z) = x]',
    '[x, z = y() ** 2]',
    '[x /= 2, z]',
    '[x(y), z]',
    '[x, z() ** y]',
    '[x, z.y = (foo) ** 2]',
    '[x, z][[x2>>>3]]',
    '[...x]',
    '[x,y,...z]',
    '[x,,...z]',
    '[ ...(foo.bar) ]',
    '[a = 1]',
    '[ (y) ]',
    '[ (foo.bar) ]',
    '[x, y, ...z] = obj',
    '[{}.x] = y',
    '[x, ...y, z]',
    '[x, y, ...z()]',
    '[x, y, ...z + arr]',
    '[x, ...z = arr, y]',
    '[x, ...z + arr, y]',
    '[x, ...z(), y]',
    '[foo, [x,y,z], bar = B] = arr;',
    '[foo, [[[[[[[[[[[[[x,y,z]]]]]]]]]]]]], bar = B] = arr;',
    '[foo, [x,y = 20,z], bar = B] = arr;',
    '[[x].length - 2, z() - 2]',
    '[x.b = 2, z]',
    '[x.b /= 2, z]',
    '[a, {b:d}, c] = obj',
    '[a, {[b]:d}, c] = obj',
    '[please, {[make]: it}, stop] = bwahahahaha',
    '[pweeze = [pretty] = please, {[make]: it}, stop] = bwahahahaha',
    '[arguments] = []',
    '[x, {y = 1}] = [0, {}]',
    '[x, y, ...[z] = [1]]',
    '[...[z] = [1]]',
    '[a,,b] = array;',
    '[{[foo]: bar4}] = [{bar: "bar"}];',
    '[{[foo2()]: bar5}] = [{bar: "bar"}];',
    '[{[foo()]: bar4}] = [{bar: "bar"}];',
    '[{ [foo]: bar4 }] = [{ bar: "bar" }];',
    '[{ [foo2()]: bar5 }] = [{ bar: "bar" }];',
    '[{ [foo()]: bar4 }] = [{ bar: "bar" }];',
    '[{ [(1 + {})]: bar4 }] = [{ bar: "bar" }];',
    'a/ /b/',
    '/a/',
    '/a/i',
    '/a/gi',
    '/a\\s/gi',
    '/a\\r/gi',
    '/a/gimsuy',
    '/a\\r/ instanceof 3',
    '/a\\r/g instanceof 3',
    '/a/ in 0',
    '/a/;i',
    '(function(){})',
    '(function f(){})',
    '(function*(){})',
    '(function*f(){})',
    '(async function(){})',
    'true',
    'false',
    'null',

    'a=>a',
    '()=>a',
    'a=>a',
    '(a)=>a',
    '(...a)=>a',
    '(...[])=>0',
    '(a,...b)=>a',
    '(a=0)=>a',
    '(a,b)=>a',
    '({a})=>a',
    '({a=0})=>a',
    '([a])=>a',
    'a=>({})',
    'a=>{}',
    'a=>{({})}',
    'a=>{0;return}',
    '()=>function(){}',
    '()=>class{}',
    '()=>(1,2)',
    '(()=>0)()',
    '(a=(0,0))=>0',
    'async()=>0',
    'async a=>0',
    'async(...a)=>0',
    '({m(){super.m()}})',
    'class A extends B{constructor(){super()}}',
    '0',
    '0',
    '0x0',
    '0',
    '0o0',
    '0',
    '0b0',
    '1',
    '2',
    '0x38D7EA4C68001',
    //'0x38D7EA4C68001.valueOf()',
    '15e5',
    '1500000',
    '155e3',
    '155000',
    '.1',
    '.1',
    '0.1',
    // floats
    '1.1.valueOf()',
    '15..valueOf()',
    '1..valueOf()',
    '1e300.valueOf()',
    '1e+300.valueOf()',
    //'8e15.valueOf()',
    '8000000000000000..valueOf()',
    '1e20',
    '100000000000000000001',
    '10..valueOf()',
    //'1e1.valueOf()',
    '1',
    '1e0',
    '10',
    '1e1',
    '100',
    '1e2',
    '1e3',
    '1e4',
    '1e5',
    '100000',
    '1.3754889325393114',
    '1.3754889325393114',
    '1.3754889325393114e24',
    '0x0123456789abcdefABCDEF',
    '4.185580496821357e298',
    '4.1855804968213567e+298',
    '5.562684646268003e-308',
    '5.5626846462680035e-308',
    '5.562684646268003e-309',
    '5.5626846462680035e-309',
    '2147483648',
    '2147483648.0',
    '1e-7',
    '1e-8',
    '1e-9',
    '1e308',
    '1e+308',
    '1e308',
    '1e-308',
    '2e308',
    '2e308',
    '1+2e308',
    '("")',
    '("")',
    "('')",
    '("a")',
    "('a')",
    "('\"')",
    '("\\"")',
    "('\\'')",
    '("\b\\n\\r\t\v\f\\\\\\"\'\\u2028\\u2029日本")',
    "('\"')",
    '(async function f(){ await \n x; })',
    '(function f() { async function yield() {} })',
    '({ async [yield]() {} });',
    '(async function(x, y = 1, z) {})',
    '(async function(x, y = 1, ...a) {})',
    `(async function * () { for await (x of xs); })`,
    `(async function foo() { }.prototype)`
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(generateScript(parseScript(`${arg}`)));
      });
    });
  }
});
