/**
 * English language strings for Obsidian Git plugin
 */
export default {
    // Common
    common: {
        commit: "Commit",
        push: "Push",
        pull: "Pull",
        stage: "Stage",
        unstage: "Unstage",
        discard: "Discard",
        refresh: "Refresh",
        clear: "Clear",
        preview: "Preview",
        reload: "Reload",
        disabled: "Disabled",
        hide: "Hide",
        full: "Full",
    },

    // Settings headings
    settings: {
        automatic: "Automatic",
        commitMessage: "Commit message",
        pull: "Pull",
        commitAndSync: "Commit-and-sync",
        hunkManagement: "Hunk management",
        lineAuthorInfo: "Line author information",
        historyView: "History view",
        sourceControlView: "Source control view",
        miscellaneous: "Miscellaneous",
        authentication: "Authentication/commit author",
        commitAuthor: "Commit author",
        advanced: "Advanced",
        support: "Support",
        donate: "Donate",
    },

    // Settings items
    settingItems: {
        splitTimers: {
            name: "Split timers for automatic commit and sync",
            desc: "Enable to use one interval for commit and another for sync.",
        },
        autoCommitInterval: {
            name: "Auto {{commitOrSync}} interval (minutes)",
            desc: "{{action}} changes every X minutes. Set to 0 (default) to disable. (See below setting for further configuration!)",
        },
        autoCommitAfterFileEdit: {
            name: "Auto {{commitOrSync}} after stopping file edits",
            desc: "Requires the {{commitOrSync}} interval not to be 0.\nIf turned on, do auto {{commitOrSync}} every {{interval}} after stopping file edits.\nThis also prevents auto {{commitOrSync}} while editing a file. If turned off, it's independent from the last file edit.",
        },
        autoCommitAfterLatestCommit: {
            name: "Auto {{commitOrSync}} after latest commit",
            desc: "If turned on, sets last auto {{commitOrSync}} timestamp to the latest commit timestamp. This reduces the frequency of auto {{commitOrSync}} when doing manual commits.",
        },
        autoPushInterval: {
            name: "Auto push interval (minutes)",
            desc: "Push commits every X minutes. Set to 0 (default) to disable.",
        },
        autoPullInterval: {
            name: "Auto pull interval (minutes)",
            desc: "Pull changes every X minutes. Set to 0 (default) to disable.",
        },
        autoCommitOnlyStaged: {
            name: "Auto {{commitOrSync}} only staged files",
            desc: "If turned on, only staged files are committed on {{commitOrSync}}. If turned off, all changed files are committed.",
        },
        customMessageOnAutoBackup: {
            name: "Specify custom commit message on auto {{commitOrSync}}",
            desc: "You will get a pop up to specify your message.",
        },
        commitMessageOnAutoCommit: {
            name: "Commit message on auto {{commitOrSync}}",
            desc: "Available placeholders: {{date}} (see below), {{hostname}} (see below), {{numFiles}} (number of changed files in the commit) and {{files}} (changed files in commit message).",
        },
        commitMessageOnManualCommit: {
            name: "Commit message on manual commit",
            desc: "Available placeholders: {{date}} (see below), {{hostname}} (see below), {{numFiles}} (number of changed files in the commit) and {{files}} (changed files in commit message). Leave empty to require manual input on each commit.",
        },
        commitMessageScript: {
            name: "Commit message script",
            desc: "A script that is run using 'sh -c' to generate the commit message. May be used to generate commit messages using AI tools. Available placeholders: {{hostname}}, {{date}}.",
        },
        dateFormat: {
            name: "{{date}} placeholder format",
            desc: "Specify custom date format. E.g. \"{{format}}\". See Moment.js for more formats.",
        },
        hostnamePlaceholder: {
            name: "{{hostname}} placeholder replacement",
            desc: "Specify custom hostname for every device.",
        },
        previewCommitMessage: {
            name: "Preview commit message",
        },
        listChangedFilesInMessageBody: {
            name: "List filenames affected by commit in the commit body",
        },
        mergeStrategy: {
            name: "Merge strategy",
            desc: "Decide how to integrate commits from your remote branch into your local branch.",
        },
        mergeStrategyOnConflicts: {
            name: "Merge strategy on conflicts",
            desc: "Decide how to solve conflicts when pulling remote changes. This can be used to favor your local changes or the remote changes automatically.",
        },
        pullOnStartup: {
            name: "Pull on startup",
            desc: "Automatically pull commits when Obsidian starts.",
        },
        pushOnCommitAndSync: {
            name: "Push on commit-and-sync",
            desc: "Most of the time you want to push after committing. Turning this off turns a commit-and-sync action into commit {{andPull}}only. It will still be called commit-and-sync.",
        },
        pullOnCommitAndSync: {
            name: "Pull on commit-and-sync",
            desc: "On commit-and-sync, pull commits as well. Turning this off turns a commit-and-sync action into commit {{andPush}}only.",
        },
        signs: {
            name: "Signs",
            desc: "This allows you to see your changes right in your editor via colored markers and stage/reset/preview individual hunks.",
        },
        hunkCommands: {
            name: "Hunk commands",
            desc: "Adds commands to stage/reset individual Git diff hunks and navigate between them via 'Go to next/prev hunk' commands.",
        },
        statusBarLineChanges: {
            name: "Status bar with summary of line changes",
        },
        showAuthor: {
            name: "Show Author",
            desc: "Show the author of the commit in the history view.",
        },
        showDate: {
            name: "Show Date",
            desc: "Show the date of the commit in the history view. The {{date}} placeholder format is used to display the date.",
        },
        autoRefreshSourceControl: {
            name: "Automatically refresh source control view on file changes",
            desc: "On slower machines this may cause lags. If so, just disable this option.",
        },
        sourceControlRefreshInterval: {
            name: "Source control view refresh interval",
            desc: "Milliseconds to wait after file change before refreshing the Source Control View.",
        },
        diffViewStyle: {
            name: "Diff view style",
            desc: "Set the style for the diff view. Note that the actual diff in \"Split\" mode is not generated by Git, but the editor itself instead so it may differ from the diff generated by Git. One advantage of this is that you can edit the text in that view.",
        },
        disablePopups: {
            name: "Disable informative notifications",
            desc: "Disable informative notifications for git operations to minimize distraction (refer to status bar for updates).",
        },
        disableErrorNotices: {
            name: "Disable error notifications",
            desc: "Disable error notifications of any kind to minimize distraction (refer to status bar for updates).",
        },
        disablePopupsForNoChanges: {
            name: "Hide notifications for no changes",
            desc: "Disable notifications for 'No changes to commit/push' to minimize distraction.",
        },
        showStatusBar: {
            name: "Show status bar",
            desc: "Obsidian must be restarted for this change to take effect.",
        },
        showFileMenu: {
            name: "File menu integration",
            desc: "Add options to the file menu to stage, unstage and discard changes.",
        },
        showBranchStatusBar: {
            name: "Show branch status bar",
            desc: "Show the current branch in the status bar.",
        },
        showModifiedFilesCount: {
            name: "Show the count of modified files in the status bar",
        },
        passwordPAT: {
            name: "Password/Personal access token",
            desc: "Recommended to use Personal Access Token instead of password. Not needed when SSH is set up.",
        },
        authorName: {
            name: "Author name for commit",
        },
        authorEmail: {
            name: "Author email for commit",
        },
        updateSubmodules: {
            name: "Update submodules",
            desc: "Update submodules when pulling, pushing, and committing. This will run 'git submodule update --remote --merge' on pull, and 'git submodule foreach git push' on push.",
        },
        submoduleRecurse: {
            name: "Submodule recurse checkout/switch",
            desc: "When checking out or switching branches, recursively update submodules to match the state of the parent repository.",
        },
        customGitPath: {
            name: "Custom Git binary path",
            desc: "Specify a custom path to the Git binary. This is useful if Git is not in the PATH.",
        },
        additionalEnvVars: {
            name: "Additional environment variables",
            desc: "Use each line for one environment variable in the format KEY=VALUE.",
        },
        additionalPath: {
            name: "Additional PATH environment variable paths",
            desc: "Use each line for one path",
        },
        reloadEnvVars: {
            name: "Reload with new environment variables",
            desc: "Reload Obsidian Git with the new environment variables and/or PATH.",
        },
        customBasePath: {
            name: "Custom base path (Git repository path)",
            desc: "Specify a custom base path for the Git repository. This is useful if the vault is not the root of the Git repository.",
        },
        customGitDir: {
            name: "Custom Git directory path (Instead of '.git')",
            desc: "Specify a custom path to the Git directory (default: .git). This is useful for worktrees or special setups.",
        },
        disableOnDevice: {
            name: "Disable on this device",
            desc: "Disable Obsidian Git on this device. Useful for mobile devices or specific setups.",
        },
        lineAuthor: {
            name: "Line author information",
            desc: "Only available on desktop currently.",
        },
        followMovement: {
            name: "Follow movement and copies across files and commits",
        },
        showCommitHash: {
            name: "Show commit hash",
        },
        authorNameDisplay: {
            name: "Author name display",
            desc: "If and how the author is displayed",
        },
        authoringDateDisplay: {
            name: "Authoring date display",
            desc: "If and how the authoring date is displayed. The formats for relative and custom date formats can be configured below.",
        },
        customAuthoringDateFormat: {
            name: "Custom authoring date format",
        },
        authoringDateTimezone: {
            name: "Authoring date display timezone",
        },
        oldestAgeColor: {
            name: "Oldest age color",
        },
        textColor: {
            name: "Text color",
        },
        ignoreWhitespace: {
            name: "Ignore whitespace and newlines in changes",
        },
    },

    // Dropdown options
    options: {
        merge: "Merge",
        rebase: "Rebase",
        reset: "Other sync service (Only updates the HEAD without touching the working directory)",
        mergeNone: "None (git default)",
        mergeOurs: "Our changes",
        mergeTheirs: "Their changes",
        colored: "Colored",
        monochrome: "Monochrome",
        initials: "Initials",
        split: "Split",
        gitUnified: "Unified",
    },

    // Source control view
    sourceControl: {
        stagedChanges: "Staged Changes",
        changes: "Changes",
        recentlyPulledFiles: "Recently Pulled Files",
        commitMessage: "Commit Message",
        commitAndSync: "Commit-and-sync",
        stageAll: "Stage all",
        unstageAll: "Unstage all",
        changeLayout: "Change Layout",
    },

    // History view
    history: {
        changeLayout: "Change Layout",
    },

    // Notices (notifications)
    notices: {
        gitNotReady: "Git is not ready. When all settings are correct you can configure commit-sync, etc.",
        runningCommand: "Running '{{command}}'...",
        noRepository: "No repository found",
        discardedTracked: "Discarded all changes in tracked files.",
        discardedAll: "Discarded all files.",
        pausedRoutines: "Paused automatic routines.",
        resumedRoutines: "Resumed automatic routines.",
        notGitHub: "It seems like you are not using GitHub",
        autoRoutinesPaused: "Automatic routines are currently paused.",
        initializedRepo: "Initialized new repo",
        abortedClone: "Aborted clone",
        invalidDepth: "Invalid depth. Aborting clone.",
        cloningRepo: "Cloning new repo into \"{{dir}}\"",
        clonedRepo: "Cloned new repo.",
        restartObsidian: "Please restart Obsidian",
        commitAborted: "Commit aborted: No commit message provided",
        noUpstreamBranch: "No upstream branch is set. Please select one.",
        aborted: "Aborted",
        basePathNotExist: "ObsidianGit: Base path does not exist",
    },

    // Tooltips
    tooltips: {
        commitAndSync: "Commit-and-sync",
        commit: "Commit",
        stage: "Stage",
        unstage: "Unstage",
        discard: "Discard",
    },
};
