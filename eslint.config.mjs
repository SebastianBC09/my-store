import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

import eslint_plugin_react from 'eslint-plugin-react';
import eslint_plugin_react_hooks from 'eslint-plugin-react-hooks';
import eslint_plugin_prettier from 'eslint-plugin-prettier';
import pluginQuery from '@tanstack/eslint-plugin-query'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: eslint_plugin_react,
      'react-hooks': eslint_plugin_react_hooks,
      prettier: eslint_plugin_prettier,
      '@tanstack/query': pluginQuery,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'prettier/prettier': 'error',
      '@tanstack/query/exhaustive-deps': 'error',
    },
  },
];

export default eslintConfig;
