/**
 * 构建后翻译脚本
 * 
 * 这个脚本会在构建完成后，将 main.js 中的英文字符串替换为中文。
 * 这样可以保持源代码与上游同步，同时提供中文界面。
 * 
 * 使用方式：在 esbuild.config.mjs 中配置构建后运行此脚本
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 翻译映射表
const TRANSLATIONS = {
    // ========== manifest.json 和 package.json ==========
    '"Git"': '"Git (中文版)"',
    '"Integrate Git version control with automatic backup and other advanced features."': '"在 Obsidian.md 中集成 Git 版本控制，自动备份及其他高级功能。"',
    
    // ========== 设置页面标题 ==========
    '"Automatic"': '"自动"',
    '"Commit message"': '"提交信息"',
    '"Commit-and-sync"': '"提交并同步"',
    '"Hunk management"': '"代码块管理"',
    '"Line author information"': '"行作者信息"',
    '"History view"': '"历史记录视图"',
    '"Source control view"': '"源代码管理视图"',
    '"Miscellaneous"': '"杂项"',
    '"Authentication/commit author"': '"认证/提交作者"',
    '"Commit author"': '"提交作者"',
    '"Advanced"': '"高级"',
    '"Support"': '"支持"',
    '"Donate"': '"捐赠"',

    // ========== 设置项名称 ==========
    '"Split timers for automatic commit and sync"': '"为自动提交和同步使用分离的计时器"',
    '"Auto push interval (minutes)"': '"自动推送间隔（分钟）"',
    '"Auto pull interval (minutes)"': '"自动拉取间隔（分钟）"',
    '"Pull on startup"': '"启动时拉取"',
    '"Push on commit-and-sync"': '"提交并同步时推送"',
    '"Pull on commit-and-sync"': '"提交并同步时拉取"',
    '"Signs"': '"标记"',
    '"Hunk commands"': '"代码块命令"',
    '"Status bar with summary of line changes"': '"状态栏显示行更改摘要"',
    '"Show Author"': '"显示作者"',
    '"Show Date"': '"显示日期"',
    '"Show status bar"': '"显示状态栏"',
    '"Show branch status bar"': '"显示分支状态栏"',
    '"Show the count of modified files in the status bar"': '"在状态栏中显示修改文件的数量"',
    '"Password/Personal access token"': '"密码/个人访问令牌"',
    '"Author name for commit"': '"提交作者名称"',
    '"Author email for commit"': '"提交作者邮箱"',
    '"Update submodules"': '"更新子模块"',
    '"Submodule recurse checkout/switch"': '"子模块递归检出/切换"',
    '"Custom Git binary path"': '"自定义 Git 二进制路径"',
    '"Additional environment variables"': '"额外的环境变量"',
    '"Additional PATH environment variable paths"': '"额外的 PATH 环境变量路径"',
    '"Reload with new environment variables"': '"使用新环境变量重新加载"',
    '"Custom base path (Git repository path)"': '"自定义基础路径（Git 仓库路径）"',
    '"Custom Git directory path (Instead \'\.git\')"': '"自定义 Git 目录路径（替代 \'\.git\')"',
    '"Disable on this device"': '"在此设备上禁用"',
    '"Follow movement and copies across files and commits"': '"跟踪跨文件和提交的移动和复制"',
    '"Show commit hash"': '"显示提交哈希"',
    '"Author name display"': '"作者名称显示"',
    '"Authoring date display"': '"创作日期显示"',
    '"Custom authoring date format"': '"自定义创作日期格式"',
    '"Authoring date display timezone"': '"创作日期显示时区"',
    '"Text color"': '"文本颜色"',
    '"Ignore whitespace and newlines in changes"': '"忽略更改中的空白和换行"',
    '"Preview commit message"': '"预览提交信息"',
    '"List filenames affected by commit in the commit body"': '"在提交正文中列出受影响的文件名"',
    '"{{date}} placeholder format"': '"{{date}}占位符格式"',
    '"{{hostname}} placeholder replacement"': '"{{hostname}}占位符替换"',
    '"Commit message on manual commit"': '"手动提交时的提交信息"',
    '"Commit message script"': '"提交信息脚本"',
    '"Merge strategy"': '"合并策略"',
    '"Merge strategy on conflicts"': '"冲突时的合并策略"',
    '"Diff view style"': '"差异视图样式"',
    '"Disable informative notifications"': '"禁用信息通知"',
    '"Disable error notifications"': '"禁用错误通知"',
    '"Hide notifications for no changes"': '"隐藏无更改的通知"',
    '"File menu integration"': '"文件菜单集成"',
    '"Automatically refresh source control view on file changes"': '"文件更改时自动刷新源代码管理视图"',
    '"Source control view refresh interval"': '"源代码管理视图刷新间隔"',

    // ========== 设置项描述 ==========
    '"Enable to use one interval for commit and another for sync."': '"启用后，提交和同步将使用不同的时间间隔。"',
    '"Push commits every X minutes. Set to 0 (default) to disable."': '"每 X 分钟推送提交。设置为 0（默认值）以禁用。"',
    '"Pull changes every X minutes. Set to 0 (default) to disable."': '"每 X 分钟拉取更改。设置为 0（默认值）以禁用。"',
    '"Automatically pull commits when Obsidian starts."': '"当 Obsidian 启动时自动拉取提交。"',
    '"Show the author of the commit in the history view."': '"在历史记录视图中显示提交的作者。"',
    '"Obsidian must be restarted for this change to take effect."': '"必须重新启动 Obsidian 才能使此更改生效。"',
    '"Show the current branch in the status bar."': '"在状态栏中显示当前分支。"',
    '"Recommended to use Personal Access Token instead of password. Not needed when SSH is set up."': '"建议使用个人访问令牌而不是密码。设置 SSH 时不需要。"',
    '"Specify custom hostname for every device."': '"为每个设备指定自定义主机名。"',
    '"Decide how to integrate commits from your remote branch into your local branch."': '"决定如何将远程分支的提交集成到本地分支中。"',
    '"Decide how to solve conflicts when pulling remote changes. This can be used to favor your local changes or the remote changes automatically."': '"决定拉取远程更改时如何解决冲突。可用于自动选择本地更改或远程更改。"',
    '"This allows you to see your changes right in your editor via colored markers and stage/reset/preview individual hunks."': '"这允许您通过彩色标记在编辑器中直接查看更改，并暂存/重置/预览单个代码块。"',
    '"Adds commands to stage/reset individual Git diff hunks and navigate between them via \'Go to next/prev hunk\' commands."': '"添加命令以暂存/重置单个 Git 差异代码块，并通过「转到下一个/上一个代码块」命令在它们之间导航。"',
    '"If and how the author is displayed"': '"是否以及如何显示作者"',
    '"Only available on desktop currently."': '"目前仅在桌面端可用。"',
    '"Disable Obsidian Git on this device. Useful for mobile devices or specific setups."': '"在此设备上禁用 Obsidian Git。对于移动设备或特定设置很有用。"',
    '"You will get a pop up to specify your message."': '"您将收到一个弹窗来指定您的信息。"',
    '"Disable informative notifications for git operations to minimize distraction (refer to status bar for updates)."': '"禁用 Git 操作的信息通知以减少干扰（请参阅状态栏以获取更新）。"',
    '"Disable error notifications of any kind to minimize distraction (refer to status bar for updates)."': '"禁用所有类型的错误通知以减少干扰（请参阅状态栏以获取更新）。"',
    '"Disable notifications for \'No changes to commit/push\' to minimize distraction."': '"禁用「没有更改可提交/推送」的通知以减少干扰。"',
    '"Add options to the file menu to stage, unstage and discard changes."': '"在文件菜单中添加暂存、取消暂存和放弃更改的选项。"',
    '"On slower machines this may cause lags. If so, just disable this option."': '"在较慢的机器上，这可能会导致卡顿。如果是这样，只需禁用此选项。"',
    '"Milliseconds to wait after file change before refreshing the Source Control View."': '"文件更改后等待刷新源代码管理视图的毫秒数。"',
    '"A script that is run using \'sh -c\' to generate the commit message. May be used to generate commit messages using AI tools. Available placeholders: {{hostname}}, {{date}}."': '"使用 \'sh -c\' 运行的脚本，用于生成提交信息。可用于使用 AI 工具生成提交信息。可用占位符：{{hostname}}、{{date}}。"',
    '"Update submodules when pulling, pushing, and committing. This will run \'git submodule update --remote --merge\' on pull, and \'git submodule foreach git push\' on push."': '"在拉取、推送和提交时更新子模块。这将在拉取时运行 \'git submodule update --remote --merge\'，在推送时运行 \'git submodule foreach git push\'。"',
    '"When checking out or switching branches, recursively update submodules to match the state of the parent repository."': '"在检出或切换分支时，递归更新子模块以匹配父仓库的状态。"',
    '"Specify a custom path to the Git binary. This is useful if Git is not in the PATH."': '"指定 Git 二进制文件的自定义路径。如果 Git 不在 PATH 中，这很有用。"',
    '"Use each line for one environment variable in the format KEY=VALUE."': '"每行使用一个环境变量，格式为 KEY=VALUE。"',
    '"Use each line for one path"': '"每行使用一个路径"',
    '"Reload Obsidian Git with the new environment variables and/or PATH."': '"使用新的环境变量和/或 PATH 重新加载 Obsidian Git。"',
    '"Specify a custom base path for the Git repository. This is useful if the vault is not the root of the Git repository."': '"为 Git 仓库指定自定义基础路径。如果仓库不是 Git 仓库的根目录，这很有用。"',
    '"Specify a custom path to the Git directory (default: .git). This is useful for worktrees or special setups."': '"指定 Git 目录的自定义路径（默认：.git）。这对于工作树或特殊设置很有用。"',
    '"Set the style for the diff view. Note that the actual diff in \\"Split\\" mode is not generated by Git, but the editor itself instead so it may differ from the diff generated by Git. One advantage of this is that you can edit the text in that view."': '"设置差异视图的样式。请注意，「分屏」模式下的实际差异不是由 Git 生成的，而是由编辑器本身生成的，因此可能与 Git 生成的差异不同。这样做的一个优点是您可以在该视图中编辑文本。"',
    '"Show the date of the commit in the history view. The {{date}} placeholder format is used to display the date."': '"在历史记录视图中显示提交的日期。使用 {{date}} 占位符格式显示日期。"',
    '"Hunks are sections of grouped line changes right in your editor."': '"代码块是编辑器中分组行更改的部分。"',
    '"If and how the authoring date is displayed. The formats for relative and custom date formats can be configured below."': '"是否以及如何显示创作日期。相对日期和自定义日期格式的格式可以在下方配置。"',
    '"Specify custom date format. E.g. \\"YYYY-MM-DD HH:mm:ss\\". See Moment.js for more formats."': '"指定自定义日期格式。例如：\\"YYYY-MM-DD HH:mm:ss\\"。有关更多格式，请参阅 Moment.js。"',
    '"Available placeholders: {{date}} (see below), {{hostname}} (see below), {{numFiles}} (number of changed files in the commit) and {{files}} (changed files in commit message)."': '"可用占位符：{{date}}（见下文）、{{hostname}}（见下文）、{{numFiles}}（提交中更改的文件数量）和 {{files}}（提交信息中的更改文件）。"',
    '"Available placeholders: {{date}} (see below), {{hostname}} (see below), {{numFiles}} (number of changed files in the commit) and {{files}} (changed files in commit message). Leave empty to require manual input on each commit."': '"可用占位符：{{date}}（见下文）、{{hostname}}（见下文）、{{numFiles}}（提交中更改的文件数量）和 {{files}}（提交信息中的更改文件）。留空则每次提交时需要手动输入。"',
    '"Show commit authoring information next to each line"': '"在每行旁边显示提交作者信息"',
    '"If and how the date and time of authoring the line is displayed"': '"是否以及如何显示行作者的创作日期和时间"',

    // ========== 下拉选项 ==========
    '"Merge"': '"合并"',
    '"Rebase"': '"变基"',
    '"Other sync service (Only updates the HEAD without touching the working directory)"': '"其他同步服务（仅更新 HEAD，不触及工作目录）"',
    '"None (git default)"': '"无（git 默认）"',
    '"Our changes"': '"我们的更改"',
    '"Their changes"': '"他们的更改"',
    '"Colored"': '"彩色"',
    '"Monochrome"': '"单色"',
    '"Initials"': '"首字母"',
    '"Initials (default)"': '"首字母（默认）"',
    '"Hide"': '"隐藏"',
    '"Full"': '"完整"',
    '"Full name"': '"全名"',
    '"First name"': '"名字"',
    '"Last name"': '"姓氏"',
    '"Split"': '"分屏"',
    '"Unified"': '"统一"',
    '"Disabled"': '"禁用"',
    '"Date (default)"': '"日期（默认）"',
    '"Date and time"': '"日期和时间"',
    '"Natural language"': '"自然语言"',
    '"Custom"': '"自定义"',
    '"My local (default)"': '"我的本地（默认）"',
    '"Author\'s local"': '"作者本地"',
    '"UTC+0000/Z"': '"UTC+0000/Z"',
    '"Do not follow (default)"': '"不跟踪（默认）"',
    '"Follow within same commit"': '"在同一提交内跟踪"',
    '"Follow within all commits (maybe slow)"': '"在所有提交内跟踪（可能较慢）"',

    // ========== 按钮文本 ==========
    '"Preview"': '"预览"',
    '"Reload"': '"重新加载"',
    '"Save"': '"保存"',

    // ========== 通知消息 ==========
    '"No repository found"': '"未找到仓库"',
    '"Discarded all changes in tracked files."': '"已放弃所有已跟踪文件中的更改。"',
    '"Discarded all files."': '"已放弃所有文件。"',
    '"Paused automatic routines."': '"已暂停自动例程。"',
    '"Resumed automatic routines."': '"已恢复自动例程。"',
    '"It seems like you are not using GitHub"': '"看起来您没有使用 GitHub"',
    '"Automatic routines are currently paused."': '"自动例程当前已暂停。"',
    '"Initialized new repo"': '"已初始化新仓库"',
    '"Aborted clone"': '"已中止克隆"',
    '"Invalid depth. Aborting clone."': '"无效的深度。正在中止克隆。"',
    '"Cloned new repo."': '"已克隆新仓库。"',
    '"Please restart Obsidian"': '"请重启 Obsidian"',
    '"Commit aborted: No commit message provided"': '"提交已中止：未提供提交信息"',
    '"No upstream branch is set. Please select one."': '"未设置上游分支。请选择一个。"',
    '"Aborted"': '"已中止"',
    '"ObsidianGit: Base path does not exist"': '"ObsidianGit：基础路径不存在"',
    '"Git is not ready. When all settings are correct you can configure commit-sync, etc."': '"Git 尚未就绪。当所有设置正确时，您可以配置提交同步等。"',
    '"Successfully deleted repository. Reloading plugin..."': '"已成功删除仓库。正在重新加载插件..."',

    // ========== 源代码管理视图 ==========
    '"Staged Changes"': '"已暂存的更改"',
    '"Changes"': '"更改"',
    '"Recently Pulled Files"': '"最近拉取的文件"',
    '"Commit Message"': '"提交信息"',
    '"Stage all"': '"全部暂存"',
    '"Unstage all"': '"全部取消暂存"',
    '"Change Layout"': '"更改布局"',
    '"Commit"': '"提交"',
    '"Stage"': '"暂存"',
    '"Unstage"': '"取消暂存"',
    '"Discard"': '"放弃"',
    '"Push"': '"推送"',
    '"Pull"': '"拉取"',
    '"Refresh"': '"刷新"',
    '"Clear"': '"清除"',

    // ========== 命令名称 ==========
    '"Edit .gitignore"': '"编辑 .gitignore"',
    '"Open source control view"': '"打开源代码管理视图"',
    '"Open history view"': '"打开历史视图"',
    '"Open diff view"': '"打开差异视图"',
    '"Open file on GitHub"': '"在 GitHub 上打开文件"',
    '"Open file history on GitHub"': '"在 GitHub 上打开文件历史"',
    '"Pull"': '"拉取"',
    '"Fetch"': '"获取"',
    '"Switch to remote branch"': '"切换到远程分支"',
    '"Add file to .gitignore"': '"添加文件到 .gitignore"',
    '"Commit-and-sync"': '"提交并同步"',
    '"Commit-and-sync and then close Obsidian"': '"提交并同步后关闭 Obsidian"',
    '"Commit-and-sync with specific message"': '"使用特定信息提交并同步"',
    '"Commit all changes"': '"提交所有更改"',
    '"Commit all changes with specific message"': '"使用特定信息提交所有更改"',
    '"Commit"': '"提交"',
    '"Commit staged"': '"提交已暂存"',
    '"Commit staged with specific message"': '"使用特定信息提交已暂存"',
    '"Commit with specific message"': '"使用特定信息提交"',
    '"Amend staged"': '"修正已暂存"',
    '"Push"': '"推送"',
    '"Stage current file"': '"暂存当前文件"',
    '"Unstage current file"': '"取消暂存当前文件"',
    '"Edit remotes"': '"编辑远程仓库"',
    '"Remove remote"': '"删除远程仓库"',
    '"Set upstream branch"': '"设置上游分支"',
    '"CAUTION: Delete repository"': '"注意：删除仓库"',
    '"CAUTION: Discard all changes"': '"注意：放弃所有更改"',
    '"Initialize a new repo"': '"初始化新仓库"',
    '"Clone an existing remote repo"': '"克隆现有的远程仓库"',
    '"List changed files"': '"列出更改的文件"',
    '"Switch branch"': '"切换分支"',
    '"Create new branch"': '"创建新分支"',
    '"Delete branch"': '"删除分支"',
    '"Pause/Resume automatic routines"': '"暂停/恢复自动例程"',
    '"Raw command"': '"原始命令"',
    '"Toggle line author information"': '"切换行作者信息"',
    '"Reset hunk"': '"重置代码块"',
    '"Stage hunk"': '"暂存代码块"',
    '"Preview hunk"': '"预览代码块"',
    '"Go to next hunk"': '"转到下一个代码块"',
    '"Go to previous hunk"': '"转到上一个代码块"',

    // ========== 状态消息 ==========
    '"No changes"': '"没有更改"',
    '"No changes to commit"': '"没有更改可提交"',
    '"No commits to push"': '"没有提交可推送"',
    '"No network connection available"': '"没有可用的网络连接"',
    '"Git is offline"': '"Git 处于离线状态"',
    '"Git is ready"': '"Git 已就绪"',
    '"Updating workdir"': '"正在更新工作目录"',
    '"Cloning"': '"正在克隆"',
    '"Fetching"': '"正在获取"',
    '"Pushing"': '"正在推送"',
    '"Fetched from remote"': '"已从远程获取"',
    '"Pushed to remote"': '"已推送到远程"',
    '"Checking repository status..."': '"正在检查仓库状态..."',
    '"Adding files..."': '"正在添加文件..."',
    '"Committing changes..."': '"正在提交更改..."',
    '"Analyzing workdir"': '"正在分析工作目录"',
    '"Initializing clone"': '"正在初始化克隆"',
    '"Initializing fetch"': '"正在初始化获取"',
    '"Initializing pull"': '"正在初始化拉取"',
    '"Initializing push"': '"正在初始化推送"',
    '"Receiving objects"': '"正在接收对象"',
    '"Resolving deltas"': '"正在解析增量"',
    '"Fetching remote branches"': '"正在获取远程分支"',
    '"Finished pull"': '"拉取完成"',
    '"Starting task"': '"正在开始任务"',
    '"Reloading settings"': '"正在重新加载设置"',
    '"Git view mounted"': '"Git 视图已挂载"',
    '"Where is my file !!!"': '"我的文件在哪里！！！"',
    '"Too many files to list"': '"文件太多，无法列出"',
    '"Too many changes to display"': '"更改太多，无法显示"',
    '"Diff too big to be displayed"': '"差异太大，无法显示"',
    '"Binary file"': '"二进制文件"',
    '"Binary files"': '"二进制文件"',
    '"Pull: Everything is up-to-date"': '"拉取：一切都是最新的"',
    '"You have merge conflicts. Resolve them and commit afterwards."': '"存在合并冲突。请解决冲突后提交。"',
    '"Git: Going into offline mode. Future network errors will no longer be displayed."': '"Git：进入离线模式。未来的网络错误将不再显示。"',
    '"Failed on initialization!"': '"初始化失败！"',

    // ========== 对话框和提示 ==========
    '"Cancel"': '"取消"',
    '"Delete"': '"删除"',
    '"DELETE ALL YOUR LOCAL CONFIG AND PLUGINS"': '"删除所有本地配置和插件"',
    '"Enter remote URL"': '"输入远程 URL"',
    '"Select branch to checkout"': '"选择要检出的分支"',
    '"Select a remote"': '"选择远程仓库"',
    '"Select or create a new remote branch by typing its name and selecting it"': '"输入名称并选择以选择或创建新的远程分支"',
    '"Select or create a new remote by typing its name and selecting it"': '"输入名称并选择以选择或创建新的远程仓库"',
    '"Specify your username"': '"指定您的用户名"',
    '"Enter a response to the message."': '"输入对消息的回复。"',
    '"Enter directory for clone. It needs to be empty or not existent."': '"输入克隆目录。它需要为空或不存在。"',
    '"Auto backup: Please enter a custom commit message. Leave empty to abort"': '"自动备份：请输入自定义提交信息。留空则中止"',
    '"Authentication failed. Please try with different credentials"': '"认证失败。请尝试使用其他凭据"',
    '"Debug information copied to clipboard. May contain sensitive information!"': '"调试信息已复制到剪贴板。可能包含敏感信息！"',
    '"Do you really want to delete the repository (.git directory)? plugin action cannot be undone."': '"您真的要删除仓库（.git 目录）吗？插件操作无法撤销。"',
    '"Don\'t show notifications when there are no changes to commit or push."': '"当没有更改可提交或推送时不显示通知。"',
    '"Disables the plugin on this device. This setting is not synced."': '"在此设备上禁用插件。此设置不同步。"',
    '"Can\'t find a valid git repository. Please create one via the given command or clone an existing repo."': '"找不到有效的 Git 仓库。请通过给定命令创建一个或克隆现有仓库。"',
    '"Did not commit, because you have conflicts. Please resolve them and commit per command."': '"未提交，因为存在冲突。请解决冲突后通过命令提交。"',
    '"Cannot push. You have conflicts"': '"无法推送。存在冲突"',
    '"A simple fast-forward merge was not possible."': '"无法进行简单的快进合并。"',
    '"Remote branch is not configured"': '"远程分支未配置"',
    '"Aborted. No upstream-branch is set!"': '"已中止。未设置上游分支！"',
    '"Type in your password. You won\'t be able to see it again."': '"输入您的密码。您将无法再次查看它。"',
    '"Username on your git server. E.g. your username on GitHub"': '"您的 Git 服务器用户名。例如：您的 GitHub 用户名"',
    '"These settings usually don\'t need to be changed, but may be required for special setups."': '"这些设置通常不需要更改，但对于特殊设置可能是必需的。"',
    '"Not supported files will be opened by default app!"': '"不支持的文件将使用默认应用打开！"',
    '"Type your message and select optional the version with the added date."': '"输入您的消息，并可选择添加日期的版本。"',
    '"This branch isn\'t merged into HEAD. Force delete?"': '"此分支未合并到 HEAD。强制删除？"',
    '"Specify depth of clone. Leave empty for full clone."': '"指定克隆深度。留空则进行完整克隆。"',
    '"Untracked"': '"未跟踪"',
    '"Working Dir"': '"工作目录"',
    '"Index"': '"索引"',

    // ========== 视图和标题 ==========
    '"Source Control"': '"源代码管理"',
    '"History"': '"历史记录"',
    '"Diff View"': '"差异视图"',
    '"Diff view"': '"差异视图"',
    '"Git View"': '"Git 视图"',
    '"Open File"': '"打开文件"',
    '"Vault Root"': '"仓库根目录"',
    '"Edit .gitignore"': '"编辑 .gitignore"',
    '"Open in default app"': '"在默认应用中打开"',
    '"Show in system explorer"': '"在系统资源管理器中显示"',
    '"Open File"': '"打开文件"',

    // ========== 文件状态 ==========
    '"And "': '"还有 "',
    '" more files"': '" 个文件"',
    '"file"': '"文件"',
    '"files"': '"文件"',
    '"untracked file"': '"未跟踪文件"',
    '"tracked file"': '"已跟踪文件"',

    // ========== 错误消息 ==========
    '"Failed to get current branch name"': '"获取当前分支名称失败"',
    '"Failed to get remote url"': '"获取远程 URL 失败"',
    '"Failed to get remote url of submodule"': '"获取子模块远程 URL 失败"',
    '"Could not parse remote url"': '"无法解析远程 URL"',
    '"Could not resolve host"': '"无法解析主机"',
    '"Unable to resolve host"': '"无法解析主机"',
    '"Unable to open connection"': '"无法打开连接"',
    '"Invalid refspec"': '"无效的引用规格"',
    '"Git clean interactive mode is not supported"': '"不支持 Git clean 交互模式"',
    '"Update Index"': '"更新索引"',
    '"Update Working Dir"': '"更新工作目录"',
    '"Commit must be a string"': '"提交必须是字符串"',
    '"Config value is not a string"': '"配置值不是字符串"',
    '"Escape"': '"退出"',
    '"Cannot run git command. Trying to run: "': '"无法运行 Git 命令。尝试运行："',
    '"Git: Error in trackChanged."': '"Git：跟踪更改时出错。"',
    '"Git: Error while loading line authoring feature."': '"Git：加载行作者功能时出错。"',
    '"Git: Attempted to track change of undefined filepath. Unforeseen situation."': '"Git：尝试跟踪未定义文件路径的更改。意外情况。"',
    '"Git: undefined lineAuthorInfoProvider. Unexpected situation."': '"Git：未定义的 lineAuthorInfoProvider。意外情况。"',
    '"Aborted, because the following files are too big"': '"已中止，因为以下文件太大"',
    '"Please remove them or add to .gitignore."': '"请删除它们或添加到 .gitignore。"',
    '"Adding task to the queue, commands = "': '"正在将任务添加到队列，命令 = "',
    '"A fatal exception occurred in a previous task, the queue has been purged"': '"上一个任务中发生了致命异常，队列已被清除"',
    '"Fatal exception, any as-yet un-started tasks run through this executor will not be attempted"': '"致命异常，此执行器中尚未启动的任务将不会被执行"',
    '"Stdout from commit message script is empty. Using default message."': '"提交信息脚本的标准输出为空。使用默认信息。"',
    '"Empty response from git server."': '"Git 服务器响应为空。"',
    '"Encountered network error, but already in offline mode"': '"遇到网络错误，但已处于离线模式"',

    // ========== 冲突解决 ==========
    '"Please resolve them and commit them using the commands `Git: Commit all changes` followed by `Git: Push`"': '"请解决冲突，然后使用命令「Git：提交所有更改」后跟「Git：推送」提交"',
    '"I strongly recommend to use \\"Source mode\\" for viewing the conflicted files. For simple conflicts, in each file listed above replace every occurrence of the following text blocks with the desired text."': '"我强烈建议使用「源码模式」查看冲突文件。对于简单冲突，在上面列出的每个文件中，将以下文本块的每次出现替换为所需的文本。"',
    '"Are you sure you want to DELETE the "': '"您确定要删除 "',
    '"Are you sure you want to discard ALL changes in "': '"您确定要放弃 "',
    '"They are deleted according to your Obsidian trash settting."': '"它们将根据您的 Obsidian 回收站设置被删除。"',
    '"Discard all "': '"放弃所有 "',
    '"Delete all "': '"删除所有 "',

    // ========== 新增用户可见字符串 ==========
    '"Abort clone"': '"中止克隆"',
    '"Add to .gitignore"': '"添加到 .gitignore"',
    '"Checkout"': '"检出"',
    '"Close hunk"': '"关闭代码块"',
    '"Commit and sync"': '"提交并同步"',
    '"Copy commit hash"': '"复制提交哈希"',
    '"Copy Debug Information"': '"复制调试信息"',
    '"CTRL + SHIFT + I"': '"Ctrl + Shift + I"',
    '"Custom Git directory path (Instead of \'\.git\')"': '"自定义 Git 目录路径（替代 \'\.git\')"',
    '"Git diff of the current editor"': '"当前编辑器的 Git 差异"',
    '"GIT_DIR=/path/to/git/dir"': '"GIT_DIR=/path/to/git/dir"',
    '"Git: Add to .gitignore"': '"Git：添加到 .gitignore"',
    '"Git: Stage"': '"Git：暂存"',
    '"Git: Unstage"': '"Git：取消暂存"',
    '"Oldest age in coloring"': '"着色中的最旧年龄"',
    '"Open Git source control"': '"打开 Git 源代码管理"',
    '"Pulling...."': '"正在拉取...."',
    '"Pulling changes..."': '"正在拉取更改..."',
    '"Pushing...."': '"正在推送...."',
    '"Pushing changes..."': '"正在推送更改..."',
    '"Revert this chunk"': '"恢复此块"',
    '"Show author "': '"显示作者 "',
    '"Source mode"': '"源码模式"',
    '"Specify your password/personal access token"': '"指定您的密码/个人访问令牌"',
    '"This takes longer: Getting status"': '"耗时较长：正在获取状态"',
    '"Unstage hunk"': '"取消暂存代码块"',
    '"vault backup: {{date}}"': '"仓库备份：{{date}}"',
};

// 需要特殊处理的模板字符串（包含换行等）
const TEMPLATE_TRANSLATIONS = [
    {
        // file/files 替换
        search: /"untracked file"/g,
        replace: '"未跟踪文件"'
    },
    {
        search: /"tracked file"/g,
        replace: '"已跟踪文件"'
    },
];

function applyTranslations() {
    const mainJsPath = join(__dirname, '..', 'main.js');
    
    console.log('正在应用中文翻译...');
    
    let content = readFileSync(mainJsPath, 'utf-8');
    let replaceCount = 0;
    
    // 应用简单字符串替换
    for (const [english, chinese] of Object.entries(TRANSLATIONS)) {
        if (content.includes(english)) {
            content = content.split(english).join(chinese);
            replaceCount++;
        }
    }
    
    // 应用模板字符串替换
    for (const { search, replace } of TEMPLATE_TRANSLATIONS) {
        const matches = content.match(search);
        if (matches) {
            content = content.replace(search, replace);
            replaceCount += matches.length;
        }
    }
    
    writeFileSync(mainJsPath, content, 'utf-8');
    
    console.log(`✅ 翻译完成！已替换 ${replaceCount} 个字符串。`);
}

export { applyTranslations };