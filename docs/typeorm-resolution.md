# TypeORM 模块解析问题解决方案

## 问题描述
在 monorepo 架构中，TypeScript 无法识别到 TypeORM 模块，出现 "找不到模块"typeorm"或其相应的类型声明" 错误。

## 解决方案

### 方案 1: 重启 TypeScript 服务（推荐）

1. **重启 TypeScript 服务器**：
   - 按 `Ctrl+Shift+P`
   - 输入 `TypeScript: Restart TS Server`
   - 选择并执行

2. **重新加载 VSCode 窗口**：
   - 按 `Ctrl+Shift+P`
   - 输入 `Developer: Reload Window`
   - 选择并执行

### 方案 2: 检查依赖安装

验证 TypeORM 是否正确安装：

```bash
# 检查根目录依赖
pnpm list typeorm

# 检查 workspace 状态
pnpm ls
```

### 方案 3: 清理并重新安装

如果重启无效，清理依赖后重新安装：

```bash
# 清理 node_modules
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules

# 清理 lock 文件
rm pnpm-lock.yaml

# 重新安装
pnpm install
```

### 方案 4: TypeScript 配置优化

确保 `tsconfig.json` 配置正确：

```json
{
  "compilerOptions": {
    "moduleResolution": "nodenext",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true
  }
}
```

### 方案 5: 使用绝对导入

如果以上方案都无效，可以使用绝对路径导入：

```typescript
// 替代
import { DataSource } from 'typeorm';

// 使用
import { DataSource } from '../../../node_modules/.pnpm/typeorm@0.3.28/node_modules/typeorm';
```

## 验证步骤

1. **检查安装**：
   ```bash
   pnpm list typeorm
   ```

2. **测试导入**：
   ```typescript
   import { DataSource } from 'typeorm';
   console.log('TypeORM imported successfully');
   ```

3. **构建测试**：
   ```bash
   pnpm --filter @ai-qa/database build
   ```

## 常见问题

### Q: 为什么 pnpm 安装了但 TypeScript 找不到？
A: pnpm 使用符号链接存储，TypeScript 需要时间来解析这些链接。重启 TS 服务通常能解决问题。

### Q: workspace 协议的依赖如何工作？
A: `workspace:*` 告诉 pnpm 使用本地的包版本，而不是从 npm 下载。

### Q: 如何确认依赖版本一致？
A: 检查 `pnpm-lock.yaml` 文件，确保所有包使用相同版本的 TypeORM。

## 最佳实践

1. **依赖提升**：将共享依赖放在根目录
2. **版本统一**：使用 workspace 协议确保版本一致
3. **配置继承**：子项目继承根目录的 TypeScript 配置
4. **定期重启**：修改依赖后重启 TypeScript 服务

## 当前项目状态

✅ **已配置**：
- TypeORM 在根目录 `package.json` 中
- 子包使用 `workspace:*` 协议
- TypeScript 配置继承

✅ **依赖已安装**：
- typeorm@0.3.28
- mysql2@3.20.0  
- reflect-metadata@0.2.2
- @types/node@22.19.3

⚠️ **需要操作**：
- 重启 TypeScript 服务或重新加载 VSCode
