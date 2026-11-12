# Lessons

Purpose: corrections that became rules, newest first, with what went wrong and where the rule now lives.
A reader can check their own setup against each one.

| Date | What went wrong | Rule now | Lives in |
|---|---|---|---|
| 2026-11-12 | A Teams search filtered by sender missed messages the sender had sent | Read the chat directly before reporting "nothing found" | [Skill](04-skills.md) |
| 2026-11-12 | Sessions assumed a Jira comment was wanted | "If I explicitly approved a comment, pass it along as such, but never ASSUME a comment is warranted." Approved text is recorded and posted once | [Hook](05-hooks-and-guardrails.md) and [preferences](02-operating-rules.md) |
| 2026-11-11 | A reply told a client facts about their own system that they already know | "Don't tell people things they obviously already know." Keep only what is news to the reader | [Skill](04-skills.md) |
| 2026-11-11 | A request to one supplier landed in the wrong mailbox | Each recipient type has a fixed sending mailbox | [Skill](04-skills.md) |
| 2026-11-10 | Notes named files without linking them | "If you call out a file/artifact, you should link directly to it. Never just name it." | [Preferences](02-operating-rules.md) |
| 2026-11-09 | Claude asked before saving an unsent draft | Saving a draft needs no approval: save it, then show it | [Skill](04-skills.md) and [preferences](02-operating-rules.md) |
| 2026-11-09 | Nothing structurally stopped a mail send | Shell commands that send or delete mail are denied | [Hook](05-hooks-and-guardrails.md) |
| 2026-11-05 | Follow-ups that needed me landed in the front-desk thread or with an agent, where nothing flagged them | "If there is a clear follow-up that I must (or specify that I will) perform, it belongs in a new session." | [Skill](04-skills.md) |
| 2026-11-05 | The board kept tracking work Jira already owned | "It's no longer the board's job to track once it's in Jira." Close the row | [Skill](04-skills.md) |
| 2026-11-05 | Duplicate rows waited for a decision | Close a clear duplicate on sight, pointing at the surviving row | [Skill](04-skills.md) |
| 2026-11-04 | Triage went to a background agent | "Whenever I say 'Triage' that should imply a new crew." | [Skill](04-skills.md) |
| 2026-11-04 | A reply carried links that open only on my PC | Never send a link only this PC can open | [Hook](05-hooks-and-guardrails.md) and [skill](04-skills.md) |
| 2026-11-03 | A Jira comment went out in a fixed colour that was unreadable in one theme | No fixed text or background colours in Jira or Confluence writes | [Hook](05-hooks-and-guardrails.md) |
| 2026-10-29 | An agent force-killed a desktop app I was using | Never kill that process; use the sanctioned stop script | [Hook](05-hooks-and-guardrails.md) |
| 2026-10-23 | Two sessions editing the board by hand lost updates and issued the same id twice | Only `board.py` writes the board, under a lock | [Hook](05-hooks-and-guardrails.md) and script |
| 2026-10-22 | Task sessions drafted replies I had already sent | Check Sent Items in both mailboxes before drafting a reply | [Skill](04-skills.md) |
| 2026-09-14 | 181 of 758 sessions ended past 300k tokens and the hand-off rule fired on none | A hook reports context size, since a session cannot see it | [Hook](05-hooks-and-guardrails.md) |
| 2026-09-08 | Memory indexes passed their size budget | Shorten index lines first, then remove duplicates, then cut a sub-index by vocabulary | [Memory design](03-memory-design.md) |
| 2026-09-02 | A behaviour rule written only into a memory stopped applying | Every behaviour rule also goes into `CLAUDE.md` | [Memory design](03-memory-design.md) |
| 2026-09-01 | Claude asked me which memories to keep | "I prefer not being asked whenever possible." Decide using defined criteria, and report in one line | [Memory design](03-memory-design.md) |
| 2026-08-24 | The flat memory index was truncated and memories went invisible | Three-tier index; the root holds categories only | [Memory design](03-memory-design.md) |
| Undated | An edit flipped a file's line endings and the commit showed every line changed | Run `git diff --stat` before committing | `CLAUDE.md` ([Operating rules](02-operating-rules.md)) |

## Patterns across these

- Most rules started as one bad output, so record the trigger and the exact words, not a summary.
- A rule that matters ends up in a hook.
  A rule in prose is followed until it is inconvenient.
- When a rule changes, the old one is removed in the same pass.
  A stale rule is followed confidently, which is worse than no rule.

---

[Back to overview](README.md) · [Previous: Routines and delegation](06-routines-and-delegation.md)
