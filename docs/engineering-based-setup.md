# 工程化流程

> 这个文档提供了工程团队的设置说明。

## 团队规范

> husky,lint-staged,eslint,prettier+stylelint+commitlint,配置husky钩子, 用于在提交前执行一些操作。例如, 检查代码格式, 检查代码是否符合规范等。在前端工程化中，通常使用 Git Hooks 配合 代码校验工具 来实现提交前的自动检查（比如代码格式、语法、类型等）。最主流的方案是 Husky + lint-staged，只对暂存区的文件执行校验，速度快且体验好。下面是具体的实现步骤。

- husky，一款管理 git hooks 的工具
- lint-staged，一个对 git暂存区 代码进行处理的工具
- commitlint，一款 git commit 提交规范检验工具

```bash

# 安装
pnpm add -w -D husky

# 初始化
npx husky init

# 创建 pre-commit 钩子
# npx husky add .husky/pre-commit "npm run lint"

# 配置 lint-staged
pnpm add -w -D lint-staged

```

Husky​ - Git hooks 管理
lint-staged​ - 只检查暂存区的文件
ESLint​ - JavaScript/TypeScript 代码检查
Prettier​ - 代码格式化
Stylelint​ - CSS 检查
Commitlint​ - 提交信息规范

为了让其他成员拉取代码后自动安装 Husky 的 Git Hooks，可在 package.json 的 scripts 中增加 prepare 脚本（Husky v9 会自动执行，但显式加上更稳妥）：

```json
// package.json
{
  "scripts": {
    "prepare": "husky"
  },
  "lint-staged": {
    "*.{js,ts,jsx,tsx,vue}": ["eslint --fix", "prettier --write"],
    "*.{json,css,scss,md}": ["prettier --write"]
  }
}
```

对 commit message 做规范化校验（如 Conventional Commits），可以结合 commitlint 来实现。
"@commitlint/config-conventional"是一个 commitlint 配置文件，用于定义 commit message 的规范。

```bash
pnpm add -w -D commitlint @commitlint/config-conventional
```

```json
{
  "scripts": {
    "commitlint": "commitlint --edit $1"
  }
}
```

```json
// package.json
{
  "scripts": {
    "commitlint": "commitlint --edit $1"
  }
}
```

常见的类型包括：

feat: 新功能
fix: 修复bug
docs: 文档变更
style: 代码格式（不影响代码运行的变动）
refactor: 重构（既不是新增功能，也不是修复 bug 的代码变动）
test: 增加测试
chore: 构建过程或辅助工具的变动

```js
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复 bug
        'docs', // 文档变更
        'style', // 代码格式（不影响功能）
        'refactor', // 重构
        'perf', // 性能优化
        'test', // 测试相关
        'build', // 构建或依赖变更
        'ci', // CI 配置变更
        'chore', // 其他变更
        'revert', // 回滚
        'wip', // 工作进行中
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
  },
};
```

```plaintext
git commit -m "feat: xxx"
    ↓
husky commit-msg hook
    ↓
commitlint 检查格式
    ↓
✓ 格式正确 → 提交成功
✗ 格式错误 → 提交失败并显示错误信息
```

### 注意事项

> 可以跳过校验，直接提交。不建议经常使用 ，会绕过格式检查。

```bash
# 跳过所有 hooks
git commit --no-verify -m "feat: 紧急修复"

# 只跳过 commit-msg
git commit -m "xxx" --no-msg-hook
```

> 完整流程图

```plaintext
git commit -m "feat:xxx"
         │
         ▼
┌─────────────────────────────────────────┐
│  1. Git 准备提交                         │
│     - 创建 .git/COMMIT_EDITMSG 文件      │
│     - 内容: "feat:xxx"                  │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  2. Husky pre-commit Hook (客户端)       │
│     文件: .husky/pre-commit             │
│     命令: pnpm run lint-staged          │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  3. lint-staged 执行 (只检查暂存文件)    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  *.{js,ts,jsx,tsx,vue}         │    │
│  │    1. eslint --fix             │    │
│  │    2. prettier --write          │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  *.{json,css,scss,md}          │    │
│  │    prettier --write             │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
         │
         ├── ❌ 失败 → 终止提交
         │
         ▼
┌─────────────────────────────────────────┐
│  4. Git 真正执行提交                      │
│     - 生成 commit object                │
│     - 更新 HEAD 指针                     │
│     - 更新 refs/heads/master            │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  5. Husky commit-msg Hook (客户端)      │
│     文件: .husky/commit-msg             │
│     命令: pnpm exec commitlint --edit   │
│                                         │
│     读取 .git/COMMIT_EDITMSG            │
│     验证 "feat:xxx" 格式                │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  6. commitlint 规则检查                 │
│                                         │
│  ✓ type 存在且有效 (feat/fix/docs...)   │
│  ✓ type 为小写                          │
│  ✓ subject 非空                         │
│  ✓ header ≤ 100 字符                    │
│  ✓ body 前有空行 (如果有)               │
│  ✓ footer 前有空行 (如果有)             │
└─────────────────────────────────────────┘
         │
         ├── ❌ 失败 → 提交被拒绝 (提交已成功但可回滚)
         │
         ▼
┌─────────────────────────────────────────┐
│  7. 提交完成                             │
│                                         │
│  ✓ Commit 创建成功                      │
│  ✓ 格式验证通过                         │
└─────────────────────────────────────────┘
```
