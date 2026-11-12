# Skills

Purpose: a summary of my roughly 70 skills, grouped by job, with where each came from and whether it could be reused as is.
This is not the skill text.

"Portable" means another person could use it with only path and name changes.
"Pattern" means the idea transfers but the skill is tied to my systems.

"Source" says where a skill came from.
"Mine" means I wrote it.
[Matt Pocock](https://github.com/mattpocock/skills) means a fork of a skill from Matt Pocock's `mattpocock/skills`, MIT licensed.
[pstack](https://github.com/cursor/plugins/tree/main/pstack/skills) means a fork of a skill from Lauren Tan's `pstack` plugin in `cursor/plugins`, MIT licensed.
Anthropic means one of Anthropic's own skills.

## Running the day

| Skill | When it fires | What it does | Portable | Source |
|---|---|---|---|---|
| first-mate | "first mate", "dispatch this" | Runs one long-standing session that dispatches work to task sessions and agents, tracks it on a board on disk, and relays only what needs me | Pattern | mine |
| defer / done | Typed | Parks a session until a revive date, or closes it with evidence, updating its board row and archiving the session | Pattern | mine |
| handoff | Context too large, or "hand off" | Compacts the conversation into a handoff document for a fresh session | Yes | [Matt Pocock](https://github.com/mattpocock/skills) |
| meeting-notes | "taking notes for a call" | Records a meeting in its folder, hands the actions to the board as rows, and writes an outcomes summary | Pattern | mine |
| answer-brief | Typed | Acts on my answers and comments on the morning brief page | Pattern | mine |
| [ask-me-artifact](../../skills/ask-me-artifact/SKILL.md) | Answers needed asynchronously | Publishes a page of blocking questions and stores the answers for a later session to read | Pattern | mine |
| quota | "/quota" | Shows usage against the rolling and weekly limits for both accounts | Yes | mine |
| delegate-b / delegate-default | Work for the other profile | Runs a task in the other Claude profile through `claude -p` and reads back the result | Pattern | mine |

## Writing and outward text

| Skill | When it fires | What it does | Portable | Source |
|---|---|---|---|---|
| draft-router | Any draft I will send | Writes the draft, runs the AI-tell checklist, keeps a record copy, and routes it to Outlook Drafts, an unsent meeting window, chat for review, or a paste-ready block | Pattern | mine |
| [writing-for-readers](../../skills/writing-for-readers/SKILL.md) | Text someone else acts on | Classifies the reader and the job, then drafts or reviews against that cell's rules | Yes | mine |
| unslop | Applied by other skills | A numbered checklist of AI writing tells to remove | Yes | [pstack](https://github.com/cursor/plugins/tree/main/pstack/skills) |
| writing-for-agents | Editing a skill, hook or `CLAUDE.md` | Rules for text whose reader is an agent | Yes | [Matt Pocock](https://github.com/mattpocock/skills) |
| to-questionnaire | A decision someone else must make | Turns it into a questionnaire with options and a recommendation | Yes | [Matt Pocock](https://github.com/mattpocock/skills) |

## Investigation and testing

| Skill | When it fires | What it does | Portable | Source |
|---|---|---|---|---|
| diagnosing-bugs | "diagnose", "debug this", something broken or slow | A replicate-first diagnosis loop with evidence at each step | Yes | [Matt Pocock](https://github.com/mattpocock/skills) |
| on-fire | A live incident | Switches to the fastest low-risk mitigation, behind a four-line risk call and one yes | Yes | mine |
| blast-radius | "what could this break" | Finds what a change could break beyond the diff and proves the safety fact by running code | Yes | [pstack](https://github.com/cursor/plugins/tree/main/pstack/skills) |
| chrome-testing / desktop-app test | A browser or desktop UI step | Drives the UI in a forked agent, with screenshots and console output | Pattern | mine |
| research | A question needing sources | Investigates against primary sources and writes findings to a file | Yes | [Matt Pocock](https://github.com/mattpocock/skills) |
| grilling | "grill me" | Stress-tests a plan by relentless questioning | Yes | [Matt Pocock](https://github.com/mattpocock/skills) |
| show-me-your-work | Long or unattended work | Keeps a decision log, one row per decision with its evidence | Yes | [pstack](https://github.com/cursor/plugins/tree/main/pstack/skills) |

## Planning and product

| Skill | When it fires | What it does | Portable | Source |
|---|---|---|---|---|
| wayfinder | An effort too big for one session | Maps it as decision tickets and works them one at a time | Pattern | [Matt Pocock](https://github.com/mattpocock/skills) |

## Files and formats

docx, xlsx: create and edit Office files.
Portable.
Source: Anthropic.

## Client and product specific (about 30)

Start-of-work routines that load the relevant memory index and read the live ticket.
Product dev loops covering branch, build, deploy to a personal test environment and verify.
Data recovery and log triage for a production ingestion pipeline.
Report clean-up and template editing for document-generation.
Production monitors and dashboards.
Not portable.
What transfers is the shape: one start-of-work skill per client, so every session on that client begins with the same context and the same write gates.

## Patterns worth copying

- A skill names the failure that prompted each rule, with the date and my words, so a later edit does not "improve" the rule away.
- Skills that act on outward systems stop at a draft and name the exact step that is mine.
- Skills that need no conversation context run in a forked agent with all their inputs passed as arguments.

---

[Back to overview](README.md) · [Next: Hooks and guardrails](05-hooks-and-guardrails.md)
