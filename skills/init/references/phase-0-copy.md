# Phase 0: Copy the skeleton

1. **ASK** the user to confirm the target folder: the current working
   directory, unless they name another one.
2. Copy every file under `assets/workspace/` (in this skill's folder) to
   the target, keeping relative paths. If a target file already exists,
   skip it and add its path to a skipped list.
3. If `session_state.md` was copied (not skipped), delete its single
   example entry (the one whose title contains `<Workspace activity
   summary>`) before recording this phase.
4. Check that these now exist in the target: `AGENTS.md`, `modules.md`,
   `known_issues.md`, `session_state.md`, `idea.md`,
   `knowledge-base/INDEX.md`, `source-artifacts/INDEX.md`, `templates/`,
   `skills/cross-module-owner-api/SKILL.md`.
5. Report the number of files copied and the skipped list. Skipped
   `AGENTS.md` and `CLAUDE.md` are handled in phase 1.
