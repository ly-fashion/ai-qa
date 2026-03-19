# AI-QA 智能问答系统

一个基于现代技术栈构建的全栈 AI 问答应用，提供智能对话、文档处理和多模态交互功能。

## 📋 项目概述

AI-QA 是一个使用 Monorepo 架构的全栈应用，集成了前端 Web 客户端和后端 API 服务器。项目采用最新的技术栈，包括 NestJS 后端框架、Nuxt.js 前端框架，以及现代化的开发工具链。

### 🎯 核心功能

- **智能对话**: 基于 AI 的问答交互系统
- **文档管理**: 支持多格式文件上传和处理
- **用户界面**: 现代化的响应式设计
- **多模态支持**: 文本、链接、图片等多种输入方式
- **个性化体验**: 用户配置和历史记录管理

## 🏗️ 技术架构

### 整体架构
```
ai-qa/
├── apps/                    # 应用程序
│   ├── api-server/         # 后端 API 服务 (NestJS)
│   └── web-client/         # 前端 Web 客户端 (Nuxt.js)
├── packages/               # 共享包
│   ├── database/          # 数据库相关
│   ├── types/             # TypeScript 类型定义
│   ├── ui/                # UI 组件库
│   └── utils/             # 工具函数
└── 配置文件
```

### 技术栈

#### 后端 (api-server)
- **框架**: NestJS 11.x
- **运行时**: Node.js 22.17.1
- **语言**: TypeScript 5.7.3
- **测试**: Jest
- **代码规范**: ESLint + Prettier
- **包管理**: pnpm 10.14.0

#### 前端 (web-client)
- **框架**: Nuxt.js 4.3.0
- **UI 库**: Ant Design Vue 4.2.6
- **样式**: Tailwind CSS 4.1.18
- **图标**: Lucide Vue Next
- **AI 组件**: ai-elements-vue 1.1.0
- **语言**: Vue 3.5.27 + TypeScript

#### 开发工具
- **包管理器**: pnpm (Workspace)
- **版本控制**: Git
- **代码格式化**: Prettier
- **代码检查**: ESLint
- **构建工具**: 各应用内置构建系统

## 🚀 快速开始

### 环境要求

- **Node.js**: 22.17.1 (必须匹配)
- **pnpm**: >=10.0.0
- **操作系统**: Windows/Linux/macOS

### 安装依赖

```bash
# 克隆项目
git clone <repository-url>
cd ai-qa

# 安装依赖 (会自动检查 Node 版本)
pnpm install
```

> **注意**: 项目配置了 Node 版本检查，如果版本不匹配会自动提示解决方案。

### 开发模式

#### 启动所有服务
```bash
# 同时启动前后端服务
pnpm dev
```

#### 单独启动服务
```bash
# 仅启动前端 (http://localhost:3000)
pnpm dev:wc

# 仅启动后端 (http://localhost:9000)
pnpm dev:as
```

### 生产构建

```bash
# 构建所有应用
pnpm build
```

## 📁 项目结构详解

### 后端应用 (apps/api-server)

```
apps/api-server/
├── src/
│   ├── app.controller.ts     # 应用控制器
│   ├── app.module.ts        # 应用模块
│   ├── app.service.ts       # 应用服务
│   └── main.ts              # 应用入口
├── test/                    # 测试文件
├── package.json            # 依赖配置
├── tsconfig.json           # TypeScript 配置
├── nest-cli.json          # NestJS CLI 配置
└── eslint.config.mjs      # ESLint 配置
```

**主要特性**:
- RESTful API 设计
- 模块化架构
- 依赖注入系统
- 完整的测试覆盖
- 热重载开发

### 前端应用 (apps/web-client)

```
apps/web-client/
├── app/
│   ├── app.vue             # 根组件
│   ├── assets/             # 静态资源
│   │   └── css/
│   │       └── main.css   # 主样式文件
│   ├── components/         # 组件
│   │   └── layout/        # 布局组件
│   ├── layouts/            # 页面布局
│   ├── pages/              # 页面
│   │   ├── index.vue      # 首页
│   │   ├── profile.vue    # 用户资料页
│   │   └── setting.vue    # 设置页
│   └── plugins/           # 插件
├── public/                 # 公共资源
├── nuxt.config.ts         # Nuxt 配置
├── package.json           # 依赖配置
└── tsconfig.json          # TypeScript 配置
```

**主要特性**:
- 服务端渲染 (SSR)
- 响应式设计
- 组件化开发
- 路由自动生成
- 状态管理支持

### 共享包 (packages/)

```
packages/
├── database/    # 数据库模型、迁移、连接配置
├── types/       # 共享 TypeScript 类型定义
├── ui/          # 可复用的 UI 组件库
└── utils/       # 通用工具函数
```

> **注意**: 当前 packages 目录为空，可根据项目需要逐步添加共享模块。

## 🛠️ 开发指南

### 代码规范

项目使用统一的代码规范：

```bash
# 格式化代码 (后端)
cd apps/api-server && pnpm format

# 代码检查 (后端)
cd apps/api-server && pnpm lint

# 前端代码格式化由 Prettier 自动处理
```

