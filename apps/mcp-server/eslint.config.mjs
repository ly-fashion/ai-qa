// @ts-check
import tseslint from 'typescript-eslint';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import rootConfig from '../../eslint.config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const mcpServerDir = resolve(__dirname);

const config = tseslint.config(
  ...rootConfig,
  {
    files: ['**/*.ts'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            '*.config.*',
            '*.config.js',
            '*.config.mjs',
            '*.spec.ts',
            '*.test.ts',
          ],
        },
        tsconfigRootDir: mcpServerDir,
      },
    },
  },
);

export default config;
