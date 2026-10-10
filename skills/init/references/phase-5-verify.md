# Phase 5: Verify and hand off

Check each item and fix what fails before recording this phase:

1. No template placeholders remain in `AGENTS.md`, `modules.md`,
   `idea.md`, or root `session_state.md`: search them for `YYYY-MM-DD`
   and for angle-bracket placeholders such as `<Project>`. Files under
   `templates/` keep their placeholders on purpose.
2. `idea.md` has `status: confirmed`.
3. Every module in `modules.md` has its module folder, its
   knowledge-base folder with `INDEX.md` and `inventory.md`, and a
   `session_state.md` ending its latest entry with the stop marker.
4. `source-artifacts/INDEX.md` lists every file under any `raw/` folder.
5. `CLAUDE.md` contains the line `@AGENTS.md`.
6. Run the check skill once and report its result.

Record the phase with next action "curate the first artifact of
`<first module>`" and tell the user setup is complete.
