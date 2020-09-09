const { join } = require('path');
const rollup = require('rollup');
const typescript2 = require('rollup-plugin-typescript2');
const { terser } = require('rollup-plugin-terser');
const ts = require('typescript');
const project = require('./project');

bundle();

async function bundle() {
  if (process.argv.slice(2)[0] === 'bench') {
    await bunldeCJS();
  } else {
    await bundleES6();
    await bundleES5();
  }
}

// bundle cjs(es6)
async function bunldeCJS() {
  console.log(`creating cjs bundle`);

  const bundle = await rollup.rollup({
    input: project.entry.path,
    plugins: [
      typescript2({
        tsconfig: project['tsconfig.json'].path,
        typescript: ts
      })
    ]
  });

  const file = join(project.dist.path, `escaya-codegen.cjs.js`);

  console.log(`writing ${file}`);

  await bundle.write({
    file,
    name: 'escaya-codegen',
    format: 'cjs'
  });
  console.log(`done`);
}

// bundle es6()
async function bundleES6() {
  for (const type of ['normal', 'minified']) {
    console.log(`creating ${type} bundle`);

    const bundle = await rollup.rollup({
      input: project.entry.path,
      plugins: [
        typescript2({
          tsconfig: project['tsconfig.json'].path,
          typescript: ts
        }),
        ...(type === 'minified' ? [terser()] : [])
      ]
    });

    const suffix = type === 'minified' ? '.min' : '';

    let minfile = join(project.dist.path, `escaya-codegen.esm${suffix}.js`);

    console.log(`writing ${minfile}`);

    await bundle.write({
      file: minfile,
      name: 'escaya-codegen',
      format: 'esm'
    });

    minfile = join(project.dist.path, `escaya-codegen.umd${suffix}.js`);

    console.log(`writing ${minfile}`);

    await bundle.write({
      file: minfile,
      exports: 'named',
      name: 'escaya-codegen',
      format: 'umd'
    });
  }
}

// bundle es5(umd)
async function bundleES5() {
  for (const type of ['normal', 'minified']) {
    console.log(`creating ${type} es5 bundle`);

    const bundle = await rollup.rollup({
      input: project.entry.path,
      plugins: [
        typescript2({
          tsconfig: project['tsconfig.json'].path,
          tsconfigOverride: { compilerOptions: { target: 'es5' } },
          typescript: ts
        }),
        ...(type === 'minified' ? [terser()] : [])
      ]
    });

    const suffix = type === 'minified' ? '.min' : '';

    const fleName = join(project.dist.path, `escaya-codegen.umd.es5${suffix}.js`);

    console.log(`writing ${fleName}`);

    await bundle.write({
      file: fleName,
      exports: 'named',
      name: 'escaya-codegen',
      format: 'umd'
    });
  }
}
