# Phase 1: Rules file and entry point

1. If phase 0 skipped `AGENTS.md` (the repository already had one), append
   the content of `assets/workspace/AGENTS.md` (in this skill's folder) to
   the end of the existing file under a new heading
   `## Context Routing Rules`. Change nothing above that heading.
2. **ASK** the capability profile, one short answer each: may the agent
   use git history; build or compile command; automated test command and
   what it covers; runtime access; required static checks.
3. Replace the five template lines under `Capability profile:` in
   `AGENTS.md` with the answers. Write "unavailable" where the user says
   so; never leave the template wording.
4. Entry point for Claude Code, which loads `CLAUDE.md` and not
   `AGENTS.md`: if `CLAUDE.md` does not exist, create it with the single
   line `@AGENTS.md`. If it exists and has no line equal to `@AGENTS.md`,
   append an empty line and then `@AGENTS.md`. Agents that read
   `AGENTS.md` directly need nothing more.
5. Tell the user how to confirm the rules load: in a new session, ask for
   the test command without allowing tool use; the answer must match
   step 3. Record this as unverified until the user reports the result.
