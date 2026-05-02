// @ts-check
import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import tseslint from 'typescript-eslint'

const prettierConfig = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  printWidth: 100,
  tabWidth: 2,
  endOfLine: 'auto',
  arrowParens: 'always',
  vueIndentScriptAndStyle: false
}

const baseConfig = tseslint.config(
  {
    ignores: ['eslint.config.mjs', 'node_modules', 'dist', '.nuxt', '.output', '.output/**', '**/node_modules/**', '**/dist/**', '**/.nuxt/**', '**/.output/**', '**/coverage/**', '**/.git/**']
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: true
      }
    }
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
      'prettier/prettier': ['error', prettierConfig]
    }
  }
)

export { prettierConfig }
export default baseConfig
