---
name: close-session
description: Use when the user ends or pauses work in a module ("close the session", "wrap up", "done for today") or when a non-conversational task in a module is finished, to write the module session entry and the root index entry. Not for workspace-wide health checks (use check).
---

# Close Session

If `tools/kb/kb.py` is missing but `AGENTS.md` and `modules.md` exist,
the workspace predates the integrity tool: tell the user to run the init
skill, which upgrades it, and stop. Run tool commands from the workspace
root; use `python3` or `py -3` where `python` is
missing or older than 3.9.

1. Resolve the active module: the one the user named, otherwise the last
   active module in root `session_state.md`.
2. Check what this session changed:
   `python tools/kb/kb.py check --changed <files changed this session>`.
   Resolve blocking issues with the `kb` skill before writing the entry,
   or list them in it. Its summary line goes into the entry's checks.
3. Recipe candidates: run
   `python tools/kb/kb.py recipe candidate tick --module <module>`, then
   `python tools/kb/kb.py recipe candidates`. If a candidate is listed,
   ask the user whether to promote it (the `kb` skill's recipe
   procedure). Then ask once: "Did this session settle a
   platform technique other modules could reuse?" On yes, register it
   with `python tools/kb/kb.py recipe candidate add <file> --symbol <name> --module <module>`.
4. Insert a new entry at the top of `modules/<module>/session_state.md`,
   following `templates/session/session-state-entry.md` in the workspace:
   - what was asked and the current state;
   - files changed;
   - durable facts learned, with the evidence for each;
   - assumptions and confidence;
   - checks run (including the step 2 summary) and what remains
     unverified;
   - exactly one next useful action.
   Write the minimal entry a new session can continue from alone, ending
   with one next step concrete enough to start without asking. End it
   with the line `<!-- AGENT-SESSION-STOP -->`.
5. Insert a short entry at the top of root `session_state.md`, in the
   same shape as its other entries:

   ```
   ## YYYY-MM-DD - <module>: <task summary>
   - Last active module: `<module>`.
   - Workspace docs: <one-line summary of docs changed>.
   - Verification: <checks run>.
   - Next useful action: <the same next action as the module entry>.
   <!-- AGENT-SESSION-STOP -->
   ```
6. Ask the user: "Did a recurring problem or workaround come up that
   future tasks must know about?" If yes, add a section to
   `known_issues.md` with **Symptom**, **Cause**, and **Required
   handling**, written so it changes what the next agent does. Workspace
   defects found by the check skill never go here; that skill keeps its
   own single line.
7. Never edit or delete older entries.
