export default {
  'apps/api-server/**/*.ts': ['pnpm tsc-check', 'eslint --fix', 'prettier --write'],
  'apps/api-server/src/**/*.spec.ts': ['eslint --fix', 'prettier --write'],
  'apps/web-client/**/*.{ts,tsx,vue}': ['eslint --fix', 'prettier --write'],
  'packages/**/*.ts': ['eslint --fix', 'prettier --write'],
  '*.{js,jsx}': ['eslint --fix', 'prettier --write'],
  '*.vue': ['eslint --fix', 'prettier --write'],
  '*.{json,css,scss,md}': ['prettier --write'],
};
