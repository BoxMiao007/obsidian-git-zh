# Obsidian Git 中文版 — 上游同步与特色功能维护手册

> **适用对象**: AI Agent（Claude Code, Cursor, Copilot 等）
> **执行目标**: 安全同步上游仓库 `denolehov/obsidian-git`，保留本项目全部特色功能
> **最后验证**: 2026-05-15（同步至上游 2.38.2，修复翻译脚本崩溃问题）

---

## 0. 项目概览

### 0.1 仓库信息

| 项目 | 值 |
|------|-----|
| 本项目 origin | `git@github.com:BoxMiao007/obsidian-git-zh.git` |
| 上游 upstream | `https://github.com/denolehov/obsidian-git.git` |
| 本地主分支 | `master` |
| 上游主分支 | `master` |
| 包管理器 | **pnpm**（非 npm） |
| 构建命令 | `node esbuild.config.mjs production` |
| Node 版本要求 | >= 18 |

### 0.2 本项目特色功能（与上游的差异）

本项目在上游基础上增加了以下功能，同步时**必须完整保留**：

#### 特色 1：HTTP/HTTPS 代理支持

允许用户在设置中配置代理 URL，Git 网络操作时自动注入环境变量。

涉及文件及修改点：

| 文件 | 修改内容 |
|------|----------|
| `src/types.ts` | `ObsidianGitSettings` 接口中添加 `proxyUrl: string` 字段 |
| `src/constants.ts` | `DEFAULT_SETTINGS` 中添加 `proxyUrl: ""` 默认值 |
| `src/gitManager/simpleGit.ts` | `setGitInstance()` 方法中读取 `proxyUrl`，注入 `HTTP_PROXY`/`HTTPS_PROXY`/`http_proxy`/`https_proxy` 环境变量 |
| `src/setting/settings.ts` | 设置界面中添加代理 URL 输入框（位于 Advanced 区域） |

#### 特色 2：中文本地化（构建后字符串替换）

采用**构建后替换**方案：源代码保持英文（方便与上游同步），构建产物 `main.js` 中的用户可见字符串被替换为中文。

```
汉化架构：
├── scripts/apply-translations.mjs    ← 核心翻译脚本
│   ├── TRANSLATIONS                  ← 静态字符串映射（key-value 对）
│   └── TEMPLATE_TRANSLATIONS         ← 正则模板替换（动态字符串）
├── esbuild.config.mjs                ← 构建后调用 applyTranslations()
├── src/lang/                         ← 源码级 i18n 模块（备用/参考）
│   ├── en.ts                         ← 英文字符串定义
│   ├── zh-cn.ts                      ← 中文字符串定义
│   ├── index.ts                      ← 语言切换逻辑
│   └── translations.ts              ← 翻译类型定义
└── main.js                           ← 最终构建产物（已汉化）
```

#### 特色 3：中文化元数据

| 文件 | 保留内容 |
|------|----------|
| `manifest.json` | `"name": "Git (中文版)"`、中文 description、保留 `minAppVersion` 字段 |
| `package.json` | 中文 description、保留 `sass` 依赖 |
| `README.md` | 完整中文内容 |
| `README.en.md` | 英文 README（本项目独有） |

---

## 1. 同步前准备

### 1.1 确认上游远程已配置

```bash
git remote -v | grep upstream
# 期望输出：upstream https://github.com/denolehov/obsidian-git.git (fetch/push)

# 如果没有，添加：
git remote add upstream https://github.com/denolehov/obsidian-git.git
```

### 1.2 检查工作目录状态

```bash
git status --short
```

**如果有未提交的修改**，必须先暂存：

```bash
git stash
# 合并完成后恢复：git stash pop
```

> **重要**：不要跳过此步。`git merge` 在工作目录有未提交修改时会拒绝执行。

### 1.3 获取上游最新代码

```bash
git fetch upstream
```

### 1.4 评估差异规模

```bash
# 查看落后上游多少个 commit
git log HEAD..upstream/master --oneline

# 查看领先上游多少个 commit（本项目特色功能）
git log upstream/master..HEAD --oneline
```

---

## 2. 执行合并

### 2.1 合并上游

```bash
git merge upstream/master --no-edit
```

### 2.2 冲突处理策略

