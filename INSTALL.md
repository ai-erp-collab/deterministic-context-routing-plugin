# Installing context-routing (for AI agents)

You are an AI coding agent and the user asked you to install this plugin
from `https://github.com/ai-erp-collab/deterministic-context-routing-plugin`.
Follow these steps in order.

## 1. Identify your agent

Decide which agent you are: Claude Code, Codex, Cursor, OpenCode,
Antigravity, Hermes, or another one. If you cannot tell, ask the user.

## 2. Install through your agent's own mechanism

| Agent | Install action |
|---|---|
| Claude Code | `/plugin marketplace add ai-erp-collab/deterministic-context-routing-plugin`, then `/plugin install context-routing@deterministic-context-routing` |
| Codex | `codex plugin marketplace add ai-erp-collab/deterministic-context-routing-plugin`, then `/plugins`, pick Context Routing, install (Codex app: Plugins sidebar) |
| Cursor | Customize, From GitHub Repository, paste the repo URL |
| OpenCode | add `"context-routing@git+https://github.com/ai-erp-collab/deterministic-context-routing-plugin.git"` to `plugin` (V1) or `plugins` (V2) in `opencode.json` |
| Antigravity (CLI or IDE) | `agy plugin install https://github.com/ai-erp-collab/deterministic-context-routing-plugin`. If `agy` is not found (the IDE does not add it to `PATH`), use `~/.gemini/bin/agy` (Windows: `%USERPROFILE%\.gemini\bin\agy.exe`). It installs into `~/.gemini/config/plugins/`, which both the CLI and the IDE read; do not clone into that folder by hand |
| Hermes | `hermes plugins install ai-erp-collab/deterministic-context-routing-plugin --enable` |

Slash commands and UI steps are typed by the user, not by you: tell the
user exactly what to type or click, then wait for them to confirm.

## 3. Rules

- Install only through the agent's own plugin mechanism or the fallback
  below. Do not download and wire files into the agent's internals.
- Ask the user before editing any global or user-level configuration
  file (for example a user-wide `opencode.json`).
- Do not run this plugin's hooks or scripts by hand.

## 4. Fallback: no plugin mechanism

Copy every folder of this repository's `skills/` into the workspace's
`.agents/skills/` (Claude Code: `.claude/skills/`), keeping folder names.
Skip any folder that already exists there: the workspace's own `kb` and
`cross-module-owner-api` stay as they are. Tell the user which folders
you copied and which you skipped.

## 5. After installing

1. Ask the user to start a new session, so the agent loads the skills
   (Antigravity IDE: reload the window, then start a new conversation).
2. In the new session, run the `init` skill to set up the workspace.
3. Codex: tell the user to trust the project hooks with `/hooks`, or the
   checks will not run on edits.
4. Hermes: plugin skills load explicitly (`skill_view("context-routing:init")`);
   after init, run `hermes skills trust` in the workspace so
   `.agents/skills/` loads.
5. Every other agent without hooks: run the `check` skill before closing a
   session.
