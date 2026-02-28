/**
 * 翻译覆盖映射表
 * 
 * 这个文件包含所有需要翻译的英文字符串到中文的映射。
 * 当同步上游时，只需保留此文件不变，合并上游代码即可。
 * 
 * 使用方式：
 * 1. 运行 npm run build 时，会自动替换源代码中的字符串
 * 2. 或者使用 patch 文件方式，在构建后应用翻译
 */

export const TRANSLATIONS: Record<string, string> = {
    // ========== manifest.json 和 package.json ==========
    "Git": "Git (中文版)",
    "Integrate Git version control with automatic backup and other advanced features.": "在 Obsidian.md 中集成 Git 版本控制，自动备份及其他高级功能。",
    
    // ========== 设置页面标题 ==========
    "Automatic": "自动",
    "Commit message": "提交信息",
    "Pull": "拉取",
    "Commit-and-sync": "提交并同步",
    "Hunk management": "代码块管理",
    "Line author information": "行作者信息",
    "History view": "历史记录视图",
    "Source control view": "源代码管理视图",
    "Miscellaneous": "杂项",
    "Authentication/commit author": "认证/提交作者",
    "Commit author": "提交作者",
    "Advanced": "高级",
    "Support": "支持",
    "Donate": "捐赠",

    // ========== 设置项名称 ==========
    "Split timers for automatic commit and sync": "为自动提交和同步使用分离的计时器",
    "Auto push interval (minutes)": "自动推送间隔（分钟）",
    "Auto pull interval (minutes)": "自动拉取间隔（分钟）",
    "Pull on startup": "启动时拉取",
    "Push on commit-and-sync": "提交并同步时推送",
    "Pull on commit-and-sync": "提交并同步时拉取",
    "Signs": "标记",
    "Hunk commands": "代码块命令",
    "Status bar with summary of line changes": "状态栏显示行更改摘要",
    "Show Author": "显示作者",
    "Show Date": "显示日期",
    "Show status bar": "显示状态栏",
    "Show branch status bar": "显示分支状态栏",
    "Show the count of modified files in the status bar": "在状态栏中显示修改文件的数量",
    "Password/Personal access token": "密码/个人访问令牌",
    "Author name for commit": "提交作者名称",
    "Author email for commit": "提交作者邮箱",
    "Update submodules": "更新子模块",
    "Submodule recurse checkout/switch": "子模块递归检出/切换",
    "Custom Git binary path": "自定义 Git 二进制路径",
    "Additional environment variables": "额外的环境变量",
    "Additional PATH environment variable paths": "额外的 PATH 环境变量路径",
    "Reload with new environment variables": "使用新环境变量重新加载",
    "Custom base path (Git repository path)": "自定义基础路径（Git 仓库路径）",
    "Custom Git directory path (Instead of '.git')": "自定义 Git 目录路径（替代 '.git'）",
    "Disable on this device": "在此设备上禁用",
    "Line author information": "行作者信息",
    "Follow movement and copies across files and commits": "跟踪跨文件和提交的移动和复制",
    "Show commit hash": "显示提交哈希",
    "Author name display": "作者名称显示",
    "Authoring date display": "创作日期显示",
    "Custom authoring date format": "自定义创作日期格式",
    "Authoring date display timezone": "创作日期显示时区",
    "Oldest age color": "最旧年龄颜色",
    "Text color": "文本颜色",
    "Ignore whitespace and newlines in changes": "忽略更改中的空白和换行",
    "Preview commit message": "预览提交信息",
    "List filenames affected by commit in the commit body": "在提交正文中列出受影响的文件名",
    "{{date}} placeholder format": "{{date}}占位符格式",
    "{{hostname}} placeholder replacement": "{{hostname}}占位符替换",
    "Commit message on manual commit": "手动提交时的提交信息",
    "Commit message script": "提交信息脚本",
    "Merge strategy": "合并策略",
    "Merge strategy on conflicts": "冲突时的合并策略",
    "Diff view style": "差异视图样式",
    "Disable informative notifications": "禁用信息通知",
    "Disable error notifications": "禁用错误通知",
    "Hide notifications for no changes": "隐藏无更改的通知",
    "File menu integration": "文件菜单集成",
    "Automatically refresh source control view on file changes": "文件更改时自动刷新源代码管理视图",
    "Source control view refresh interval": "源代码管理视图刷新间隔",

    // ========== 设置项描述 ==========
    "Enable to use one interval for commit and another for sync.": "启用后，提交和同步将使用不同的时间间隔。",
    "Push commits every X minutes. Set to 0 (default) to disable.": "每 X 分钟推送提交。设置为 0（默认值）以禁用。",
    "Pull changes every X minutes. Set to 0 (default) to disable.": "每 X 分钟拉取更改。设置为 0（默认值）以禁用。",
    "Automatically pull commits when Obsidian starts.": "当 Obsidian 启动时自动拉取提交。",
    "Show the author of the commit in the history view.": "在历史记录视图中显示提交的作者。",
    "Obsidian must be restarted for this change to take effect.": "必须重新启动 Obsidian 才能使此更改生效。",
    "Show the current branch in the status bar.": "在状态栏中显示当前分支。",
    "Recommended to use Personal Access Token instead of password. Not needed when SSH is set up.": "建议使用个人访问令牌而不是密码。设置 SSH 时不需要。",
    "Specify custom hostname for every device.": "为每个设备指定自定义主机名。",
    "Decide how to integrate commits from your remote branch into your local branch.": "决定如何将远程分支的提交集成到本地分支中。",
    "Decide how to solve conflicts when pulling remote changes. This can be used to favor your local changes or the remote changes automatically.": "决定拉取远程更改时如何解决冲突。可用于自动选择本地更改或远程更改。",
    "This allows you to see your changes right in your editor via colored markers and stage/reset/preview individual hunks.": "这允许您通过彩色标记在编辑器中直接查看更改，并暂存/重置/预览单个代码块。",
    "Adds commands to stage/reset individual Git diff hunks and navigate between them via 'Go to next/prev hunk' commands.": "添加命令以暂存/重置单个 Git 差异代码块，并通过「转到下一个/上一个代码块」命令在它们之间导航。",
    "If and how the author is displayed": "是否以及如何显示作者",
    "Only available on desktop currently.": "目前仅在桌面端可用。",
    "Disable Obsidian Git on this device. Useful for mobile devices or specific setups.": "在此设备上禁用 Obsidian Git。对于移动设备或特定设置很有用。",
    "You will get a pop up to specify your message.": "您将收到一个弹窗来指定您的信息。",
    "Disable informative notifications for git operations to minimize distraction (refer to status bar for updates).": "禁用 Git 操作的信息通知以减少干扰（请参阅状态栏以获取更新）。",
    "Disable error notifications of any kind to minimize distraction (refer to status bar for updates).": "禁用所有类型的错误通知以减少干扰（请参阅状态栏以获取更新）。",
    "Disable notifications for 'No changes to commit/push' to minimize distraction.": "禁用「没有更改可提交/推送」的通知以减少干扰。",
    "Add options to the file menu to stage, unstage and discard changes.": "在文件菜单中添加暂存、取消暂存和放弃更改的选项。",
    "On slower machines this may cause lags. If so, just disable this option.": "在较慢的机器上，这可能会导致卡顿。如果是这样，只需禁用此选项。",
    "Milliseconds to wait after file change before refreshing the Source Control View.": "文件更改后等待刷新源代码管理视图的毫秒数。",
    "A script that is run using 'sh -c' to generate the commit message. May be used to generate commit messages using AI tools. Available placeholders: {{hostname}}, {{date}}.": "使用 'sh -c' 运行的脚本，用于生成提交信息。可用于使用 AI 工具生成提交信息。可用占位符：{{hostname}}、{{date}}。",
    "Update submodules when pulling, pushing, and committing. This will run 'git submodule update --remote --merge' on pull, and 'git submodule foreach git push' on push.": "在拉取、推送和提交时更新子模块。这将在拉取时运行 'git submodule update --remote --merge'，在推送时运行 'git submodule foreach git push'。",
    "When checking out or switching branches, recursively update submodules to match the state of the parent repository.": "在检出或切换分支时，递归更新子模块以匹配父仓库的状态。",
    "Specify a custom path to the Git binary. This is useful if Git is not in the PATH.": "指定 Git 二进制文件的自定义路径。如果 Git 不在 PATH 中，这很有用。",
    "Use each line for one environment variable in the format KEY=VALUE.": "每行使用一个环境变量，格式为 KEY=VALUE。",
    "Use each line for one path": "每行使用一个路径",
    "Reload Obsidian Git with the new environment variables and/or PATH.": "使用新的环境变量和/或 PATH 重新加载 Obsidian Git。",
    "Specify a custom base path for the Git repository. This is useful if the vault is not the root of the Git repository.": "为 Git 仓库指定自定义基础路径。如果仓库不是 Git 仓库的根目录，这很有用。",
    "Specify a custom path to the Git directory (default: .git). This is useful for worktrees or special setups.": "指定 Git 目录的自定义路径（默认：.git）。这对于工作树或特殊设置很有用。",
    "Set the style for the diff view. Note that the actual diff in \"Split\" mode is not generated by Git, but the editor itself instead so it may differ from the diff generated by Git. One advantage of this is that you can edit the text in that view.": "设置差异视图的样式。请注意，「分屏」模式下的实际差异不是由 Git 生成的，而是由编辑器本身生成的，因此可能与 Git 生成的差异不同。这样做的一个优点是您可以在该视图中编辑文本。",

    // ========== 下拉选项 ==========
    "Merge": "合并",
    "Rebase": "变基",
    "Other sync service (Only updates the HEAD without touching the working directory)": "其他同步服务（仅更新 HEAD，不触及工作目录）",
    "None (git default)": "无（git 默认）",
    "Our changes": "我们的更改",
    "Their changes": "他们的更改",
    "Colored": "彩色",
    "Monochrome": "单色",
    "Initials": "首字母",
    "Hide": "隐藏",
    "Full": "完整",
    "Split": "分屏",
    "Unified": "统一",
    "Disabled": "禁用",

    // ========== 按钮文本 ==========
    "Preview": "预览",
    "Reload": "重新加载",

    // ========== 通知消息 ==========
    "No repository found": "未找到仓库",
    "Discarded all changes in tracked files.": "已放弃所有已跟踪文件中的更改。",
    "Discarded all files.": "已放弃所有文件。",
    "Paused automatic routines.": "已暂停自动例程。",
    "Resumed automatic routines.": "已恢复自动例程。",
    "It seems like you are not using GitHub": "看起来您没有使用 GitHub",
    "Automatic routines are currently paused.": "自动例程当前已暂停。",
    "Initialized new repo": "已初始化新仓库",
    "Aborted clone": "已中止克隆",
    "Invalid depth. Aborting clone.": "无效的深度。正在中止克隆。",
    "Cloned new repo.": "已克隆新仓库。",
    "Please restart Obsidian": "请重启 Obsidian",
    "Commit aborted: No commit message provided": "提交已中止：未提供提交信息",
    "No upstream branch is set. Please select one.": "未设置上游分支。请选择一个。",
    "Aborted": "已中止",
    "ObsidianGit: Base path does not exist": "ObsidianGit：基础路径不存在",
    "Git is not ready. When all settings are correct you can configure commit-sync, etc.": "Git 尚未就绪。当所有设置正确时，您可以配置提交同步等。",

    // ========== 源代码管理视图 ==========
    "Staged Changes": "已暂存的更改",
    "Changes": "更改",
    "Recently Pulled Files": "最近拉取的文件",
    "Commit Message": "提交信息",
    "Commit-and-sync": "提交并同步",
    "Stage all": "全部暂存",
    "Unstage all": "全部取消暂存",
    "Change Layout": "更改布局",
    "Commit": "提交",
    "Stage": "暂存",
    "Unstage": "取消暂存",
    "Discard": "放弃",
    "Push": "推送",
    "Pull": "拉取",
    "Refresh": "刷新",
    "Clear": "清除",

    // ========== 工具提示 ==========
    "Hunks are sections of grouped line changes right in your editor.": "代码块是编辑器中分组行更改的部分。",
    "Show the date of the commit in the history view. The {{date}} placeholder format is used to display the date.": "在历史记录视图中显示提交的日期。使用 {{date}} 占位符格式显示日期。",
};

/**
 * 翻译函数 - 用于构建时替换
 */
export function translate(text: string): string {
    return TRANSLATIONS[text] || text;
}
