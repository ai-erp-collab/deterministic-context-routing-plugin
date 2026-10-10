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

## What you get

- **Pick up where you left off.** End a session today or a month from now;
  the next one reads the last log entry and continues from the recorded
  next step, with nothing to explain again.
- **Switch modules freely.** Each module keeps its own log, so moving
  between modules and back never mixes their threads.
- **Complete history per module.** Every session stays on record; the
  timeline of a module can be rebuilt from its log, not from memory.
- **Smaller, cheaper context.** The agent is routed to a few short curated
  pages instead of scanning raw sources.
- **Facts with confidence labels.** Each knowledge page marks what is
  confirmed and what is assumed, and the agent treats them differently.
- **Ask in your own terms.** A module page maps the words your team uses to
  the files and objects behind them.
- **Reuse instead of copy.** When another module already owns a rule, the
  agent calls it through that module's API rather than duplicating it.
- **Documentation as a by-product.** Knowledge pages grow out of real tasks,
  not a separate write-up project.

`context-routing` turns a repository into a plain-Markdown workspace with a
fixed reading order: a short rules file, a module registry, curated
knowledge pages per module, and a newest-first session log. After setup the
workspace keeps working without the plugin for any agent that reads
`AGENTS.md`.

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
