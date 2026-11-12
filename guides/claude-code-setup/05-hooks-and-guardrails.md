# Hooks and guardrails

Purpose: the rules my harness enforces with Claude Code hooks, what each one does, and the mistake behind it.

A hook is for a rule that must hold with no one remembering it.
A memory helps only when it is recalled at the right moment; a hook fires whether or not anyone thought of it.
A hook runs as a script outside the model, so it costs no tokens unless it sends something back to Claude: added context, a refusal, or a warning.

## House pattern

- Narrow matchers.
  A hook that fires on everything becomes noise, and people learn to ignore it.
- Wording and patterns live in a sibling file, so they can be tuned without touching code.
- Hooks add context by default.
  They block only where the trigger is exact, never on a heuristic that can be wrong.
- No network calls at hook time.
- Fail open: any internal error allows the call.
- Every hook logs each firing.
  A daily report lists any wired hook that has not fired in 30 days, because a hook that fails open and a broken hook look identical.
- A test script runs every hook against sample payloads, after any edit and after any Claude Code upgrade.

## Outward-action gates

| Hook | Event | What it does | Why |
|---|---|---|---|
| mail-send-guard | PreToolUse | Denies shell commands that send, delete or reply to mail (Graph, Outlook COM, SMTP), including inside scripts the command runs | Claude drafts and I send |
| jira-comment-gate | PreToolUse | Lets a Jira write through only if its exact text was approved and recorded (one use each, 7-day expiry); asks about any other comment | An approval covers that text once |
| outward-link-check | PreToolUse | Denies a draft or post carrying a link only my PC can open (localhost, a custom URL scheme) | Recipients got links that would not open |
| no-text-colour | PreToolUse | Denies Jira or Confluence writes that set a fixed text or background colour | A comment rendered white-on-white in light theme |
| ticket guard (per project) | PreToolUse | House standards on a Jira issue being created or edited | Tickets missed house standards |

## Safety on the local machine

| Hook | Event | What it does | Why |
|---|---|---|---|
| shell-safety | PreToolUse | Flags mistakes that fail silently: truncated pipelines, nested `powershell -Command`, `sed -i` on CRLF files, and others | Each one failed silently at least once |
| process-kill guard | PreToolUse | Denies killing a named desktop client process | An agent once force-killed an app I was actively using |
| cd-drift-guard | PreToolUse | Denies `cd` that would move the session's working directory | File links written afterwards stopped opening |
| board-guard | PreToolUse | Denies hand edits to the board; only `board.py` writes it, under a lock | Two sessions writing by hand lost updates and issued the same row id twice |
| browser lease | PreToolUse | Only one session at a time may drive the shared browser; the lease lapses after 10 minutes idle | Two sessions driving one browser collide |
| meeting-focus-guard | PreToolUse | While I am in a meeting, denies calls that open or focus a window | Windows opening during a call |

## Context added to the session

| Hook | Event | What it does | Why |
|---|---|---|---|
| memory-router | UserPromptSubmit | Names the memory indexes this prompt needs, and warns when two clients match | Facts from one client were applied to another |
| context-ceiling | UserPromptSubmit | Reports the session's own context size once it crosses a band | 181 of 758 sessions ended past 300k tokens, and the hand-off rule fired on none, because no session can see its own size |
| delegation-nudge | UserPromptSubmit | Names a delegable shape (browser loop, broad search, ticket walk, long log) | Main threads filled with file dumps needlessly burning tokens. |
| both-tenants | PostToolUse | An empty mail or Teams search in one tenant says the other has not been searched | "Not found" was reported when the item was in the other mailbox |
| connector-fallback | PostToolUse | A failed Atlassian connector call gets the scoped-token REST route | The connector times out at startup on some days |
| delegation-denials | PostToolUse | A delegated `claude -p` run that had tool calls denied is reported as partial | A delegated run reported success with half its work refused |
| commit-push | PostToolUse | After a commit, pushes if ahead of upstream, except repos owned externally | "Commit" means commit and push, for internal repos |
| memory-write-check | PostToolUse | Checks a memory just written: frontmatter, index membership, size | A memory no index lists is invisible |
| file-link-check | Stop | Blocks a final message once if a local file link will not open | Links in replies would not open in the app |
| session-start | SessionStart | Injects session preferences and routes on the working directory | Rules that must apply from the first turn |
| session-end-recall | SessionEnd | Records which memories the session opened or cited | Feeds the usage measurements |

## Product-specific guards (not portable)

Several hooks catch traps specific to one product's API or deploy tool: a code pattern that never detects a deleted object, a status transition that overwrites a resolution set beforehand, a deploy failure that may be half-applied.
The pattern transfers: when a trap costs you once, encode the exact trigger as a hook with a pointer to the fix.

---

[Back to overview](README.md) · [Next: Routines and delegation](06-routines-and-delegation.md)