| 冲突文件 | 处理策略 | 原因 |
|----------|----------|------|
| `src/**/*.ts`（除下方例外） | **接受上游** `--theirs` | 源代码应与上游同步，汉化通过构建后替换实现 |
| `src/**/*.svelte` | **接受上游** `--theirs` | 同上 |
| `src/types.ts` | **手动合并** | 必须保留 `proxyUrl: string` 字段 |
| `src/constants.ts` | **手动合并** | 必须保留 `proxyUrl: ""` 默认值 |
| `src/gitManager/simpleGit.ts` | **手动合并** | 必须保留代理注入逻辑 |
| `src/setting/settings.ts` | **手动合并** | 必须保留代理设置 UI 代码 |
| `scripts/apply-translations.mjs` | **保留本地** `--ours` | 翻译核心文件，上游不存在 |
| `esbuild.config.mjs` | **手动合并** | 必须保留 `applyTranslations()` 调用和 `context.dispose()` |
| `manifest.json` | **手动合并** | 采用上游版本号，保留中文 name/description 和 `minAppVersion` |
| `package.json` | **手动合并** | 采用上游版本号和依赖更新，保留中文 description 和 `sass` 依赖 |
| `pnpm-lock.yaml` | **接受上游** `--theirs` | 后续重新生成 |
| `README.md` | **保留本地** `--ours` | 中文 README 与上游完全不同 |
| `src/lang/**` | **保留本地** `--ours` | 本项目独有的 i18n 模块 |

### 2.3 手动合并关键文件的具体指导

#### esbuild.config.mjs

必须包含：
1. 顶部导入：`import { applyTranslations } from "./scripts/apply-translations.mjs";`
2. 生产构建中：
```javascript
if (prod) {
    await context.rebuild();
    await context.dispose();
    applyTranslations();
    process.exit(0);
}
```

> **注意**：`context.dispose()` 必须在 `process.exit(0)` 之前调用，否则 esbuild 会因后台服务未释放而 deadlock。

### 2.4 完成合并

```bash
git add <所有已解决的文件>
git commit --no-edit
```

---

## 3. 重新生成依赖锁文件

### 3.1 确保 pnpm-workspace.yaml 正确

```yaml
allowBuilds:
  '@parcel/watcher': true
  esbuild: true
  svelte-preprocess: true
```

> **重要**：`esbuild` 和 `@parcel/watcher` 必须设为 `true`，否则它们的 postinstall 脚本不会执行，导致构建时 esbuild 二进制缺失（表现为 deadlock 错误）。

### 3.2 确保 .npmrc 存在

```ini
confirm-module-purge=false
```

> 这避免 pnpm 在非 TTY 环境下因交互式确认而失败。

### 3.3 安装依赖

```bash
pnpm install --no-frozen-lockfile
```

---

## 4. 构建与验证

### 4.1 执行构建

```bash
node esbuild.config.mjs production
```

期望输出：
```
正在应用中文翻译...
✅ 翻译完成！已替换 XXX 个字符串。
```

### 4.2 验证构建产物

```bash
# 语法检查
node -c main.js

# 检查翻译是否生效
grep -c "源代码管理" main.js
grep -c "提交并同步" main.js

# 检查代理功能是否保留
grep -c "HTTP_PROXY" main.js
```

### 4.3 验证设置页面不崩溃

在 Obsidian 中打开插件设置页面，确认所有设置区域（自动、提交信息、拉取、提交并同步、代码块管理、行作者信息、历史记录视图、源代码管理视图、杂项、认证/提交作者、高级）均正常显示。

如果设置页面只显示"自动"就中断，打开开发者控制台（`Ctrl+Shift+I`）查看错误信息，通常是翻译脚本的问题（见第 5 节）。

---

## 5. 翻译脚本维护（核心注意事项）

### 5.1 绝对禁止的翻译模式

翻译脚本 `scripts/apply-translations.mjs` 对构建产物 `main.js` 做全局文本替换。以下模式**会破坏代码运行**，绝对不能使用：

#### 禁止 1：在 replace 字符串中引用 minified 变量名

```javascript
// ❌ 绝对禁止 — minified 变量名每次构建都会变化
replace: "如果启用，将在停止编辑文件后每隔${iR(i.settings.autoSaveInterval)}自动${n}。"

// ✅ 正确做法 — 省略动态部分或使用通用描述
replace: "如果启用，将在停止编辑文件后自动${n}。"
```

**原因**：esbuild 每次构建时 minify 产生的变量名（如 `iR`、`i`、`f`、`d` 等）是不确定的。上游代码变化后重新构建，这些变量名会改变，导致 `iR is not a function` 等运行时错误。

**规则**：TEMPLATE_TRANSLATIONS 的 `replace` 字段中，只允许使用 `${n}`（设置页面的循环变量，在源码中明确定义），不允许使用任何其他 `${变量名}` 引用。

#### 禁止 2：翻译在代码逻辑中使用的短字符串

