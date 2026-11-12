# Setup overview

Purpose: the map of my Claude setup, so a reader can place every other page in this guide.
Read this first.

## Products in use

| Product | Used for |
|---|---|
| Claude Code in the Claude desktop app (Code tab) | Almost all work. One long-running "First Mate" session plus many short task sessions. |
| Claude Code CLI with a second profile | A second Claude account for a second organisation's Microsoft 365 and Atlassian tenants. Other sessions call it non-interactively (`claude -p`) when a lookup needs that tenant. |
| Artifacts (published pages) | The daily morning brief, question pages that collect answers asynchronously, and dashboards. |
| Scheduled tasks (desktop app) | Morning brief, production heartbeats, release watch, one-shot retries. See [Routines and delegation](06-routines-and-delegation.md). |
| Obsidian | Meeting notes, and a phone-readable export of the board. Not used as Claude's memory index. |

## Connectors

Microsoft 365 (mail, calendar, Teams; one tenant per profile), Atlassian (Jira and Confluence), a built-in browser and Claude in Chrome, and scheduled tasks.
Each profile's connectors reach only its own tenant, so any mail or Teams lookup searches both profiles before reporting "not found".

## Where things live

| Thing | Location | Loaded |
|---|---|---|
| Standing rules | `~/.claude/CLAUDE.md`, plus a session-preferences file a SessionStart hook injects | Every session |
| Memory | A git-tracked folder; per-project memory folders are junctions to it | Root index every session; the rest on demand |
| Skills | `~/.claude/skills/<name>/SKILL.md`, about 70 | By trigger or by `/name` |
| Hooks | A git-tracked `hooks/` folder, wired in `~/.claude/settings.json` for both profiles | On matching tool calls and events |
| Board | `first-mate/board.md` and `rows/<id>.md`, written only by `board.py` | Read by First Mate and routines |
| Task work | One folder per ticket key, or `YYYY-MM-DD-<slug>` when there is no ticket | When the task is opened |
| Code | Separate repo checkouts, never inside the Claude folder | |

The Claude working folder is itself a git repo, so memory, hooks and skills have history, and a daily snapshot commits them.

## How a request flows

1. I talk to First Mate, which adds a board row and starts a task session or a background agent.
2. The task session loads the client's memory index, reads the live ticket, does the work in the ticket folder, and drafts anything outward-facing.
3. Outward text goes to Outlook Drafts or to chat for approval.
   Claude never sends.
4. The session reports a three-line status to First Mate, which updates the board and tells me only what needs me.

## Next pages

- [Operating rules](02-operating-rules.md)
- [Memory design](03-memory-design.md)
- [Skills](04-skills.md)
- [Hooks and guardrails](05-hooks-and-guardrails.md)
- [Routines and delegation](06-routines-and-delegation.md)
- [Lessons](07-lessons.md)

---

[Back to overview](README.md) · [Next: Operating rules](02-operating-rules.md)
