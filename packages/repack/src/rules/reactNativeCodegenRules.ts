import type { RuleSetRule } from '@rspack/core';

/**
 * @constant REACT_NATIVE_CODEGEN_RULES
 * @type {RuleSetRule}
 * @description Module rule configuration for handling React Native codegen files.
 */
export const REACT_NATIVE_CODEGEN_RULES: RuleSetRule = {
  test: /(?:^|[\\/])(?:Native\w+|(\w+)NativeComponent)\.[jt]sx?$/,
  use: {
    loader: 'babel-loader',
    options: {
      babelrc: false,
      configFile: false,
      parserOpts: {
        // hermes-parser strips all comments so the information about flow pragma is lost
        // assume flow when dealing with JS files as a workaround
        flow: 'all',
      },
      plugins: [
        'babel-plugin-syntax-hermes-parser',
        ['@babel/plugin-syntax-typescript', false],
        '@react-native/babel-plugin-codegen',
      ],
      // config merging reference: https://babeljs.io/docs/options#pluginpreset-entries
      overrides: [
        {
          test: /\.ts$/,
          plugins: [
            [
              '@babel/plugin-syntax-typescript',
              { isTSX: false, allowNamespaces: true },
            ],
          ],
        },
        {
          test: /\.tsx$/,
          plugins: [
            [
              '@babel/plugin-syntax-typescript',
              { isTSX: true, allowNamespaces: true },
            ],
          ],
        },
      ],
      // source maps are usually set based on the devtool option in config
      // Re.Pack templates disable the devtool by default and the flag in loader is not set
      // we need to enable sourcemaps for the loader explicitly here
      sourceMaps: true,
    },
  },
  type: 'javascript/auto',
};
