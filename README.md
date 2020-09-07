<h1 align="center">Escaya code generator</h1>

<p align="center"> Lightweight and blazing fast JavaScript code generator from an EScaya-compliant AST</p>

<br>

**WIP!**

## Features

* Generates JavaScript code up to [ECMAScript® 2021](https://tc39.es/ecma262/index.html)
* Supports code compression (*minification*)
* Supports comment generation
* Supports source map 
* Supports incremental code generation
* Low memory usage

## API

The `Escaya-codegen` generates JavaScript code up to [ECMAScript® 2021](https://tc39.es/ecma262/index.html). The code can be
generated incrementally while writing it.

### Example usage:

```js
import { generate } from 'escaya-codegen';

 generate({
    "type": "Script",
    "directives": [],
    "leafs": [
        {
            "type": "ClassDeclaration",
            "name": {
                "type": "BindingIdentifier",
                "name": "x"
            },
            "heritage": null,
            "elements": [
                {
                    "type": "ClassElement",
                    "static": true,
                    "method": {
                        "type": "MethodDefinition",
                        "async": false,
                        "generator": false,
                        "getter": false,
                        "setter": true,
                        "propertySetParameterList": {
                            "type": "BindingIdentifier",
                            "name": "y"
                        },
                        "uniqueFormalParameters": [],
                        "name": {
                            "type": "IdentifierName",
                            "name": "x"
                        },
                        "contents": {
                            "type": "FunctionBody",
                            "directives": [],
                            "leafs": []
                        }
                    }
                }
            ]
        }
    ]
});

produces the string 'class x { static set x(y) {} }'.

```
