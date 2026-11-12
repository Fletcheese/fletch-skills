# How I run Claude Code day to day

What I would tell someone setting up Claude today, from using Claude Code every working day across multiple workstreams.
Reading time: 4 minutes.
The detail is in the [detail pages](#detail-pages) listed at the end.

## Key takeaways

0. **Use Claude Code for everything, not just code.**
   It works on your own computer with your own tools: it reads and edits your files, runs your scripts, and uses the command-line tools you are already signed in to.
   Chat sees only what you attach or connect, and Cowork works in its own sandbox rather than your shell.
   Everything below (the instructions file, memory, hooks, skills) is files Claude Code reads on your machine.
   You do not need a terminal: Claude Code runs in the desktop app's Code tab.

1. **Run one front-desk session and send the work elsewhere.**
   I talk to one long-running session that keeps a board on disk and starts a separate session or background agent for each piece of work.
   Before this I had many sessions running in parallel, none were aware of what each other were doing, accidentally pasted prompts into the wrong one, and long hands-on sessions used about half my tokens.
   The board on disk is the source of truth, so a restart or a full context loses nothing.

2. **Keep memory small at the top.**
   Only one index file loads every session, and it lists categories, never individual facts.
   Claude opens a category index when the topic comes up, then the fact itself.
   My flat index once grew past the size Claude loads, and the facts below the cut became invisible with no error anywhere.

3. **Rules in the instructions file, facts in memory.**
   How Claude should behave goes in `CLAUDE.md`, which loads every time.
   What is true about a system goes in memory, which loads on demand.
   Mixing them meant rules were missed when their memory was not opened.

4. **Make the important rules a hook, not a reminder.**
   A hook runs whether or not anyone remembers it and, because it runs as a script outside the model, it costs no tokens unless it has something to tell Claude (unlike skills and memories, which cost context every time they load).
   My hooks stop Claude from sending email (it drafts, I send), ask before any Jira comment I have not approved, refuse providing links that only work for me, and stop hand edits to the board.
   Each hook logs when it fires, so one that silently stops working shows up in a daily hygiene report.

5. **Claude drafts, I send.**
   Anything another person reads goes to Outlook Drafts or to chat for approval of the exact text.
   An approval covers that text once.

6. **Say which customer or environment first.**
   Several of my clients run the same products with different set-ups, so a fact true for one is often false for another.
   Claude has to establish which context is true before it asserts anything.

7. **Reproduce a bug before changing anything.**
   Claude has to show the defect happening, change one thing, and show it gone, naming the environment both times.
   If it will not reproduce, it stops and says so.

8. **The live system outranks notes on disk.**
   A status file says where to look, never where a ticket stands.
   Claude reads the live ticket before acting on a local note.

9. **Fit the writing to the reader.**
   Before anything leaves, Claude classifies who will read it and what they will do with it, and removes obnoxious AI language (filler, hedging, "not just X but Y").

10. **Delegate the reading, keep the conclusion.**
    Broad searches, long logs and multi-ticket walks go to a background agent that returns an answer, not a dump.
    A hook tells each session how large its context has grown, because a session cannot see that itself.
    A 1M-token context window is much too large to work in.
    I cap it at 400k (`autoCompactWindow` in `settings.json`), have Claude hand off to a fresh session at 330k, and delegate work aggressively to subagents.

11. **Turn every correction into a rule, with the date and my words.**
    When Claude gets something wrong, the fix goes into the instructions or a skill with a quote of what I said.
    The quote stops a later session from "improving" the rule away.

12. **Separate history from current state.**
    History is for retrospection and iterative improvement.
    Current state is used for driving work forward.
    Separating them means Claude only uses current info when doing work and refers to History only when it's needed.
    Polluting current state with history makes it more likely that Claude gets confused and makes a mistake.

## What I tried and dropped

- One flat memory file.
  It was truncated without warning once it grew.
- Many sessions open in parallel with no tracker.
  Work was lost between them.
- Letting each session decide when to hand off.
  A context-size number no session could see was never acted on, so a hook now reports it.

## Caveats

1. Claude Code executes scripts on your computer as you.
   This requires a certain level of local permissions.
   I have no experience trying to use Claude Code logged in as a user on a managed/restricted device, but I suspect it causes problems.

2. The prospect of allowing Claude to run scripts locally was initially concerning as a general concept.
   At the beginning, Claude needed my explicit approval before running any script.
   In auto mode, a separate classifier checks each action before it runs, scripts included, and decides whether it is safe against various criteria including the session's context.
   I now use auto-mode confidently and without issues.
   The most important parts are enforced by hooks and explicit approve/deny rules.

## Detail pages

| Page | Purpose |
|---|---|
| [Setup overview](01-setup-overview.md) | The map of my Claude setup, so a reader can place every other page in this guide. Read this first. |
| [Operating rules](02-operating-rules.md) | The standing instructions I give Claude, with client detail removed, each with its reason. |
| [Memory design](03-memory-design.md) | How my Claude setup remembers facts between sessions, how it finds them, and the measured reasons behind the design. |
| [Skills](04-skills.md) | A summary of my roughly 70 skills, grouped by job, with where each came from and whether it could be reused as is. |
| [Hooks and guardrails](05-hooks-and-guardrails.md) | The rules my harness enforces with Claude Code hooks, what each one does, and the mistake behind it. |
| [Routines and delegation](06-routines-and-delegation.md) | What runs on a schedule, and how work is split between sessions and agents. |
| [Lessons](07-lessons.md) | Corrections that became rules, newest first, with what went wrong and where the rule now lives. |
