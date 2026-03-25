# TypeORM 在 Monorepo 中的最佳实践

## 🎯 核心原则

### 1. 依赖提升 (Dependency Hoisting)
将共享依赖提升到根目录，避免版本冲突和重复安装。

### 2. Workspace 协议
使用 `workspace:*` 确保所有子包使用相同版本的依赖。

## 📁 项目结构

```
ai-qa/
├── package.json                 # 根配置 - 包含 TypeORM 等共享依赖
├── apps/
│   └── api-server/
│       ├── package.json         # 使用 workspace:* 协议
│       └── src/
└── packages/
    └── database/
        ├── package.json         # 使用 workspace:* 协议
        └── src/
```

## 📦 依赖配置

### 根目录 package.json
```json
{
  "dependencies": {
    "typeorm": "^0.3.28",
    "mysql2": "^3.20.0",
    "reflect-metadata": "^0.2.2"
  },
  "devDependencies": {
    "@types/node": "^22.10.7",
    "typescript": "^5.7.3"
  }
}
```

### 子包 package.json
```json
// packages/database/package.json
{
  "dependencies": {
    "typeorm": "workspace:*",
    "mysql2": "workspace:*",
    "reflect-metadata": "workspace:*"
  }
}

// apps/api-server/package.json  
{
  "dependencies": {
    "@nestjs/typeorm": "^11.0.0",
    "typeorm": "workspace:*",
    "mysql2": "workspace:*",
    "@ai-qa/database": "workspace:*"
  }
}
```

## 🏗️ 架构模式

### 1. 数据库包 (packages/database)
负责：
- 数据库连接管理
- 基础实体定义
- 数据库配置
- 连接池管理

```typescript
// packages/database/src/index.ts
import { DataSource } from 'typeorm';

export class DatabaseConnection {
  private static instance: DataSource;

  public static getInstance(): DataSource {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        // ... 其他配置
      });
    }
    return DatabaseConnection.instance;
  }

  public static async connect(): Promise<void> {
    if (!DatabaseConnection.instance.isInitialized) {
      await DatabaseConnection.instance.initialize();
    }
  }
}
```

### 2. API Server (apps/api-server)
负责：
- 业务逻辑实现
- API 接口定义
- 使用数据库包

```typescript
// apps/api-server/src/main.ts
import { DatabaseConnection } from '@ai-qa/database';

async function bootstrap() {
  await DatabaseConnection.connect();
  // ... 启动应用
}
```

## 🚀 构建和开发

### 安装依赖
```bash
pnpm install
```

### 开发模式
```bash
# 同时启动所有服务
pnpm dev

# 单独启动 API Server
pnpm dev:as

# 单独启动 Web Client
pnpm dev:wc
```

### 构建顺序
```bash
# 1. 先构建 packages
pnpm build:packages

# 2. 再构建 apps
pnpm build:apps

# 3. 或者一次性构建所有
pnpm build
```

## 📋 最佳实践清单

### ✅ 推荐做法

1. **依赖提升**
   - 将 TypeORM、mysql2 等放在根目录
   - 使用 `workspace:*` 协议引用

2. **单一职责**
   - `packages/database` 只负责数据库相关
   - `apps/api-server` 专注业务逻辑

3. **配置统一**
   - 数据库配置在 `packages/database` 中
   - 环境变量通过 `.env` 文件管理

4. **类型安全**
   - 在 `packages/types` 中定义共享类型
   - 所有项目引用相同的类型定义

### ❌ 避免做法

1. **重复依赖**
   - 不要在多个包中安装相同版本的 TypeORM
   - 避免版本冲突

2. **循环依赖**
   - `packages/database` 不应依赖 `apps/api-server`
   - 保持单向依赖关系

3. **配置分散**
   - 不要在每个应用中重复数据库配置
   - 避免配置不一致

## 🔧 故障排除

### 常见问题

1. **模块找不到**
   ```bash
   # 重新安装依赖
   pnpm install --force
   ```

2. **类型错误**
   ```bash
   # 重新构建 types 包
   pnpm --filter @ai-qa/types build
   ```

3. **版本冲突**
   ```bash
   # 检查依赖版本
   pnpm why typeorm
   ```

## 📚 扩展阅读

- [pnpm Workspace 文档](https://pnpm.io/workspaces)
- [TypeORM 官方文档](https://typeorm.io/)
- [Monorepo 最佳实践](https://monorepo.tools/)
