# Obsidian Git 中文版同步与汉化自动化手册

> **适用对象**: AI 工具（Cursor, Copilot, ChatGPT, Claude 等）
> **执行目标**: 同步上游仓库并完成差异化汉化
> **项目特点**: 构建后字符串替换方案（源代码保持英文）

---

## 1. 上游同步

### 1.1 检查并配置上游仓库

```bash
# 检查上游仓库是否已配置
git remote -v | grep upstream

# 如果没有上游仓库，添加它
git remote add upstream https://github.com/denolehov/obsidian-git.git
```

### 1.2 获取上游最新代码

```bash
# 获取上游所有更新
git fetch upstream

# 查看本地与上游的差异
git log HEAD..upstream/master --oneline
```

### 1.3 合并上游更新

```bash
# 合并上游 master 分支到当前分支
git merge upstream/master
```

**如果发生冲突**:
```bash
# 查看冲突文件列表
git diff --name-only --diff-filter=U

# 冲突解决完成后
git add .
git commit -m "merge: 同步上游更新"
```

---

## 2. 智能汉化

### 2.1 本项目汉化方案说明

```
汉化原理：构建后字符串替换
├── 源代码保持英文 → 方便与上游同步
├── scripts/apply-translations.mjs → 翻译脚本（核心文件）
│   ├── TRANSLATIONS → 静态字符串映射
│   └── TEMPLATE_TRANSLATIONS → 模板字符串正则替换
├── esbuild.config.mjs → 构建配置，调用翻译脚本
└── main.js → 构建产物，翻译脚本替换其中的字符串
```

### 2.2 识别变更的源文件

```bash
# 获取本次同步修改的 TypeScript 源文件
git diff HEAD~1 --name-only --diff-filter=M -- 'src/**/*.ts'
git diff HEAD~1 --name-only --diff-filter=A -- 'src/**/*.ts'

# 获取 Svelte 组件变更
git diff HEAD~1 --name-only --diff-filter=M -- 'src/**/*.svelte'
git diff HEAD~1 --name-only --diff-filter=A -- 'src/**/*.svelte'
```

### 2.3 提取需要翻译的字符串

**AI 执行指令**: 对于每个变更的源文件，搜索以下模式：

**可翻译的字符串模式**:
```bash
# 设置项名称
grep -oE 'setName\("[^"]+"\)' src/**/*.ts

# 设置项描述
grep -oE 'setDesc\("[^"]+"\)' src/**/*.ts
grep -oE 'setDesc\(`[^`]+`\)' src/**/*.ts

