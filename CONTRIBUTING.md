# Contributing

Thanks for helping improve context-routing. Bug reports, install notes for
agents we have not tried, and suggestions for the skills are all welcome.

## How this repository is built

This repository is generated. Its contents are exported from a separate
source tree, and each export replaces every file here. Because of that:

- A pull request is never merged as is. If the change is accepted, a
  maintainer carries it over to the source and it arrives with the next
  release; the pull request is then closed with a link to that release.
- Your authorship is kept: the release notes credit you, and the commit
  can carry a `Co-authored-by` line if you want one.
- For anything larger than a small fix, open an issue first so we can
  agree on the approach before you write it.

## Reporting a bug

Use the **Bug report** issue form. The most useful details are the plugin
version, the agent and its version, your OS, and the output of
`python tools/kb/kb.py check` from the workspace.

Security problems go through `SECURITY.md`, not public issues.

## Changing a skill

- Keep the skill description short: it is loaded into every session, and
  each extra word costs tokens for every user.
- Keep examples neutral: no real company, product, or internal system
  names. Use placeholders such as `billing`, `orders`, `Project X`.
- If you change what the integrity tool checks, say which check and give a
  small workspace that shows the old and new behaviour.

## Licence of contributions

This repository is MIT-licensed (`LICENSE`). By opening a pull request you
agree that your contribution is released under the same licence.

## Code of conduct

Participation is governed by `CODE_OF_CONDUCT.md`.
