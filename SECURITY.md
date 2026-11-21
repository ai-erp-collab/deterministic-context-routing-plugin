# Security Policy

## What runs on your machine

The plugin itself is Markdown skills plus hook definitions. On Claude Code
and Cursor the hooks call the workspace's own `tools/kb/kb.py` with
Python. That tool uses the standard library only, reads and writes files
inside the workspace, and makes no network calls. Problems in any of these
parts are in scope:

- a hook or the integrity tool reading or writing outside the workspace;
- a hook or the tool running code taken from workspace content;
- a skill instruction that leads the agent to send data out of the
  repository or to run commands the user did not ask for;
- anything in the install instructions that fetches more than this
  repository.

## Supported versions

Only the latest released version receives fixes. Check `CHANGELOG.md` for
the current one.

## Reporting a vulnerability

Please do not open a public issue for a security problem.

1. Preferred: use **Report a vulnerability** on the repository's
   **Security** tab (GitHub private vulnerability reporting).
2. Or email `tolstolutskyy@gmail.com` with "context-routing security" in
   the subject.

Include the plugin version, the agent and its version, your OS, and the
steps or the workspace content that triggers the problem.

You should get an acknowledgement within 7 days. Once the problem is
confirmed, a fix is released and the report is credited in `CHANGELOG.md`
unless you ask otherwise.
