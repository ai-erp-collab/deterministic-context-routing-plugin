# Phase 0: Copy the skeleton

1. **ASK** the user to confirm the target folder: the current working
   directory, unless they name another one.
2. Start the log before anything else, so an interrupted copy resumes
   here and is never mistaken for a finished workspace: if the target has
   no `session_state.md`, copy `assets/workspace/session_state.md` (in
   this skill's folder) and delete its single example entry (the one
   whose title contains `<Workspace activity summary>`). Insert at its
   top an entry in the skill's record format titled
   `init phase 0 started` (unless the latest entry already is one), with
   next useful action `init phase 0`.
3. Copy every other file under `assets/workspace/` to the target,
   keeping relative paths. If a target file already exists, skip it and
   add its path to a skipped list.
4. Check that these now exist in the target: `AGENTS.md`, `modules.md`,
   `known_issues.md`, `session_state.md`, `idea.md`,
   `knowledge-base/INDEX.md`, `source-artifacts/INDEX.md`, `templates/`,
   `skills/cross-module-owner-api/SKILL.md`, `skills/kb/SKILL.md`,
   `tools/kb/kb.py`, `.codex/hooks.json`.
5. Run `python --version` (or `python3 --version`, `py -3 --version`). The integrity tool
   needs Python 3.9 or later, standard library only. If none of them
   reports 3.9 or later, **ASK** whether to continue without it: the
   workspace still works, but no checks run until Python is available.
6. Report the number of files copied and the skipped list. Skipped
   `AGENTS.md` and `CLAUDE.md` are handled in phase 1.
