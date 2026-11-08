# Upgrade: an existing workspace

The workspace already has its rules and module registry. The upgrade
adds or refreshes the integrity tool, the `kb` skill, the hooks, and the
tool's project data, without overwriting anything the project edited.

Use the tool shipped with this plugin, so a workspace that has no
`tools/kb/` yet can still be upgraded. Below, `<kb>` stands for
`assets/workspace/tools/kb/kb.py` in this skill's folder, and
`<workspace>` for the workspace root. Use `python3` or `py -3` where `python` is
missing or older than 3.9 (the tool needs Python 3.9 or later).

1. Preview: `python -B "<kb>" upgrade --dry-run --root "<workspace>"`
   (quote both paths; `-B` keeps Python cache files out of the plugin).
   - "up to date": nothing to do. Tell the user setup is finished and
     stop.
   - Otherwise it prints a plan: files to add or replace, project-edited
     files that get a `<file>.new` beside them, the managed block in the
     rules files, hook entries to merge, data migrations, legacy
     `[[...]]` links it will convert or leave as issues, links in
     `AGENTS.md` and session logs that will not open, and questions.
2. Show the plan to the user, including both link lists: the
   conversions rewrite links across the wiki, and the broken links
   become blocking issues. **ASK** each question it lists:
   - evidence folders per module (table exports, library sources, usage
     examples, documents), passed as `--set-evidence <Module>=<path>;<path>`,
     or `--set-evidence <Module>=` for none;
   - a shared evidence folder for the whole workspace, if any, passed as
     `--set-shared-evidence <path>;<path>`.
3. When the user approves, run the same command with the answers and
   `--yes` instead of `--dry-run`. It snapshots the workspace into
   `.kb/backups/` first and can resume if interrupted.
4. List every `<file>.new` for the user. Each one needs a manual merge
   into its file, keeping the project's edits; then the `.new` file is
   deleted.
5. Run `python tools/kb/kb.py check` in the workspace and report its
   summary.
6. Codex users: tell them to trust the project hooks with `/hooks`.
   Agents other than Codex and Claude Code: install `skills/kb/` where
   that agent loads skills.

Record the upgrade at the top of root `session_state.md`:

```
## YYYY-MM-DD - workspace upgraded
- Last active module: `<module, or none>`.
- Workspace docs: <files added; .new files left to merge>.
- Verification: <kb check summary line>.
- Next useful action: <merge .new files, or the next real task>.
<!-- AGENT-SESSION-STOP -->
```

If the upgrade stops partway, run step 3 again; finished steps are
skipped. To undo it, `python tools/kb/kb.py upgrade --rollback`
restores the snapshot; it refuses and lists the files when anything
changed after the upgrade.
