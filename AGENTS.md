# Obsidian Git 中文版 - 项目上下文

## 项目概述

这是 [obsidian-git](https://github.com/denolehov/obsidian-git) 的中文本地化版本，是一个为 Obsidian.md 提供 Git 集成的社区插件。

### 核心特性
- 自动提交、拉取、推送功能
- 源代码管理视图（暂存/取消暂存文件）
- 历史记录视图（浏览提交日志）
- 差异视图（查看文件变更）
- 编辑器内的行作者信息显示
- 子模块支持（仅桌面端）
- GitHub 集成

### 技术栈
- **语言**: TypeScript
- **框架**: Obsidian Plugin API
- **构建工具**: esbuild
- **UI 框架**: Svelte 5
- **Git 实现**:
  - 桌面端: `simple-git` (原生 Git)
  - 移动端: `isomorphic-git` (纯 JavaScript 实现)
- **代码编辑器**: CodeMirror 6

## 本地化方案

本项目采用**构建后字符串替换**方案，而非源代码汉化：

```
源代码（英文）→ esbuild 构建 → main.js → 翻译脚本替换 → main.js（中文）
```

### 核心文件
- `scripts/apply-translations.mjs` - 翻译脚本，包含所有翻译映射
- `esbuild.config.mjs` - 构建配置，在构建完成后调用翻译脚本
- `src/lang/` - 语言包目录（包含 `en.ts` 和 `zh-cn.ts`）

### 翻译类型
1. **静态字符串**: 直接映射替换（如 `"Commit"` → `"提交"`）
2. **模板字符串**: 正则表达式匹配替换（如 `Auto ${n} interval`）

## 构建与开发

### 前置要求
- Node.js >= 18
- pnpm >= 9

### 安装依赖
```bash
pnpm install
```

### 开发模式
```bash
pnpm run dev
# 监听文件变化并自动重新构建
```

### 生产构建
```bash
pnpm run build
# 构建后自动应用中文翻译
```

### 代码检查
```bash
pnpm run lint      # ESLint 检查
pnpm run format    # Prettier 格式检查
pnpm run tsc       # TypeScript 类型检查
pnpm run svelte    # Svelte 检查
pnpm run all       # 运行所有检查
```

## 项目结构

```
obsidian-git-zh/
├── src/
│   ├── main.ts              # 插件入口
│   ├── commands.ts          # 命令定义
│   ├── constants.ts         # 常量定义
│   ├── types.ts             # 类型定义
│   ├── automaticsManager.ts # 自动任务管理
│   ├── statusBar.ts         # 状态栏管理
│   ├── gitManager/          # Git 操作抽象层
│   │   ├── gitManager.ts    # 抽象基类
│   │   ├── simpleGit.ts     # 桌面端实现
│   │   └── isomorphicGit.ts # 移动端实现
│   ├── editor/              # 编辑器集成
│   │   ├── lineAuthor/      # 行作者信息
│   │   └── signs/           # 变更标记
│   ├── setting/             # 设置面板
│   ├── ui/                  # 用户界面
│   │   ├── diff/            # 差异视图
│   │   ├── history/         # 历史视图
│   │   ├── modals/          # 模态框
│   │   ├── sourceControl/   # 源代码管理视图
│   │   └── statusBar/       # 状态栏
│   └── lang/                # 语言包
│       ├── en.ts            # 英文
│       ├── zh-cn.ts         # 简体中文
│       └── index.ts         # 国际化接口
├── scripts/
│   └── apply-translations.mjs # 构建后翻译脚本
├── docs/                    # 文档
├── manifest.json            # Obsidian 插件清单
├── package.json             # npm 配置
├── tsconfig.json            # TypeScript 配置
└── esbuild.config.mjs       # 构建配置
```

## 上游同步流程

本项目的上游仓库为 `https://github.com/denolehov/obsidian-git.git`。

### 同步步骤
```bash
# 1. 配置上游仓库（首次）
git remote add upstream https://github.com/denolehov/obsidian-git.git

# 2. 获取上游更新
git fetch upstream

# 3. 合并上游更新
git merge upstream/master

# 4. 解决冲突（详见 Sync_i18n.md）
# - 源文件: 保留上游版本
# - 翻译脚本: 保留本地版本

# 5. 更新翻译脚本
# 提取新增的可翻译字符串，添加到 scripts/apply-translations.mjs

# 6. 重新构建
pnpm run build
```

详细同步指南请参考 `Sync_i18n.md`。

## 开发约定

### 代码风格
- 使用 TypeScript 严格模式
- 使用 Prettier 进行代码格式化
- 使用 ESLint 进行代码检查

### 命名约定
- 文件名: camelCase
- 类名: PascalCase
- 函数/变量: camelCase
- 常量: UPPER_SNAKE_CASE

### Git 提交信息
- 遵循 Conventional Commits 规范
- 示例: `feat: 添加新功能`, `fix: 修复 bug`, `docs: 更新文档`

### 翻译规则
1. **可翻译内容**: 设置项名称/描述、用户消息、命令名称、UI 文本
2. **不翻译内容**: 变量名、函数名、Git 命令、技术标识符、URL

## 关键类与接口

### ObsidianGit (main.ts)
插件主类，继承自 `Plugin`，负责：
- 初始化 Git 管理器
- 注册命令、视图、事件
- 管理自动任务
- 协调各模块工作

### GitManager (gitManager/gitManager.ts)
Git 操作的抽象基类，定义了所有 Git 操作的接口。

### SimpleGit / IsomorphicGit
`GitManager` 的具体实现，分别用于桌面端和移动端。

## 发布

发布流程由 GitHub Actions 自动化：
- `.github/workflows/releases.yml` - 发布工作流
- `.github/workflows/test.yml` - 测试工作流

使用 `standard-version` 进行版本管理：
```bash
pnpm run release
```

## 相关链接

- [上游仓库](https://github.com/denolehov/obsidian-git)
- [官方文档](https://publish.obsidian.md/git-doc)
- [Obsidian API 文档](https://docs.obsidian.md/Reference/TypeScript+API)
