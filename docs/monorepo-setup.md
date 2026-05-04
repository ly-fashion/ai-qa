# Monorepo 跨项目引用配置

## 项目结构

```
ai-qa/
├── apps/
│   ├── api-server/          # API 服务
│   └── web-client/          # Web 客户端
├── packages/
│   ├── database/            # 数据库包
│   ├── types/               # 类型定义包
│   ├── utils/               # 工具包
│   └── ui/                  # UI 组件包
└── tsconfig.json            # 根 TypeScript 配置
```

## 路径别名配置

### 1. 根目录 tsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@api-server/*": ["apps/api-server/src/*"],
      "@web-client/*": ["apps/web-client/src/*"],
      "@database/*": ["packages/database/src/*"],
      "@types/*": ["packages/types/src/*"],
      "@utils/*": ["packages/utils/src/*"],
      "@ui/*": ["packages/ui/src/*"]
    }
  }
}
```

### 2. 各项目继承根配置

```json
// apps/api-server/tsconfig.json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

## 使用方式

### 在 API Server 中引用 Database 包

#### 1. 添加依赖

```json
// apps/api-server/package.json
{
  "dependencies": {
    "@ai-qa-packages/database": "workspace:*"
  }
}
```

#### 2. 使用路径别名

```typescript
// apps/api-server/src/main.ts
import { DB } from '@ai-qa-packages/database';
// 或者使用路径别名
import { DB } from '@database/index';
```

### 在 Web Client 中引用 Types 包

#### 1. 添加依赖

```json
// apps/web-client/package.json
{
  "dependencies": {
    "@ai-qa/types": "workspace:*"
  }
}
```

#### 2. 使用类型

```typescript
// apps/web-client/src/types/user.ts
import { User } from '@ai-qa/types';
// 或者使用路径别名
import { User } from '@types/user';
```

## 安装依赖

在项目根目录运行：

```bash
pnpm install
```

## 构建顺序

1. 先构建 packages
2. 再构建 apps

```bash
pnpm run build:packages
pnpm run build:apps
```

## 注意事项

1. **workspace 协议**：使用 `"workspace:*"` 确保使用本地包
2. **构建顺序**：确保依赖包先构建
3. **类型检查**：TypeScript 会自动解析路径别名
4. **开发模式**：使用 `pnpm dev` 可以同时启动多个项目

## 示例引用

### Database 包示例

```typescript
// packages/database/src/index.ts
export class DatabaseConnection {
  // 数据库连接逻辑
}

// apps/api-server/src/main.ts
import { DatabaseConnection } from '@ai-qa-packages/database';
```

### Types 包示例

```typescript
// packages/types/src/user.ts
export interface User {
  id: number;
  name: string;
}

// apps/web-client/src/components/UserCard.tsx
import { User } from '@ai-qa/types';
```

### Utils 包示例

```typescript
// packages/utils/src/format.ts
export function formatDate(date: Date): string {
  // 格式化逻辑
}

// apps/api-server/src/utils/helper.ts
import { formatDate } from '@ai-qa/utils';
```
