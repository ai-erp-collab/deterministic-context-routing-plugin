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
5. Set up the integrity tool: `python tools/kb/kb.py upgrade --yes`
   (it writes `.kb/` and puts the tool's two rules in a marked block of
   `AGENTS.md`), then `python tools/kb/kb.py doctor`. Skip this step if
   the user chose in phase 0 to continue without Python.
6. Skills: Claude Code gets `kb` and the other skills from this plugin.
   Codex finds `kb` in `.codex/skills/kb/`; tell Codex users to trust
   the project hooks with `/hooks`, or the checks will not run on edits.
   Any other agent: install `skills/kb/` where that agent loads skills.
7. Tell the user how to confirm the rules load: in a new session, ask for
   the test command without allowing tool use; the answer must match
   step 3. Record this as unverified until the user reports the result.
