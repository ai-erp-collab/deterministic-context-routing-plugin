# Changelog

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