以下字符串在 minified JS 中既是 UI 文本，也是代码逻辑标识符，**不能**放入 TRANSLATIONS 做全局替换：

```javascript
// ❌ 绝对禁止 — 这些字符串在代码逻辑中也被使用
'"file"'        // isomorphic-git 用作 type:"file"
'"files"'       // 同上
'"Commit"'      // automaticsManager.reload("commit") 中使用
'"Push"'        // 同上
'"Pull"'        // 同上
'"Stage"'       // aria-label 和 setDesc 中引用
'"Unstage"'     // 同上
'"Discard"'     // 条件判断中使用
'"Refresh"'     // aria-label 中使用
'"Clear"'       // aria-label 中使用
'"Hide"'        // 下拉选项值，同时是代码逻辑标识
'"Full"'        // 同上
'"Split"'       // 同上
'"Disabled"'    // 同上
'"Custom"'      // 同上
'"Merge"'       // syncMethod 值
'"Rebase"'      // 同上
'"Index"'       // git 内部类型标识
'"Escape"'      // 键盘按键名称
'"Delete"'      // 条件判断中使用
'"Cancel"'      // 同上
'"Changes"'     // 太短，容易误匹配
'"Fetch"'       // 命令标识
'"Preview"'     // aria-label
'"Reload"'      // aria-label
'"Save"'        // aria-label
'"Colored"'     // 下拉选项值
'"Monochrome"'  // 同上
'"Initials"'    // 同上
'"And "'        // 可能匹配代码中的其他位置
'" more files"' // 同上
```

**正确做法**：这些短字符串的翻译应通过更精确的上下文匹配在 TEMPLATE_TRANSLATIONS 中处理，或者直接不翻译（用户可以从上下文理解含义）。

#### 禁止 3：翻译已经被其他翻译替换过的字符串

```javascript
// ❌ 禁止 — 如果 "Split" 已被翻译为 "分屏"，后续正则不能匹配原始英文
search: /the actual diff in "Split" mode/g

// ✅ 如果依赖前序翻译结果，search 中要使用翻译后的文本
search: /the actual diff in "分屏" mode/g
```

### 5.2 安全的翻译模式

以下模式是安全的：

```javascript
// ✅ 完整句子 — 不会在代码逻辑中出现
'"No changes to commit"': '"没有更改可提交"',
'"Source Control"': '"源代码管理"',

// ✅ 带上下文的长字符串
'"Commit all changes"': '"提交所有更改"',
'"Stage current file"': '"暂存当前文件"',

// ✅ TEMPLATE_TRANSLATIONS 中使用固定文本替换
{ search: /setName\(`Auto \$\{n\} interval \(minutes\)`\)/g,
  replace: "setName(`自动${n}间隔（分钟）`)" }
```

### 5.3 上游新增字符串的翻译流程

```bash
# 1. 查看上游本次更新修改了哪些源文件
git diff HEAD~1 --name-only -- 'src/**/*.ts' 'src/**/*.svelte'

# 2. 在变更文件中搜索用户可见字符串
grep -n 'setName(' src/setting/settings.ts
grep -n 'setDesc(' src/setting/settings.ts
grep -n 'new Notice(' src/**/*.ts

# 3. 添加到 TRANSLATIONS（仅完整句子/短语）
# 4. 重新构建并验证设置页面
```

### 5.4 翻译后必须验证

每次修改翻译脚本后，必须执行以下验证：

```bash
# 1. 构建
node esbuild.config.mjs production

# 2. 语法检查
node -c main.js

# 3. 在 Obsidian 中打开设置页面，确认所有区域正常显示
# 4. 如果设置页面崩溃，打开控制台(Ctrl+Shift+I)查看错误
```

**常见错误及原因**：

| 错误信息 | 原因 | 修复方法 |
|----------|------|----------|
| `XX is not a function` | replace 中引用了 minified 变量名 | 从 replace 中移除 `${变量名}` 引用 |
| 设置页面只显示"自动" | 某个翻译破坏了设置渲染代码 | 二分法禁用翻译定位问题条目 |
| `TypeError: Cannot read property` | 短字符串替换破坏了对象属性访问 | 将该短字符串从 TRANSLATIONS 中移除 |

### 5.5 二分法定位问题翻译

如果构建后设置页面崩溃，使用以下方法定位：

1. 在 `applyTranslations()` 函数中，临时将 TEMPLATE_TRANSLATIONS 循环替换为空数组：
   ```javascript
   for (const { search, replace } of []) {  // 临时禁用
   ```
