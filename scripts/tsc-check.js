import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const project = process.argv[2] || 'apps/api-server/tsconfig.json';
const fullPath = path.resolve(__dirname, '..', project);

try {
  execSync(`tsc --noEmit -p "${fullPath}" --skipLibCheck`, {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..'),
  });
} catch (error) {
  process.exit(1);
}
