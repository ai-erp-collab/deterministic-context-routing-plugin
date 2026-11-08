# Upgrading the workspace

An upgrade brings a workspace built with an earlier version of the
template up to date without overwriting project edits.

1. Run `kb upgrade --dry-run`. It prints the plan: files to add or
   replace, files the project edited (kept; a `<file>.new` is written
   beside them), the managed block in the rules files, hook entries to
   merge, data migrations, and questions. Nothing is written.
2. Show the plan to the user. Ask each question:
   - evidence folders per module (table exports, library sources,
     usage examples, documents): answer with
     `--set-evidence <Module>=<path>;<path>`, or `--set-evidence <Module>=`
     for none;
   - a workspace-level shared evidence folder, if any:
     `--set-shared-evidence <path>;<path>`.
3. When the user approves, run the same command with the answers and
   `--yes`. The upgrade snapshots the workspace into `.kb/backups/`
   first, records each step, and continues where it stopped if it is
   interrupted.
4. Merge every `<file>.new` into its file by hand, keeping the project's
   edits, then delete the `.new` file. Until then a check issue reminds
   you.
5. On Codex, ask the user to trust the project hooks with `/hooks`.

To return to the state before the last upgrade, run
`kb upgrade --rollback`. It refuses when project data changed since the
upgrade, and lists curated pages written after it instead of
overwriting them.
