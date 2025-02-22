module.exports = {
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  globals: {
    CFG: true,
    wx: true,
    FYGE: true,
    SPARK_ESLINT_PLUGIN: true,
    remScale: true,
  },
  plugins: ['html', 'react', '@spark/best-practices', '@spark/security'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 7,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    babelOptions: {
      configFile: './node_modules/@spark/code-inspector/static/babel.config.js',
    },
  },
  rules: {
    'no-undef': 'error',
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true }],
    'no-dupe-keys': 'error',
    'no-fallthrough': 'error',
    'no-global-assign': 'error',
    'no-implied-eval': 'error',
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true }],
    'no-useless-escape': 'error',
    'no-empty-pattern': 'error',
    'no-empty-function': ['error', { allow: ['arrowFunctions', 'functions', 'methods'] }],
    'no-var': 'error',
    'no-dupe-class-members': 'error',
    'no-unsafe-optional-chaining': 'error',
    'no-const-assign': 'error',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'prefer-const': 'warn',
    'no-extra-boolean-cast': 'warn',
    'no-mixed-spaces-and-tabs': 'warn',
    'no-alert': 'warn',
    'no-new-wrappers': 'warn',
    'no-useless-concat': 'warn',
    'no-useless-return': 'warn',
    'prefer-promise-reject-errors': ['warn', { allowEmptyReject: true }],
    'spaced-comment': 'warn',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/jsx-pascal-case': 'error',
    'jsx-quotes': 'warn',
    // 'react/jsx-tag-spacing': 'error',
    'react/require-resnder-return': 'error',
    'semi': [1]
  },
  overrides: [
    {
      files: ['public/**/*.html'],
      rules: {
        'no-var': 'off',
        '@spark/security/third-party-whitelist': 'error',
        '@spark/best-practices/no-url-in-js': 'error',
        '@spark/best-practices/no-arrow-function': 'error',
        '@spark/best-practices/no-es6-variable-declaration': 'error',
      },
    },
    {
      files: ['src/**/*.{js,jsx}'],
      rules: {
        '@spark/best-practices/no-url-in-js': 'error',
      },
    },
  ],
};
