# context-routing

Give your coding agent exactly the context it needs in a large codebase,
and let it keep its thread across sessions.

## Install

The quickest way is to tell your agent: *Install the plugin from
https://github.com/ai-erp-collab/deterministic-context-routing-plugin
following its INSTALL.md.* Or install it yourself:

| Agent | Install | What you get |
|---|---|---|
| Claude Code | `/plugin marketplace add ai-erp-collab/deterministic-context-routing-plugin`, then `/plugin install context-routing@deterministic-context-routing` | skills + hooks |
| Codex | `codex plugin marketplace add ai-erp-collab/deterministic-context-routing-plugin`, then `/plugins` -> Context Routing -> install (Codex app: Plugins sidebar) | skills; hooks from the workspace `.codex/hooks.json` after you trust them with `/hooks` |
| Cursor | Customize -> From GitHub Repository -> paste the repository URL | skills; checks manual |
| OpenCode | in `opencode.json`: `"plugin": ["context-routing@git+https://github.com/ai-erp-collab/deterministic-context-routing-plugin.git"]` (OpenCode 1.x) or the same entry under `"plugins"` (2.x) | skills; checks manual |
| Antigravity (CLI and IDE) | `agy plugin install https://github.com/ai-erp-collab/deterministic-context-routing-plugin`; installs into `~/.gemini/config/plugins/`, which the CLI and the IDE both read. The IDE does not put `agy` on `PATH`: run it as `~/.gemini/bin/agy` (Windows PowerShell: `& "$env:USERPROFILE\.gemini\bin\agy.exe" plugin install ...`), then reload the IDE window | skills; checks manual |
| Hermes | `hermes plugins install ai-erp-collab/deterministic-context-routing-plugin --enable`; plugin skills load explicitly (`skill_view("context-routing:init")`); in a set-up workspace run `hermes skills trust` so `.agents/skills/` loads | skills; checks manual |
| Any other agent | copy `skills/` to wherever the agent loads skills; the workspace itself is plain Markdown plus `AGENTS.md` | skills; checks manual |

"Checks manual" means running `python tools/kb/kb.py check` (the `check`
skill) before closing a session; `AGENTS.md` in the workspace already
tells the agent to do so. From a regular terminal, the Claude Code steps
are `claude plugin marketplace add ...` and `claude plugin install ...`
with the same arguments.

![Context routing in action](assets/demo.gif)

## How it works

`init` turns your repository into a plain-Markdown workspace with five parts:

- **Context routing.** Every task takes the same path: rules file ->
  module registry -> the module's page -> its knowledge pages -> its
  session log. The agent reads the few short pages the task needs and
  nothing else. (`init`, `add-module`)
- **Curated knowledge base.** Code, schemas, and other raw material become
  short linked pages (concepts, tables, contracts, usage flows) before an
  agent needs them, so routing lands on a ready answer, not on raw
  sources. (`curate`)
- **Confidence labels.** Each claim is marked confirmed, inferred,
  runtime-unverified, or blocked-by-access, and confirmed can name its
  layer (schema-confirmed, runtime-confirmed), so you and the agent both
  see what was really checked. (`curate`, `check`)
- **Session log.** Each module keeps a newest-first log of intent,
  evidence, assumptions, and the next step: what git history does not
  record. (`close-session`)
- **Integrity checks.** A small tool shipped in the workspace
  (`tools/kb/`) checks links, indexes, evidence tracking, and required
  page sections after each edit. Fixes with exactly one correct answer
  are applied and journaled so they can be undone; everything else
  becomes a numbered issue for the agent. (`kb`, `check`)

The workspace keeps working without the plugin for any agent that reads
`AGENTS.md`.

## What you get on top

Once the workspace is filled in, these follow without extra setup:

- **Pick up where you left off.** End a session today or a month from now;
  the next one reads the last log entry and continues from the recorded
  next step, with nothing to explain again.
- **Switch modules freely.** Each module keeps its own log, so moving
  between modules and back never mixes their threads.
- **Complete history per module.** Every session stays on record; the
  timeline of a module can be rebuilt from its log, not from memory.
- **Ask in your own terms.** A module page maps the words your team uses to
  the files and objects behind them.
- **The agent acts on what is checked.** It relies on confirmed facts and
  treats unverified ones with care.
- **Reuse instead of copy.** When another module already owns a rule, the
  agent calls it through that module's API rather than duplicating it.
- **Documentation as a by-product.** Knowledge pages grow out of real tasks,
  not a separate write-up project.

## Skills

| Skill | Use it to |
|---|---|
| `/context-routing:init` | set up the workspace in phases; safe to stop and resume |
| `/context-routing:add-module` | register a module, create its folders and log, inventory its sources |
| `/context-routing:curate` | turn an artifact or code into a concept, table, contract, or usage-flow page with confidence labels |
| `/context-routing:close-session` | record what was done and the one next action; capture recurring traps |
| `/context-routing:cross-module-owner-api` | reuse a rule owned by another module through its API instead of copying it |
| `/context-routing:check` | run the integrity checks, apply the safe fixes, report open issues to `docs/checks/`; fix the issues you name |
| `/context-routing:kb` | resolve what the checks report; read large files by outline; take in evidence and table exports; look up terms and pages before writing |

Skills also fire on their own when your request matches them.

Requirements: Python 3.9 or later (standard library only) for the
integrity checks, found as `python`, `python3`, or `py -3`. Without
it the hooks stay silent and the rest of the workspace works as before.

## Numbers

What the plugin and its workspace add to every session, measured as input
tokens with Claude Code on a workspace set up by `init`:

Measured 2026-10-10 with 2.1.158 (Claude Code), version 0.1.0

| Always-loaded component | Tokens |
|---|---|
| Skill descriptions (6 skills) | 443 |
| Workspace `AGENTS.md` (loaded via `CLAUDE.md`) | 1015 |
| `known_issues.md` (read before non-trivial tasks) | 428 |
| **Total** | 1886 |

Two runs agreed within 1%. Comparative measurements are in the
methodology's evidence, linked under "Proven on".

## What it runs, sends, and fetches

The skills are Markdown instructions. They read and write files in your
repository only. On Claude Code the plugin adds three hooks (after a file edit, at the
end of a turn, at session start); each runs the workspace's own
`tools/kb/kb.py` with Python and does nothing when that file is absent.
The tool uses the Python standard library, reads and writes files inside
the workspace only, and makes no network calls. No MCP servers.

## Proven on

Large proprietary ERP. Evidence, experiments, and reasoning live in the
[Deterministic Context Routing methodology](https://github.com/ai-erp-collab/deterministic-context-routing).

## Generated files

`skills/kb/`, `skills/cross-module-owner-api/`, and the `assets/` folders
of `init` and `add-module` are generated from the workspace template on
every release. Inside a workspace the same skills live in
`.agents/skills/`. Report changes to these files as issues rather than
editing the copies.

## License

MIT, use freely. See [LICENSE](LICENSE).