### 测试

#### 后端测试
```bash
# 单元测试
cd apps/api-server && pnpm test

# 测试覆盖率
cd apps/api-server && pnpm test:cov

# E2E 测试
cd apps/api-server && pnpm test:e2e
```

#### 前端测试
前端测试配置待完善，可集成 Vitest 或 Jest。

### 环境配置

#### 后端环境变量
```bash
# apps/api-server/.env
PORT=9000
NODE_ENV=development
```

#### 前端环境变量
```bash
# apps/web-client/.env
NUXT_PUBLIC_API_BASE=http://localhost:9000/api
```

## 📊 API 文档

### 后端 API

#### 基础信息
- **Base URL**: `http://localhost:9000`
- **Content-Type**: `application/json`

#### 主要端点

```typescript
// 健康检查
GET /
Response: "Hello World!"

// API 路由示例 (待开发)
GET /api/health
POST /api/chat
GET /api/files
```

### 前端路由

```typescript
// 页面路由
/           # 首页 - AI 对话界面
/profile    # 用户资料 - 文件和历史记录
/setting    # 设置页面 - 用户配置
```

## 🎨 UI 设计

### 设计系统

- **色彩方案**: 深色主题为主，支持亮色主题
- **组件库**: Ant Design Vue + 自定义组件
- **图标**: Lucide Icons
- **字体**: 系统默认字体栈

### 响应式设计

- **移动端**: < 768px
- **平板端**: 768px - 1024px  
- **桌面端**: > 1024px

## 🔧 配置说明

### pnpm Workspace 配置

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'     # 应用程序
  - 'packages/*' # 共享包
```

### Node 版本管理

项目使用 `.nvmrc` 文件指定 Node 版本：

```
22.17.1
```

安装脚本会自动检查版本兼容性，确保开发环境一致性。

## 📦 部署

### 开发环境

```bash
# 启动开发服务器
pnpm dev
```

访问地址：
- 前端: http://localhost:3000
- 后端: http://localhost:9000

### 生产环境

```bash
# 构建应用
pnpm build

# 启动生产服务
cd apps/api-server && pnpm start:prod
```

### Docker 部署 (待实现)

```dockerfile
# Dockerfile 配置待添加
```

## 🤝 贡献指南

### 开发流程

1. Fork 项目
2. 创建功能分支: `git checkout -b feature/amazing-feature`
3. 提交更改: `git commit -m 'Add amazing feature'`
4. 推送分支: `git push origin feature/amazing-feature`
5. 提交 Pull Request

### 提交规范

使用语义化提交信息：

```
feat: 添加新功能
fix: 修复 bug
docs: 更新文档
style: 代码格式调整
refactor: 代码重构
test: 添加测试
chore: 构建过程或辅助工具的变动
```

## 📝 更新日志

### v1.0.0 (开发中)

- ✅ 项目初始化和基础架构搭建
- ✅ NestJS 后端框架配置
- ✅ Nuxt.js 前端框架配置
- ✅ pnpm Workspace 配置
- ✅ TypeScript 配置
- ✅ ESLint 和 Prettier 配置
- ✅ 基础页面和组件开发
- 🔄 API 接口开发 (进行中)
- 📝 数据库集成 (计划中)
- 🧪 测试用例编写 (计划中)

## 📄 许可证

本项目采用 ISC 许可证。

## 🆘 故障排除

### 常见问题

#### Node 版本不匹配
```bash
# 错误信息
❌ Node版本错误: 需要 22.17.1, 当前是 xx.x.x
💡 请运行: nvm use 22.17.1

# 解决方案
nvm use 22.17.1
pnpm install
```

#### 端口冲突
```bash
# 修改端口配置
# 后端: apps/api-server/src/main.ts
# 前端: 环境变量或 nuxt.config.ts
```

#### 依赖安装失败
```bash
# 清理缓存重新安装
pnpm store prune
rm -rf node_modules
rm -rf apps/*/node_modules
pnpm install
```

### 获取帮助

- 📧 邮件支持: [待添加]
- 💬 问题讨论: [待添加]
- 🐛 Bug 报告: [待添加]

## 🔮 未来规划

### 短期目标 (1-2 个月)
- [ ] 完善 API 接口设计
- [ ] 集成数据库 (PostgreSQL/MongoDB)
- [ ] 添加用户认证系统
- [ ] 实现文件上传功能
- [ ] 完善测试覆盖

### 中期目标 (3-6 个月)
- [ ] 集成 AI 模型 API
- [ ] 实现实时通信 (WebSocket)
- [ ] 添加缓存机制
- [ ] 性能优化
- [ ] 国际化支持

### 长期目标 (6-12 个月)
- [ ] 微服务架构改造
- [ ] 容器化部署
- [ ] CI/CD 流水线
- [ ] 监控和日志系统
- [ ] 移动端应用开发

---

**开发团队**: [待添加]  
**最后更新**: 2026-03-15  
**文档版本**: v1.0.0
