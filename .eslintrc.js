// @ts-check
const path = require('path');
const rootDir = path.resolve(__dirname);

/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: [
        'eslint:recommended',
        // https://github.com/typescript-eslint/typescript-eslint/blob/HEAD/docs/getting-started/linting/README.md
        'plugin:@typescript-eslint/recommended',
        // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
        'plugin:jest/recommended',
        'plugin:unicorn/recommended',
    ],
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    globals: {
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: rootDir,
        project: path.resolve(rootDir, './tsconfig.eslint.json'),
        projectFolderIgnoreList: ['**/node_modules/**', '**/dist/**', '**/dist-admin/**'],
        warnOnUnsupportedTypeScriptVersion: false,
        // createDefaultProgram: true,
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    ignorePatterns: [
        '**/node_modules/**',
        'dist/**',
        'build/**',
        'mock/**',
        '**/*.js',
        '**/*.d.ts',
    ],
    rules: {
        'prettier/prettier': 'warn',
        // 关闭 eslint 的 indent，使用 prettier 格式化格式
        indent: ['off', 2],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_', ignoreRestSiblings: true }],
        '@typescript-eslint/ban-ts-comment': 'off',
        'unicorn/prefer-module': 'off',
        'unicorn/prefer-node-protocol': 'off',
        'unicorn/filename-case': 'off',
        "prefer-const": ["error", {
            "destructuring": "all",
            // "ignoreReadBeforeAssign": true,
        }]
    },
};
