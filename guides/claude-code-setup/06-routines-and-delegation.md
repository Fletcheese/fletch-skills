# Routines and delegation

Purpose: what runs on a schedule, and how work is split between sessions and agents.

## The front desk: First Mate

One long-running session, pinned in the sidebar, that does no hands-on work.
It:
- adds a board row for each request and starts a task session or a background agent for it;
- tracks state on a board on disk, written only through `board.py` under a lock;
- relays to me only decisions, tests only I can run, finished deliverables and blockers, batched as numbered items I can answer in one line.

Why: usage analysis found about 6 sessions open at once (peak 20), about 35 prompts pasted into the wrong session, and long hands-on sessions using 48% of all tokens.

Board rules:
- statuses come from a fixed list;
- `blocked` needs who it is waiting on, and a chase date when I own the row;
- `deferred` needs a revisit date and the reason;
- once a ticket in Jira owns the follow-up, the row closes;
- a clear duplicate closes on sight, pointing at the surviving row.

A restart is a non-event, because the board on disk is the truth, not the conversation.

## Picking where work runs

| Work | Runs in | Why |
|---|---|---|
| A bounded read: search, log, ticket walk, analysis | Background agent | The result comes back here and nothing waits on me |
| Anything ending in a step I take (send, post, test, approve) | Its own task session | The sidebar's unread dot shows me what waits on me; a follow-up held in First Mate or lost with an agent shows nothing |
| Ticket work and "triage X" | Its own task session | I may want to steer it |
| A code change | Agent in its own git worktree | Changes stay isolated until merged |
| Browser or desktop UI testing | Forked agent via a test skill | Long loops of screenshots stay out of the main context |
| A lookup in the second organisation's tenant | The second profile via `claude -p` | Each profile's connectors reach only its own tenant |

Every task session's brief names its board row, the client and ticket key, the ticket folder, and any forwarded consent for an outward action, quoted verbatim.
A request to do work approves the work, not its outward step.
The session ends with a three-line status: the row and result, the evidence path, and what I decide.

## Context hygiene

- A hook reports each session's context size once it crosses a band.
  From 250k tokens the session delegates more of its reading; at 330k it writes a handoff document and a fresh session continues.
  The window is capped at 400k (`autoCompactWindow`), so autocompact near 367k is only a backstop.
  The front-desk session compacts at 250k instead of handing off, because every task session reports back to its address.
- Agents return conclusions, not file dumps.

## Scheduled routines

| Routine | When | What |
|---|---|---|
| Morning brief | Weekdays, early morning | The single morning orchestrator. Syncs a shared ticket cache, runs memory-store hygiene, work triage and the day's meetings as parallel agents, and publishes one combined page I can comment on. Replaced four separate routines. |
| Production heartbeat | Weekdays, every 2 hours in business hours | Three checks on a production system I support, as parallel agents. Two report only on a problem; one always gives a status line. Safe auto-remediation runs after both report. |
| Release watch | Weekdays, morning | Checks a vendor's release feeds and posts a digest. |
| Backup watchdog | Weekly | Confirms a configuration backup ran. |
| Meeting retries | One-shot, 15, 30 and 45 minutes after a meeting | Fetch the transcript and recap, which appear minutes after the call ends. Self-expiring. |

Design choices:
- Prefer one orchestrator with parallel agents over many routines, since each routine is a session with its own startup cost.
- Disable a retired routine with a "SUPERSEDED, do not re-enable" description, so a later session does not restore it after a profile reset.
- Routines report to First Mate by session id, which is kept in a file, never by title.

## Two ships

The same First Mate skill runs in both profiles and shares one board.
Each ship can write any row, and rows move between them with a handover command when I switch profiles.
The two cannot message each other, so they coordinate only through the board.

---

[Back to overview](README.md) · [Next: Lessons](07-lessons.md)
