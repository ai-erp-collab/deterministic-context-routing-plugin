# Changelog

## 0.3.0 - 2026-11-09

### Changed

- Workspace skills live in `.agents/skills/`, the folder Codex, Cursor,
  OpenCode, Antigravity, and Hermes read as project skills (workspace
  format 2). `kb upgrade` runs migration 002: it moves the project's
  `skills/cross-module-owner-api/` there, removes unedited `skills/kb/`
  and `.codex/skills/kb/` copies, rewrites links to them in `AGENTS.md`,
  `CLAUDE.md`, `README.md`, and `ASSEMBLY.md`, and keeps every copy the
  project edited, reporting it (and `kb check` lists it) for a manual
  merge. `kb upgrade --rollback` undoes it.
- Existing workspaces: run the `init` skill in the workspace to upgrade
  it (the 0.2.x tool does not prompt for this format). Links to the old
  skill folders outside those four files, for example in module session
  logs, are not rewritten; update them by hand.

### Added

- Codex manifest (`.codex-plugin/plugin.json`, no plugin hooks) and
  marketplace (`.agents/plugins/marketplace.json`).
- Cursor manifest and marketplace (`.cursor-plugin/`).
- Antigravity manifest (`.antigravity-plugin/plugin.json`).
- OpenCode plugin (`.opencode/plugins/context-routing.js`, `index.js`,
  `package.json`; no dependencies) that registers the skills on OpenCode
  1.x and 2.x.
- Portable Agent Plugins v1 manifest (`plugin.json`), loaded by Hermes.
- `INSTALL.md`: install steps written for an agent the user asks to
  install the plugin.
- The export fails when manifest versions differ.

### Notes

- Cursor, OpenCode, Antigravity, and Hermes get no hooks: run the `check`
  skill before closing a session. Codex runs the checks from the
  workspace `.codex/hooks.json` after the user trusts it with `/hooks`.

## 0.2.2 - 2026-11-09

- Running `kb check` no longer leaves the git tree dirty. The tool writes
  `docs/checks/.gitignore` (dated reports stay local; `OPEN.md` is the
  shared current state) and `.kb/.gitignore` (backups, undo journal,
  upgrade log, and the rebuilt lookup index stay local; config, profiles,
  issue ids, and the shipped-file manifest are committed). Each file is
  written once, also in existing workspaces, and never replaced after the
  project edits it.
- Confidence labels agree everywhere: the page templates, the session
  entry template, and `curate` name `schema-confirmed` and
  `runtime-confirmed` as evidence-layer forms of `confirmed`, so a table
  page from `kb table` (`confidence: schema-confirmed`) matches its own
  template.
- YAML front matter is metadata, not links: links and paths inside a
  leading `---` block are neither checked nor converted.
- Clearer output: an upgrade within the same workspace format says
  "shipped files changed, workspace format 1 unchanged" instead of
  "version 1 -> 1"; the snapshot line says what it holds (the knowledge
  base, rules files, and `.kb/` data; other edits are in the undo
  journal); `kb fix` says when a fix needed no file change.

## 0.2.1 - 2026-11-08

- Upgrade plan shows legacy `[[...]]` link conversions before anything is
  written: how many become relative links, how many stay as issues, with
  examples. A legacy link is converted automatically only when its single
  target sits in the same place as the page holding the link: that page's
  module, the shared pages, or elsewhere in the knowledge base, the same
  rule ordinary links follow.
- Link exclusions: `link_ignore` globs in `.kb/config.json` (matched
  against the link as written, for example `*other-repo/*`), or
  `<!-- kb:ignore-link -->` on a line, for links that point outside the
  workspace on purpose. Excluded links are neither checked nor fixed.
- Links are now also checked in the root and module `AGENTS.md` and in the
  newest part of each `session_state.md` (above its first stop marker).
  There, a bare file name in backticks counts as prose, and a link is
  changed automatically only when its own path resolves; session logs are
  never edited automatically. A fix that is not automatic but has a single
  target can still be applied with `kb fix --ids`.
- Stop markers are checked in every module's `session_state.md` at the
  path `modules.md` registers, not only under `modules/`. A stop marker
  inside a code block no longer ends a log's checked part.
- The upgrade plan also lists links in `AGENTS.md` and session logs that
  will not open, since they become blocking issues after the upgrade.
- A module's wiki path is read the same way everywhere (`./` and
  backslashes allowed); a page in a nested module wiki belongs to the
  innermost one.
- The after-edit hook runs the checks once when it has nothing to fix.
- Duplicate pages are found on the first check, before the lookup index
  file is rebuilt; `check` still writes nothing.
- The tool no longer leaves `__pycache__` folders in the workspace.
- `fix`, `undo`, `ingest`, `table`, and `recipe promote` print
  `run_id: <id>`.
- Generated table pages carry `confidence: schema-confirmed`: the export
  confirms structure, not business meaning.

## 0.2.0 - 2026-11-08

- Integrity layer: the workspace now ships `tools/kb/kb.py`, a
  standard-library Python tool (3.9 or later) that checks links, indexes,
  evidence tracking, required page sections, duplicates, recipe drift, and
  encoding. Fixes with exactly one correct answer are applied
  automatically, journaled, and reversible with `kb undo`.
- Hooks: Claude Code hooks in the plugin and Codex hooks in the workspace
  (`.codex/hooks.json`) run the checks after edits, at the end of a turn,
  and at session start. They use the first of `python`, `python3`,
  `py -3` that is 3.9 or later and stay silent when the tool or such a
  Python is missing (a Store `python` stub or Python 2 is skipped). Hook
  payloads are read as UTF-8, so paths in any script reach the checks.
- New skill `kb`: resolves reported issues and holds the procedures for
  large files, evidence intake, table exports, lookups, glossary terms,
  recipes, and upgrades. Codex copy in `.codex/skills/kb/`.
- Changed skills: `check` runs the tool and applies safe fixes; `curate`
  looks pages up before writing and never moves evidence files;
  `close-session` checks the session's changes and tracks recipe
  candidates; `add-module` asks for evidence folders; `init` sets up the
  tool and upgrades an existing workspace.
- Upgrade path: `init` on an existing workspace runs `kb upgrade` (dry
  run, questions, snapshot, rollback) instead of the setup phases.
  Template files left as 0.1.x shipped them are replaced; edited ones get
  a `.new` file beside them. The 0.1.x `raw`/`processed` table READMEs
  are removed when unedited (kept in the snapshot); edited ones are
  queued for their rules to move into `AGENTS.md`.

## 0.1.3 - 2026-10-14

- `check`: the skill description no longer contains `#`, which YAML read
  as the start of a comment and cut the description in half.

## 0.1.2 - 2026-10-10

- Plugin icon (`.claude-plugin/icon.png`) for the plugin directory listing.

## 0.1.1 - 2026-10-10

- `curate`: new page type `pattern` (`patterns/<name>.md`), so the
  `patterns/` slot in module indexes can be filled.
- `close-session`: the root log entry now has an explicit dated shape,
  matching the entries `init` writes.
- `cross-module-owner-api`: owner-change steps numbered 4.1-4.3 under one
  section 4.

## 0.1.0 - 2026-10-10

- First release: skills `init`, `add-module`, `curate`, `close-session`,
  `cross-module-owner-api`, `check`.
- Aligned with methodology v0.6.0-draft.
