# Memory design

Purpose: how my Claude setup remembers facts between sessions, how it finds them, and the measured reasons behind the design.
The fuller version, with a script that checks the store, is the guide [Organising a Claude Code memory store with a three-tier index](../memory-index-strategy.md).

## Three tiers

| Tier | File | Loaded | Holds |
|---|---|---|---|
| 1 | `MEMORY.md` | Every session | Categories only, never individual memories. About 3 KB. |
| 2 | `index-<category>.md` | When a session's topic touches that category | One line per memory, each line under about 200 characters. |
| 3 | The memory file | When an index line says it is the one needed | One fact, with frontmatter, about 2 KB. |

Why: the earlier flat index reached 26.9 KB against a load cap of about 24.4 KB.
Everything past the cut became invisible with no error.
Now a typical thread loads about 7 KB where the flat index cost 27 KB, out of roughly 500 KB of total detail.

## Facets, not a tree

A memory is listed in every category index it belongs to.
Measured at design time, only 5 of 79 memories were single-domain.
Forcing a multi-domain memory into one parent means a thread that opens the other index misses it.

Client indexes are thin routing tables (environments, hosting model, names).
Product indexes hold the substance, with client-specific entries marked as such.

## Routing

A `UserPromptSubmit` hook matches each prompt against keyword patterns and names the indexes to read.
It warns when two client indexes match the same prompt.
Patterns are phrases rather than bare words: a bare-word pattern fired on 14.8% of prompts, mostly the wrong client, while the phrase version fired on 2.7% with no wrong-client hits.

## Rules in `CLAUDE.md`, facts in memory

The test is "does it still apply when the topic never comes up?".
Imperative rules that always apply go in `CLAUDE.md`.
Declarative, topic-scoped facts go in memory.
Guardrails go in `CLAUDE.md` whatever their topic, because a buried guardrail is found only after the damage.

A behavioural rule written only into a memory leaf stops applying in every later session, because nothing auto-loads a leaf.
This was observed when one half of a two-rule memory (the half mirrored in `CLAUDE.md`) kept working and the other half silently stopped.

## What gets recorded

Record a memory when a future session would lose real time or ship something wrong without it:
- hidden system behaviour found by hitting it;
- a decision that overrides something already written down;
- a fact that is expensive to re-measure.

Do not record:
- reasoning slips;
- anything already in git, a tool description or `CLAUDE.md`;
- anything that will be false in a month;
- ticket state, which lives in the ticket folder.

Prefer appending to an existing memory over creating a new file, since each new file adds an index line that is paid on every load of that index.

## When an index grows too big

An index over budget is truncated silently.
A daily check warns at 14 KB and acts at 18 KB.
Use the levers in this order:
1. Shorten the index lines.
2. Remove duplicate listings.
3. Cut a sub-index, only along a subject with vocabulary of its own.
   A sub-index is a sibling reachable in one hop, not a fourth tier.

Deleting memories is not a lever.
Usage measured across 275 memories: median 6 uses, and only 5 were never used, all explainable.

## Upkeep

- A `PostToolUse` hook checks every memory write: frontmatter, index membership and size.
- A script checks the whole store for orphans and broken links.
- A `SessionEnd` hook records which memories each session actually opened or cited, which feeds the usage measurements.
- People are tagged inline as `#person/first-last` and found with grep, not with Obsidian's tag index.

## Known decay risks

- Default instructions tell Claude to add every new memory to `MEMORY.md`, which would flatten the store again.
  The root file carries a note that counters this.
- A memory written but never listed in any index is invisible forever.
  The orphan check catches it.

---

[Back to overview](README.md) · [Next: Skills](04-skills.md)
