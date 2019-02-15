import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';


export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: 'inline',
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: 'inline',
    },
  ],
  external: [
    'path',
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
      tsconfigOverride: {
        compilerOptions: {
          target: 'es2016',
          module: 'es2015',
          sourceMap: true,
        }
      }
    })
  ],
};
