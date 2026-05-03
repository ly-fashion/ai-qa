// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname);

const prettierConfig = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  printWidth: 100,
  tabWidth: 2,
  endOfLine: 'auto',
  arrowParens: 'always',
  vueIndentScriptAndStyle: false,
};

const baseConfig = tseslint.config(
  {
    ignores: [
      'eslint.config.mjs',
      'node_modules',
      'dist',
      '.nuxt',
      '.output',
      '.output/**',
      '**/node_modules/**',
      '**/dist/**',
      '**/.nuxt/**',
      '**/.output/**',
      '**/coverage/**',
      '**/.git/**',
      '*.config.js',
      '*.config.cjs',
      'commitlint.config.js',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.config.*', '*.config.js', '*.config.mjs'],
        },
        tsconfigRootDir: rootDir,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
      'prettier/prettier': ['error', prettierConfig],
    },
  },
);

export { prettierConfig };
export default baseConfig;
