---
name: close-session
description: Use when the user ends or pauses work in a module ("close the session", "wrap up", "done for today") or when a non-conversational task in a module is finished, to write the module session entry and the root index entry. Not for workspace-wide health checks (use check).
---

# Close Session

1. Resolve the active module: the one the user named, otherwise the last
   active module in root `session_state.md`.
2. Insert a new entry at the top of `modules/<module>/session_state.md`,
   following `templates/session/session-state-entry.md` in the workspace:
   - what was asked and the current state;
   - files changed;
   - durable facts learned, with the evidence for each;
   - assumptions and confidence;
   - checks run and what remains unverified;
   - exactly one next useful action.
   Write the minimal entry a new session can continue from alone, ending
   with one next step concrete enough to start without asking. End it
   with the line `<!-- AGENT-SESSION-STOP -->`.
3. Insert a short entry at the top of root `session_state.md`, in the
   same shape as its other entries:

   ```
   ## YYYY-MM-DD - <module>: <task summary>
   - Last active module: `<module>`.
   - Workspace docs: <one-line summary of docs changed>.
   - Verification: <checks run>.
   - Next useful action: <the same next action as the module entry>.
   <!-- AGENT-SESSION-STOP -->
   ```
4. Ask the user: "Did a recurring problem or workaround come up that
   future tasks must know about?" If yes, add a section to
   `known_issues.md` with **Symptom**, **Cause**, and **Required
   handling**, written so it changes what the next agent does. Workspace
   defects found by the check skill never go here; that skill keeps its
   own single line.
5. Never edit or delete older entries.
