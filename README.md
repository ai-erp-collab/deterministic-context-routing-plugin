# context-routing

Give your coding agent exactly the context it needs in a large codebase,
and let it keep its thread across sessions.

Run these two commands one after the other inside Claude Code. The first
adds this repository as a plugin marketplace; the second installs the
plugin from it.

```
/plugin marketplace add ai-erp-collab/deterministic-context-routing-plugin
/plugin install context-routing@deterministic-context-routing
```

From a regular terminal, the same two steps are:

```
claude plugin marketplace add ai-erp-collab/deterministic-context-routing-plugin
claude plugin install context-routing@deterministic-context-routing
```

![Context routing in action](assets/demo.gif)

## How it works

`init` turns your repository into a plain-Markdown workspace with four parts:

- **Context routing.** Every task takes the same path: rules file ->
  module registry -> the module's page -> its knowledge pages -> its
  session log. The agent reads the few short pages the task needs and
  nothing else. (`init`, `add-module`)
- **Curated knowledge base.** Code, schemas, and other raw material become
  short linked pages (concepts, tables, contracts, usage flows) before an
  agent needs them, so routing lands on a ready answer, not on raw
  sources. (`curate`)
- **Confidence labels.** Each claim is marked confirmed, inferred,
  runtime-unverified, or blocked-by-access, so you and the agent both see
  what was really checked. (`curate`, `check`)
- **Session log.** Each module keeps a newest-first log of intent,
  evidence, assumptions, and the next step: what git history does not
  record. (`close-session`)

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
| `/context-routing:check` | report workspace defects to `docs/checks/`; fixes only the issues you name |

Skills also fire on their own when your request matches them.

## Numbers

What the plugin and its workspace add to every session, measured as input
tokens with Claude Code on a workspace set up by `init`:

Measured 2026-10-10 with 2.1.158 (Claude Code)

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
repository only. The plugin has no hooks, no MCP servers, no scripts, and
makes no network calls.

## Proven on

Large proprietary ERP. Evidence, experiments, and reasoning live in the
[Deterministic Context Routing methodology](https://github.com/ai-erp-collab/deterministic-context-routing).

## License

MIT, use freely. See [LICENSE](LICENSE).
