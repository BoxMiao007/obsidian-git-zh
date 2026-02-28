/**
 * 简体中文语言包 - Obsidian Git 插件
 */
export default {
    // Common
    common: {
        commit: "提交",
        push: "推送",
        pull: "拉取",
        stage: "暂存",
        unstage: "取消暂存",
        discard: "放弃",
        refresh: "刷新",
        clear: "清除",
        preview: "预览",
        reload: "重新加载",
        disabled: "禁用",
        hide: "隐藏",
        full: "完整",
    },

    // Settings headings
    settings: {
        automatic: "自动",
        commitMessage: "提交信息",
        pull: "拉取",
        commitAndSync: "提交并同步",
        hunkManagement: "代码块管理",
        lineAuthorInfo: "行作者信息",
        historyView: "历史记录视图",
        sourceControlView: "源代码管理视图",
        miscellaneous: "杂项",
        authentication: "认证/提交作者",
        commitAuthor: "提交作者",
        advanced: "高级",
        support: "支持",
        donate: "捐赠",
    },

    // Settings items
    settingItems: {
        splitTimers: {
            name: "为自动提交和同步使用分离的计时器",
            desc: "启用后，提交和同步将使用不同的时间间隔。",
        },
        autoCommitInterval: {
            name: "自动{{commitOrSync}}间隔（分钟）",
            desc: "每 X 分钟{{action}}更改。设置为 0（默认值）以禁用。（请参阅下方的设置以获取更多配置！）",
        },
        autoCommitAfterFileEdit: {
            name: "停止编辑文件后自动{{commitOrSync}}",
            desc: "要求{{commitOrSync}}间隔不为 0。\n如果开启，则在停止编辑文件后每隔{{interval}}自动{{commitOrSync}}。\n这还可以防止在编辑文件时自动{{commitOrSync}}。如果关闭，则与上次文件编辑无关。",
        },
        autoCommitAfterLatestCommit: {
            name: "在最新提交后自动{{commitOrSync}}",
            desc: "如果开启，将上次自动{{commitOrSync}}时间戳设置为最新提交时间戳。这可以减少手动提交时自动{{commitOrSync}}的频率。",
        },
        autoPushInterval: {
            name: "自动推送间隔（分钟）",
            desc: "每 X 分钟推送提交。设置为 0（默认值）以禁用。",
        },
        autoPullInterval: {
            name: "自动拉取间隔（分钟）",
            desc: "每 X 分钟拉取更改。设置为 0（默认值）以禁用。",
        },
        autoCommitOnlyStaged: {
            name: "自动{{commitOrSync}}仅暂存的文件",
            desc: "如果开启，{{commitOrSync}}时仅提交已暂存的文件。如果关闭，则提交所有更改的文件。",
        },
        customMessageOnAutoBackup: {
            name: "在自动{{commitOrSync}}时指定自定义提交信息",
            desc: "您将收到一个弹窗来指定您的信息。",
        },
        commitMessageOnAutoCommit: {
            name: "自动{{commitOrSync}}时的提交信息",
            desc: "可用占位符：{{date}}（见下文）、{{hostname}}（见下文）、{{numFiles}}（提交中更改的文件数量）和 {{files}}（提交信息中的更改文件）。",
        },
        commitMessageOnManualCommit: {
            name: "手动提交时的提交信息",
            desc: "可用占位符：{{date}}（见下文）、{{hostname}}（见下文）、{{numFiles}}（提交中更改的文件数量）和 {{files}}（提交信息中的更改文件）。留空则每次提交时需要手动输入。",
        },
        commitMessageScript: {
            name: "提交信息脚本",
            desc: "使用 'sh -c' 运行的脚本，用于生成提交信息。可用于使用 AI 工具生成提交信息。可用占位符：{{hostname}}、{{date}}。",
        },
        dateFormat: {
            name: "{{date}}占位符格式",
            desc: "指定自定义日期格式。例如：\"{{format}}\"。有关更多格式，请参阅 Moment.js。",
        },
        hostnamePlaceholder: {
            name: "{{hostname}}占位符替换",
            desc: "为每个设备指定自定义主机名。",
        },
        previewCommitMessage: {
            name: "预览提交信息",
        },
        listChangedFilesInMessageBody: {
            name: "在提交正文中列出受影响的文件名",
        },
        mergeStrategy: {
            name: "合并策略",
            desc: "决定如何将远程分支的提交集成到本地分支中。",
        },
        mergeStrategyOnConflicts: {
            name: "冲突时的合并策略",
            desc: "决定拉取远程更改时如何解决冲突。可用于自动选择本地更改或远程更改。",
        },
        pullOnStartup: {
            name: "启动时拉取",
            desc: "当 Obsidian 启动时自动拉取提交。",
        },
        pushOnCommitAndSync: {
            name: "提交并同步时推送",
            desc: "大多数情况下，您希望在提交后推送。关闭此项将使提交并同步操作变为仅提交{{andPull}}。它仍将被称为提交并同步。",
        },
        pullOnCommitAndSync: {
            name: "提交并同步时拉取",
            desc: "在提交并同步时，同时拉取提交。关闭此项将使提交并同步操作变为仅提交{{andPush}}。",
        },
        signs: {
            name: "标记",
            desc: "这允许您通过彩色标记在编辑器中直接查看更改，并暂存/重置/预览单个代码块。",
        },
        hunkCommands: {
            name: "代码块命令",
            desc: "添加命令以暂存/重置单个 Git 差异代码块，并通过「转到下一个/上一个代码块」命令在它们之间导航。",
        },
        statusBarLineChanges: {
            name: "状态栏显示行更改摘要",
        },
        showAuthor: {
            name: "显示作者",
            desc: "在历史记录视图中显示提交的作者。",
        },
        showDate: {
            name: "显示日期",
            desc: "在历史记录视图中显示提交的日期。使用 {{date}} 占位符格式显示日期。",
        },
        autoRefreshSourceControl: {
            name: "文件更改时自动刷新源代码管理视图",
            desc: "在较慢的机器上，这可能会导致卡顿。如果是这样，只需禁用此选项。",
        },
        sourceControlRefreshInterval: {
            name: "源代码管理视图刷新间隔",
            desc: "文件更改后等待刷新源代码管理视图的毫秒数。",
        },
        diffViewStyle: {
            name: "差异视图样式",
            desc: "设置差异视图的样式。请注意，「分屏」模式下的实际差异不是由 Git 生成的，而是由编辑器本身生成的，因此可能与 Git 生成的差异不同。这样做的一个优点是您可以在该视图中编辑文本。",
        },
        disablePopups: {
            name: "禁用信息通知",
            desc: "禁用 Git 操作的信息通知以减少干扰（请参阅状态栏以获取更新）。",
        },
        disableErrorNotices: {
            name: "禁用错误通知",
            desc: "禁用所有类型的错误通知以减少干扰（请参阅状态栏以获取更新）。",
        },
        disablePopupsForNoChanges: {
            name: "隐藏无更改的通知",
            desc: "禁用「没有更改可提交/推送」的通知以减少干扰。",
        },
        showStatusBar: {
            name: "显示状态栏",
            desc: "必须重新启动 Obsidian 才能使此更改生效。",
        },
        showFileMenu: {
            name: "文件菜单集成",
            desc: "在文件菜单中添加暂存、取消暂存和放弃更改的选项。",
        },
        showBranchStatusBar: {
            name: "显示分支状态栏",
            desc: "在状态栏中显示当前分支。",
        },
        showModifiedFilesCount: {
            name: "在状态栏中显示修改文件的数量",
        },
        passwordPAT: {
            name: "密码/个人访问令牌",
            desc: "建议使用个人访问令牌而不是密码。设置 SSH 时不需要。",
        },
        authorName: {
            name: "提交作者名称",
        },
        authorEmail: {
            name: "提交作者邮箱",
        },
        updateSubmodules: {
            name: "更新子模块",
            desc: "在拉取、推送和提交时更新子模块。这将在拉取时运行 'git submodule update --remote --merge'，在推送时运行 'git submodule foreach git push'。",
        },
        submoduleRecurse: {
            name: "子模块递归检出/切换",
            desc: "在检出或切换分支时，递归更新子模块以匹配父仓库的状态。",
        },
        customGitPath: {
            name: "自定义 Git 二进制路径",
            desc: "指定 Git 二进制文件的自定义路径。如果 Git 不在 PATH 中，这很有用。",
        },
        additionalEnvVars: {
            name: "额外的环境变量",
            desc: "每行使用一个环境变量，格式为 KEY=VALUE。",
        },
        additionalPath: {
            name: "额外的 PATH 环境变量路径",
            desc: "每行使用一个路径",
        },
        reloadEnvVars: {
            name: "使用新环境变量重新加载",
            desc: "使用新的环境变量和/或 PATH 重新加载 Obsidian Git。",
        },
        customBasePath: {
            name: "自定义基础路径（Git 仓库路径）",
            desc: "为 Git 仓库指定自定义基础路径。如果仓库不是 Git 仓库的根目录，这很有用。",
        },
        customGitDir: {
            name: "自定义 Git 目录路径（替代 '.git'）",
            desc: "指定 Git 目录的自定义路径（默认：.git）。这对于工作树或特殊设置很有用。",
        },
        disableOnDevice: {
            name: "在此设备上禁用",
            desc: "在此设备上禁用 Obsidian Git。对于移动设备或特定设置很有用。",
        },
        lineAuthor: {
            name: "行作者信息",
            desc: "目前仅在桌面端可用。",
        },
        followMovement: {
            name: "跟踪跨文件和提交的移动和复制",
        },
        showCommitHash: {
            name: "显示提交哈希",
        },
        authorNameDisplay: {
            name: "作者名称显示",
            desc: "是否以及如何显示作者",
        },
        authoringDateDisplay: {
            name: "创作日期显示",
            desc: "是否以及如何显示创作日期。相对日期和自定义日期格式的格式可以在下方配置。",
        },
        customAuthoringDateFormat: {
            name: "自定义创作日期格式",
        },
        authoringDateTimezone: {
            name: "创作日期显示时区",
        },
        oldestAgeColor: {
            name: "最旧年龄颜色",
        },
        textColor: {
            name: "文本颜色",
        },
        ignoreWhitespace: {
            name: "忽略更改中的空白和换行",
        },
    },

    // Dropdown options
    options: {
        merge: "合并",
        rebase: "变基",
        reset: "其他同步服务（仅更新 HEAD，不触及工作目录）",
        mergeNone: "无（git 默认）",
        mergeOurs: "我们的更改",
        mergeTheirs: "他们的更改",
        colored: "彩色",
        monochrome: "单色",
        initials: "首字母",
        split: "分屏",
        gitUnified: "统一",
    },

    // Source control view
    sourceControl: {
        stagedChanges: "已暂存的更改",
        changes: "更改",
        recentlyPulledFiles: "最近拉取的文件",
        commitMessage: "提交信息",
        commitAndSync: "提交并同步",
        stageAll: "全部暂存",
        unstageAll: "全部取消暂存",
        changeLayout: "更改布局",
    },

    // History view
    history: {
        changeLayout: "更改布局",
    },

    // Notices (notifications)
    notices: {
        gitNotReady: "Git 尚未就绪。当所有设置正确时，您可以配置提交同步等。",
        runningCommand: "正在运行 '{{command}}'...",
        noRepository: "未找到仓库",
        discardedTracked: "已放弃所有已跟踪文件中的更改。",
        discardedAll: "已放弃所有文件。",
        pausedRoutines: "已暂停自动例程。",
        resumedRoutines: "已恢复自动例程。",
        notGitHub: "看起来您没有使用 GitHub",
        autoRoutinesPaused: "自动例程当前已暂停。",
        initializedRepo: "已初始化新仓库",
        abortedClone: "已中止克隆",
        invalidDepth: "无效的深度。正在中止克隆。",
        cloningRepo: "正在克隆新仓库到 \"{{dir}}\"",
        clonedRepo: "已克隆新仓库。",
        restartObsidian: "请重启 Obsidian",
        commitAborted: "提交已中止：未提供提交信息",
        noUpstreamBranch: "未设置上游分支。请选择一个。",
        aborted: "已中止",
        basePathNotExist: "ObsidianGit：基础路径不存在",
    },

    // Tooltips
    tooltips: {
        commitAndSync: "提交并同步",
        commit: "提交",
        stage: "暂存",
        unstage: "取消暂存",
        discard: "放弃",
    },
};
