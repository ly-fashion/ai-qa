# 编码规范

## 通用规范

- **全栈 TypeScript**: 所有代码（前端 Nuxt、后端 NestJS）必须使用 TypeScript。严禁显式使用 `any`，必须定义明确的 Interface 或 DTO。
- **单一数据源**: 避免状态分散，前端使用 Pinia 或 Composables 管理全局状态，后端保持 Service 层为业务逻辑唯一入口。
- **错误处理**:
  - 后端：使用 NestJS Exception Filters 统一处理异常。
  - 前端：使用 `useError` 或 `ErrorBoundary` 处理组件级错误，API 请求需捕获异常。
- **避免多层嵌套**: 使用卫语句（Guard Clauses）提前返回，减少 `if/else` 嵌套深度。
- **代码注释**: 所有函数、类、接口、类型定义等必须添加注释，描述其功能、参数、返回值等。
- **注意事项**:
  - 项目尽量使用中文注释
  - 避免在循环中使用 `async/await`，可以使用 `Promise.all` 并行处理。
  - 数据库操作必须使用事务，确保数据一致性。
  - 所有 API 调用必须处理异常，避免应用崩溃。
  - 禁止引入新的外部库或框架, 必须使用已有的库或框.

## 代码可读性

### 目录结构与组织

- `apps/`: 存放应用级代码，每个应用一个目录（如 `api-server`, `web-client`）
  - `api-server/`: NestJS 后端服务。
    - `src/`: 源代码目录。
      - `controllers/`: API 控制器。
      - `services/`: 业务逻辑服务。
      - `dtos/`: 数据传输对象（DTO）。
      - `entities/`: 数据库实体。
      - `modules/`: 模块（如用户模块、订单模块）。
    - `test/`: 测试目录。
  - `web-client/`: Nuxt 前端应用。
    - `src/`: 源代码目录。
      - `components/`: Vue 组件。
      - `layouts/`: 布局组件。
      - `pages/`: 页面组件。
      - `plugins/`: Vue 插件。
      - `services/`: 前端服务（如 API 调用）。
      - `store/`: Pinia 状态管理。
      - `utils/`: 通用工具函数。
    - `test/`: 测试目录。
- `packages/`: 存放跨应用共享的代码（如 DTOs、Entities、Utils）。
  - `database/`: 数据库相关代码（如实体、迁移）。
  - `types/`: 类型定义（如接口、枚举）。
  - `utils/`: 通用工具函数。

### 命名约定

- **文件与目录**:
  - Vue 组件：`PascalCase.vue` (如 `UserProfile.vue`)。
  - NestJS/TS 文件：`kebab-case` (如 `user.service.ts`)。
  - 目录：全小写 `kebab-case`。
- **变量与函数**:
  - 变量/函数/方法：`camelCase` (如 `fetchUserData`)。
  - 类/接口/类型：`PascalCase` (如 `UserInterface`)。
  - 常量：`UPPER_SNAKE_CASE` (如 `MAX_RETRY_COUNT`)。
  - 布尔值：使用 `is`, `has`, `should` 前缀 (如 `isVisible`)。
- **Vue 特有**:
  - 组件名必须为多单词 (如 `BaseButton`, `TodoItem`)。
  - Props 定义使用 `camelCase`，模板中使用 `kebab-case`。

### 代码组织

- **Vue 组件结构**:
  - 遵循顺序：`<script setup lang="ts">` -> `<template>` -> `<style scoped>`。
  - 逻辑抽离：超过 200 行的组件应考虑拆分，业务逻辑抽取为 Composables (`useLogic.ts`)。
- **NestJS 架构**:
  - 严格遵循 Module -> Controller -> Service 分层。
  - DTO (Data Transfer Objects) 必须用于所有 Controller 的输入输出定义。
- **相关性分组**: 相关的样式、测试和逻辑文件应尽可能靠近（Colocation）。

### 注释与文档

- **意图优先**: 注释应解释“为什么这样做”而非“在做什么”。
- **API 文档**:
  - 后端 DTO 属性需使用 Swagger 装饰器 (`@ApiProperty`) 标记。
  - 公共函数需添加 JSDoc 说明参数和返回值。
- **TODO 标记**: 待办事项使用 `// TODO: [描述]` 格式。

## 性能优化

### 内存优化

- **响应式控制**:
  - 避免将大型不可变数据（如大列表、图表配置）放入 `ref/reactive`，应使用 `shallowRef`。
- **资源释放**:
  - Vue: 在 `onUnmounted` 中清理 `setInterval`, `window.addEventListener` 等副作用。
  - NestJS: 确保数据库连接和文件流正确关闭。

### 计算优化

- **缓存策略**:
  - Vue: 频繁计算的派生状态必须使用 `computed`。
  - 列表渲染：必须设置唯一的 `key` (严禁使用 `index` 作为 key)。
  - 条件渲染：频繁切换使用 `v-show`，低频切换使用 `v-if`。
- **后端查询**:
  - 避免 N+1 问题：使用 TypeORM 的 `relations` 或 QueryBuilder 预加载关联数据。
  - 必须分页：列表接口必须包含分页参数。

### 并行优化

- **异步并发**:
  - 互不依赖的异步操作（如多个 API 请求）必须使用 `Promise.all` 并行执行，严禁串行 `await`。
- **懒加载**:
  - 前端：路由组件 (`pages/`) 默认懒加载；大型非首屏组件使用 `defineAsyncComponent`。
  - 资源：图片等静态资源应使用懒加载策略。
