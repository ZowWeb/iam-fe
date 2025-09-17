import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import jsxA11Y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig } from 'eslint/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  {
    extends: compat.extends(
      'plugin:react/recommended',
      'airbnb',
      'plugin:jsx-a11y/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'prettier',
    ),

    plugins: {
      'react-hooks': fixupPluginRules(reactHooks),
      react,
      '@typescript-eslint': typescriptEslint,
      prettier,
      'jsx-a11y': jsxA11Y,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 13,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    rules: {
      'no-debugger': 0,
      'no-alert': 0,

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          argsIgnorePattern: 'res|next|^err|_.*',
          caughtErrorsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-explicit-any': [
        'error',
        {
          ignoreRestArgs: true,
        },
      ],

      'prefer-const': [
        'error',
        {
          destructuring: 'all',
        },
      ],

      'no-unused-expressions': [
        2,
        {
          allowTaggedTemplates: true,
        },
      ],

      'no-param-reassign': [
        2,
        {
          props: false,
        },
      ],

      'arrow-body-style': 0,

      'no-console': [
        'error',
        {
          allow: ['warn', 'error', 'info'],
        },
      ],

      'no-shadow': 0,
      'no-restricted-properties': 0,
      'no-return-assign': 0,
      'no-plusplus': 0,
      import: 0,
      'import/prefer-default-export': 0,
      'import/no-unresolved': 0,
      'import/extensions': 0,
      'import/newline-after-import': 0,
      'import/first': 0,

      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
        },
      ],

      'func-names': 0,
      'no-restricted-syntax': 0,
      'class-methods-use-this': 0,
      'no-underscore-dangle': 0,
      'global-require': 0,
      'consistent-return': 0,
      'react/display-name': 0,

      'react/function-component-definition': [
        1,
        {
          namedComponents: ['function-declaration', 'arrow-function'],
        },
      ],

      'react/no-array-index-key': 0,
      'react/react-in-jsx-scope': 0,
      'react/prefer-stateless-function': 0,
      'react/destructuring-assignment': 0,
      'react/forbid-prop-types': 2,
      'react/no-unescaped-entities': 0,
      'jsx-a11y/accessible-emoji': 0,
      'react/require-default-props': 0,
      'react/jsx-one-expression-per-line': 0,
      'react/sort-comp': 0,

      'react/prop-types': [
        2,
        {
          ignore: ['children', 'router'],
        },
      ],

      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.js', '.jsx', '.tsx'],
        },
      ],

      'react/jsx-props-no-spreading': [
        1,
        {
          custom: 'ignore',
        },
      ],

      radix: 0,
      'jsx-a11y/href-no-hash': 'off',

      'jsx-a11y/anchor-is-valid': [
        'warn',
        {
          aspects: ['invalidHref'],
        },
      ],

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 0,

      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'index'],
          'newlines-between': 'always',
          named: true,
          pathGroups: [
            {
              pattern: '^react$|^[a-z]',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '~/**|./*',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['external', 'react', 'react-dom', 'eslint', '@eslint'],
        },
      ],

      'eol-last': 0,
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    },
  },
])