# 用户消息
grep -oE 'displayMessage\("[^"]+"' src/**/*.ts
grep -oE 'displayError\("[^"]+"' src/**/*.ts
```

**翻译规则**:

| 类型 | 格式 | 示例 |
|-----|------|------|
| 静态字符串 | 带引号 | `"Source Control"` → `"源代码管理"` |
| 模板字符串 | 正则匹配 | `setName(\`Auto ${n}...\`)` → 正则替换 |

**排除规则（不翻译）**:
- ❌ 变量名、函数名、属性名
- ❌ 代码标识符（如 `commit-and-sync` 用作逻辑判断值）
- ❌ Git 命令字符串（如 `"git pull"`）
- ❌ 技术标识符（如 `"YYYY-MM-DD"`）
- ❌ URL 和文件路径
- ❌ 无引号的字符串（会破坏代码结构）

### 2.4 更新翻译脚本

将提取的字符串添加到 `scripts/apply-translations.mjs`：

**静态字符串** → 添加到 `TRANSLATIONS` 对象：
```javascript
const TRANSLATIONS = {
    // 已有翻译...
    
    // 新增翻译
    '"New Setting Name"': '"新设置名称"',
    '"New description text"': '"新的描述文本"',
};
```

**模板字符串** → 添加到 `TEMPLATE_TRANSLATIONS` 数组：
```javascript
const TEMPLATE_TRANSLATIONS = [
    // 已有翻译...
    
    // 新增模板翻译
    {
        // 注释说明
        search: /New template pattern with \$\{variable\}/g,
        replace: '新的模板模式 ${variable}'
    },
];
```

### 2.5 冲突处理规则

| 冲突文件类型 | 处理策略 | 原因 |
|-------------|---------|------|
| `src/**/*.ts` | **保留上游更改** | 源代码应与上游同步，汉化通过翻译脚本实现 |
| `src/**/*.svelte` | **保留上游更改** | 同上 |
| `scripts/apply-translations.mjs` | **保留本地内容** | 这是汉化核心文件，包含所有翻译条目 |
| `esbuild.config.mjs` | **保留翻译脚本调用** | 必须保留 `applyTranslations()` 调用 |
| `manifest.json` | **保留中文描述** | `name: "Git (中文版)"` |
| `package.json` | **保留中文描述** | 中文功能描述 |

**冲突处理步骤**:
```bash
# 1. 查看冲突文件
git diff --name-only --diff-filter=U

# 2. 对于源文件冲突，接受上游版本
git checkout --theirs src/path/to/file.ts

# 3. 对于翻译脚本冲突，保留本地版本
git checkout --ours scripts/apply-translations.mjs

# 4. 标记冲突已解决
git add .

# 5. 完成合并
git commit -m "merge: 同步上游更新"
```

### 2.6 构建与验证

```bash
# 安装依赖（如有新增）
npm install --legacy-peer-deps

# 构建项目（自动应用翻译）
npm run build

# 验证构建产物语法
node -c main.js

# 检查关键翻译是否存在
grep -c "源代码管理" main.js
grep -c "提交并同步" main.js
```

**构建失败排查**:
```bash
# 检查翻译脚本语法
node -c scripts/apply-translations.mjs

# 检查正则表达式是否有错误
# 常见问题：转义字符、引号不匹配
```

---

## 3. 总结报告

执行完成后，按以下格式输出变更摘要：

### 报告模板

```markdown
## 同步与汉化完成报告

### 同步信息
- 同步时间: YYYY-MM-DD HH:mm
- 上游提交: [commit hash 前7位]
- 新增提交: [数量] 个
- 冲突文件: [数量] 个

### 变更文件列表
| 文件路径 | 变更类型 | 处理方式 |
|---------|---------|---------|
| src/main.ts | 修改 | 保留上游，提取新字符串 |
| src/setting/settings.ts | 修改 | 保留上游，提取新字符串 |
| scripts/apply-translations.mjs | 修改 | 保留本地，新增翻译 |

### 汉化统计
- 新增翻译条目: [数量] 个
- 修改翻译条目: [数量] 个
- 总翻译条目: [数量] 个

### 构建验证
- 构建状态: ✅ 成功 / ❌ 失败
- main.js 大小: [KB]
- 语法检查: ✅ 通过 / ❌ 未通过

### 待处理事项
- [ ] 未翻译字符串: [列出具体字符串]
- [ ] 其他问题: [描述]
```

---

## 附录：完整执行流程

```bash
# Step 1: 获取上游更新
git fetch upstream

# Step 2: 合并上游
git merge upstream/master

# Step 3: 解决冲突（如有）
# 按冲突处理规则处理

# Step 4: 提取新字符串（AI 分析变更文件）
# 搜索 setName/setDesc/displayMessage 等模式

# Step 5: 更新翻译脚本
# 编辑 scripts/apply-translations.mjs

# Step 6: 构建
npm run build

# Step 7: 验证
node -c main.js

# Step 8: 输出总结报告
```

---

## 附录：翻译脚本结构参考

```javascript
// scripts/apply-translations.mjs 结构

const TRANSLATIONS = {
    // 设置项名称
    '"Source Control"': '"源代码管理"',
    '"Commit"': '"提交"',
    
    // 设置项描述
    '"Show the current branch"': '"显示当前分支"',
    
    // 用户消息
    '"No changes to commit"': '"没有更改可提交"',
};

const TEMPLATE_TRANSLATIONS = [
    {
        // 模板字符串翻译
        search: /setName\(`Auto \$\{n\} interval \(minutes\)`\)/g,
        replace: 'setName(`自动${n}间隔（分钟）`)'
    },
];

function applyTranslations() {
    // 读取 main.js
    // 替换字符串
    // 写回 main.js
}

export { applyTranslations };
```

---

*本手册用于指导 AI 自动化执行 Obsidian Git 中文版的同步与汉化流程*
