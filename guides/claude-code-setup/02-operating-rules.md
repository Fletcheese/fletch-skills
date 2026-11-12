# Operating rules

Purpose: the standing instructions I give Claude, with client detail removed, each with its reason.
Use it to compare rule sets, or to adopt a rule with the failure that justifies it.

The rules live in `CLAUDE.md` (guardrails and file placement) and a session-preferences file a hook injects at session start (reply format, links, asking).
A rule that must hold with no one remembering it is also a hook (see [Hooks and guardrails](05-hooks-and-guardrails.md)).

## Guardrails

| Rule | Reason |
|---|---|
| Identify the client and environment before asserting anything. Ask if it is ambiguous. | Several clients run the same products with different set-ups, so a fact true for one is often false for another. |
| The live ticket outranks anything on disk. A status file says where to look, never where a ticket stands. | Local notes go stale. |
| Replicate a behavioural defect before changing anything, then change, then retest, with evidence at both ends and the environment named. If it will not replicate, stop and say so. | A fix made without replicating first is indistinguishable from an inability to replicate (end-to-end/E2E testing). |
| Use designated test data and check that no bulk change can send mail to a real recipient. | A UAT environment accidentally sent a real email. |
| Run `git diff --stat` before committing. | The edit tool can flip a file's line endings, which makes the whole file show as changed. |
| Any text a client or colleague will read goes through the writing skill ([writing-for-readers](../../skills/writing-for-readers/SKILL.md)) before anyone sees it. | Classifying the reader first changes length, tone and what makes it in. |
| Claude drafts outward text. It never sends email or Teams messages, and posts a Jira comment only with my recorded approval of that exact text. | Outward actions cannot be taken back. |

## Where files go

| Rule | Reason |
|---|---|
| Transient files go to the session scratchpad. | Keeps the working tree clean. |
| Ticket work goes to one folder keyed by the bare ticket key, created if missing, never a variant name. | Every session finds the same folder from the key alone. |
| Repo working copies stay in the code folders, never inside the Claude folder. | Avoids nested git repos and accidental commits. |
| One sentence per line in every file; no hard wraps. | Diffs stay readable, and hard wraps break markdown rendering. |

## Shell

| Rule | Reason |
|---|---|
| Redirect long output to a file, then read the file. Never pipe to `head` or `Select-Object -First`. | Truncating a pipeline kills the upstream process and fakes the exit code. |
| Keep failure detail: widen a filter rather than drop lines. | The line that explains a failure is often the one filtered out. |
| Hand me a bare PowerShell script, never `powershell -Command "..."`. | Nested quoting breaks silently. |
| Diagnostics come as one read-only script that prints everything. | Saves me running commands one at a time and pasting results back. |

## Talking to me

| Rule | Reason |
|---|---|
| End every reply with numbered takeaways, one line each, and say if an earlier claim was corrected. | Long replies require scrolling up so the end is often read first. |
| Show which memories loaded this turn as a linked tree. | It makes recall visible, so a wrong or missing memory gets caught. |
| List every ticket discussed, with a tier glyph and a gist taken only from a title actually read. | Lets me see at a glance what the session touched. |
| To approve text I will send, show the exact text in the closing message, not in a summary box. | The app collapses text next to a question box, so I cannot see what I am approving. |
| Saving an unsent draft needs no approval: save it, then show it. | Asking first wastes time. |
| Do not ask about cleaning up test data. | Test data is already properly separated from real content by design. |
| Every file or URL mentioned is a clickable link. | I work from the links. |
| Decide where Claude is better placed to judge (for example, whether to record a memory), and report what was done in one line. | Automate tedious manual decisions. Ensure agreement is reached on the criteria for automation. |

## Delegation

Delegate without being asked: broad exploration, browser test loops, Jira or Confluence walks of more than a handful of issues, and long logs.
Ask the agent for the conclusion, not the dump.
Keep in the main thread anything that needs my judgement mid-task.
Reason: a session's context fills with file dumps it never needed, and a full context costs quality before it costs money.

## Harness ideas

An idea for changing Claude itself that comes up during other work gets one line in a ledger with a priority, and the work carries on.
P1 items reach the next morning brief.
Reason: improvements discussed mid-task were otherwise lost.

---

[Back to overview](README.md) · [Next: Memory design](03-memory-design.md)