2. 如果问题消失，说明在 TEMPLATE_TRANSLATIONS 中；否则在 TRANSLATIONS 中
3. 对有问题的部分继续二分，直到找到具体条目

---

## 6. 构建失败排查

| 症状 | 原因 | 解决方案 |
|------|------|----------|
| esbuild deadlock（goroutine 错误） | esbuild 平台二进制未安装 | 确认 `pnpm-workspace.yaml` 中 `esbuild: true`，重新 `pnpm install --no-frozen-lockfile` |
| esbuild deadlock（正常构建后） | `context.dispose()` 缺失 | 在 `esbuild.config.mjs` 中 `process.exit(0)` 前添加 `await context.dispose()` |
| 模块找不到 | 依赖未安装 | `pnpm install --no-frozen-lockfile` |
| 翻译数量为 0 | 上游重构了字符串 | 需要更新 `scripts/apply-translations.mjs` |
| TypeScript 编译错误 | 代理字段缺失 | 检查 `src/types.ts` 和 `src/constants.ts` 中的 `proxyUrl` |
| pnpm 交互式确认失败 | 非 TTY 环境 | 确保 `.npmrc` 中有 `confirm-module-purge=false` |

---

## 7. 完整执行流程（快速参考）

```bash
# 1. 暂存本地修改（如有）
git stash

# 2. 获取上游
git fetch upstream

# 3. 合并
git merge upstream/master --no-edit

# 4. 解决冲突（按第 2.2 节策略）
git add <resolved-files>
git commit --no-edit

# 5. 恢复本地修改
git stash pop

# 6. 重新安装依赖
pnpm install --no-frozen-lockfile

# 7. 构建
node esbuild.config.mjs production

# 8. 验证
node -c main.js
grep -c "源代码管理" main.js

# 9. 在 Obsidian 中验证设置页面完整性

# 10. 如有新字符串，更新翻译脚本后重新构建验证
```

---

## 8. 提交规范

| 场景 | 提交信息格式 |
|------|-------------|
| 同步上游 | `merge: 同步上游更新至 <版本号>` |
| 新增翻译 | `i18n: 新增/更新 XX 条翻译` |
| 修复翻译问题 | `fix: 修复翻译脚本 <具体问题>` |
| 代理功能修改 | `feat: <描述>` |
| 构建配置修改 | `chore: <描述>` |

---

## 附录 A：项目文件清单（本项目独有，上游不存在）

```
scripts/apply-translations.mjs    # 翻译核心脚本
src/lang/en.ts                    # 英文字符串定义
src/lang/zh-cn.ts                 # 中文字符串定义
src/lang/index.ts                 # i18n 入口
src/lang/translations.ts          # 翻译类型
README.en.md                      # 英文 README
Sync_i18n.md                      # 本文档
AGENTS.md                         # AI Agent 配置
```

## 附录 B：上游可能的破坏性变更及应对

| 上游变更类型 | 影响 | 应对方案 |
|-------------|------|----------|
| 重命名设置项字符串 | 翻译脚本中的 key 失效 | 更新 `TRANSLATIONS` 中对应的 key |
| 重构 `simpleGit.ts` 的 `setGitInstance` | 代理注入位置变化 | 在新的环境变量设置区域重新插入代理逻辑 |
| 修改 `ObsidianGitSettings` 接口 | 可能影响 `proxyUrl` 字段 | 确认字段仍存在，必要时调整位置 |
| 更换构建工具（esbuild → 其他） | 翻译脚本调用方式变化 | 在新构建流程的 production 构建后调用 `applyTranslations()` |
| 引入官方 i18n 系统 | 可能与本项目方案冲突 | 评估是否迁移到官方方案，或继续使用构建后替换 |
| 升级 pnpm 大版本 | 锁文件格式变化 | 升级本地 pnpm，重新生成锁文件 |

## 附录 C：已知的 minified 变量名陷阱

以下是历史上导致过崩溃的 TEMPLATE_TRANSLATIONS 错误模式，供未来排查参考：

```javascript
// 2026-05-15 修复：iR 是 Array.prototype 的 minified 别名
// 原错误 replace: "如果启用，将在停止编辑文件后每隔${iR(i.settings.autoSaveInterval)}自动${n}。"
// 修复后: "如果启用，将在停止编辑文件后自动${n}。"

// 通用规则：replace 中除 ${n} 外不允许任何 ${} 表达式
// ${n} 安全是因为它是源码中 settings.ts 的循环变量，不是 minified 产物
```

---

_本手册基于 2026-05-15 实际同步操作和翻译崩溃修复经验编写，所有命令和策略均经过验证。_
