# Organising a Claude Code memory store with a three-tier index

## The short version

- Claude Code auto-loads one memory file, `MEMORY.md`, into every session, and it has a size cap. Past the cap the file is cut off without any warning, so some memories stop being visible.
- Keep `MEMORY.md` to a list of broad categories. Each category gets its own index file, and each index lists the individual memories. That gives three tiers, and only the first loads automatically.
- A memory can appear in more than one category index. Most real memories touch two or three subjects, and a strict tree hides them from whoever looks in the other place.
- An index line should list the words that should make Claude open the file, not just name the subject.
- Rules about how Claude should behave go in `CLAUDE.md`. Facts go in memory. A behavioural rule written only into a memory file stops applying after the session that wrote it.

The rest of this note explains each point and the measurements behind it. Reading time is about nine minutes.

---

## Why a flat index fails

The default Claude Code behaviour is to write each memory as its own file and add a one-line pointer to `MEMORY.md`. That works until `MEMORY.md` grows past its load limit. Mine reached 26.9 KB against a cap of about 24.4 KB. That cap is what I measured as of October 2026, and it may change between Claude Code versions. Claude loaded the first part and silently dropped the rest, so on any given session an unknown set of memories was invisible. Nothing reported an error, and the index still looked complete.

## The three tiers

| Tier | File | When it loads | Typical size |
| --- | --- | --- | --- |
| 1 | `MEMORY.md` | Automatically, every session. Categories only, never individual memories. | about 3 KB |
| 2 | `index-<category>.md` | When the session touches that category and Claude chooses to open it | 3 to 15 KB |
| 3 | the memory file | When an index line points Claude to it | about 2 KB |

When I designed this, about 3 KB of root fronted roughly 490 KB of detail. A session that touches one subject loads about 7 KB of index. A session that touches none loads 3 KB, and that is the common case.

Because only the root loads by itself, it carries an explicit instruction: open the relevant category index before deciding that nothing is known about a topic. Without that line Claude reads the root, sees no detail, and concludes there is none.

## Choosing categories

Pick categories by the vocabulary a request arrives in. Good categories are things like a product or platform, a codebase, a team or customer you work with, an environment, or your own tooling. Each category should be a word or phrase that tends to appear in a request, because that is what makes Claude reach for the index.

Two kinds of category do different jobs:

- Subject indexes (a product, a tool, a platform) hold the substance. Most memories live here.
- Context indexes (a team, a customer, a project, an environment) are short routing tables: names, ids, where things are hosted, how this context differs from the others, and links into the subject indexes.

If you have contexts that must never be confused, give each one its own index and mark context-specific lines inside the subject indexes as such. Two codebases that share a stack, a test environment and production, or two teams with different conventions all fit here. A fact that is true in one context and false in another is the most damaging kind of memory to apply in the wrong place, so the index structure should keep them apart.

## Cross-list memories; do not force a tree

A memory may appear in as many category indexes as apply. When I designed this, only 5 of 79 memories belonged to a single subject. About 28 clearly belonged to two or three. Forcing each into one parent means a session that opens the other index never finds it, which is worse than the flat index it replaced.

There is a cost. Each listing is a line paid on every load of that index. A few weeks later the store had grown to 238 memories, 130 of them listed in two or more indexes, and close to half of the two largest indexes was the same 33 memories listed twice. The working rule is to cross-list cross-cutting process rules, where the known failure is a memory missed because the loaded index did not list it. For a subject memory that merely mentions a context, pick one owner index, list it in that one index, and let the session open both indexes when it needs both.

## Index lines advertise triggers

An index line answers one question: is this the file I want? "Database" is a useless line. "Connection pool exhaustion after deploy; the 30-second idle timeout" is useful, because those are the words a future request will contain. Keep each line under about 200 characters. Recipes, commands and ids belong in the memory, not in the line pointing at it. Long lines are what broke the flat index: mine averaged 339 characters, each one defensible, and together they exceeded the cap.

## Three levels, not more

Every extra tier is another file read before Claude has any content, and a tier Claude decides not to open might as well not exist. When a category index grows large, split it into sections with headings first. Headings cost nothing to skim.

## When an index gets too big

An index over its size budget is truncated in the same silent way, one tier down. Try these in order:

1. Shorten the lines. On one index this took it from 20.8 KB to 16.8 KB without removing an entry.
2. Merge true duplicates, and remove a memory's duplicate listing where one owner index is enough.
3. Split off a sub-index, but only along a subject that has vocabulary of its own. An index for "context A and product B together" cannot work, because nothing routes on an intersection, and a request that names only one of them would miss it. A split by type of question (diagnosing a problem versus building something) worked well for me because diagnosis has its own words: slow, timeout, memory leak, event log.

List a sub-index directly in `MEMORY.md` next to its parent so it is still one hop away. That keeps it at three tiers.

Deleting memories is not a fix for a big index. The problem is the length of the lines, not the memories behind them.

## `CLAUDE.md` versus memory

Both load automatically, so they are easy to confuse. `CLAUDE.md` is loaded in full, and every byte is paid on every session. `MEMORY.md` is a pointer file in front of much more detail.

The test is whether the content still applies when the topic never comes up.

- Instructions that always apply go in `CLAUDE.md`. Examples are reply format, where files go, shell rules and naming conventions.
- Facts about a topic go in memory. Examples are API behaviour, root causes, traps and how a system is set up.

Guardrails are the exception. If a recipe is buried, Claude works less efficiently. If a guardrail is buried, the damage has happened before the topic "comes up": the production change has run, or the real customer has been emailed. A rule that prevents an irreversible action goes in `CLAUDE.md` even though it is topic-specific.

### A behavioural rule kept only in memory stops working

Nothing loads a leaf memory automatically. A rule saved only in a memory file applies in the session that wrote it and is never seen again. I had a memory holding two rules about reply format. One was also in `CLAUDE.md` and kept working; the other existed only in the memory and stopped applying on new sessions. So whenever an instruction is about how Claude should behave, write it into `CLAUDE.md` at the same time. The memory can hold the reasoning and examples.

## What to record

Ask whether a future session would lose real time, or get something wrong, without this memory.

Record:

- Hidden system behaviour found by running into it, such as an error you could not have predicted from the documentation.
- A decision that overrides something already written down. A stale rule is worse than none, because Claude follows it confidently.
- A fact that is expensive to look up again: where something is hosted, which id is which.

Do not record:

- Reasoning mistakes. A memory does not reliably prevent a bad inference, and it costs load forever.
- Anything already in the code, git history, tool documentation or `CLAUDE.md`.
- Anything that will be false in a month, such as current counts or in-progress status. If it must be written, date it.
- The content of a document that already exists on disk. Record the lesson and point to the document.

Prefer adding to an existing memory over creating a new file. A new file costs a new index line on every future load; an addition costs almost nothing.

Aim for about 2 KB per memory. If one keeps growing, it is usually a document or project notes in the wrong place: move the body to a project folder and leave the lesson in memory. A long recipe that is always used as a whole can stay long, because splitting it adds index lines without reducing what gets read.

## Pruning: measure first

Before deleting memories, measure how often each one is used. I scanned 801 session transcripts and counted, per memory, how often it was opened or cited. By the time I measured usage the store held 275 memories, and the median was 6 uses. Only 5 had zero, and each was linked correctly and simply belonged to a subject that had not come up yet. Deleting them would have saved 32 KB out of the store's 1.73 MB at the time.

Delete a memory only when another memory has replaced it, when the system it describes no longer exists, or when it is project status whose lasting lesson is recorded elsewhere.

## Two ways the structure decays

1. Claude Code's default instructions say to add a pointer to `MEMORY.md` for every new memory, so a later session, or a memory clean-up command, will add memory-level lines to the root and flatten it back. Put a note at the top of `MEMORY.md` saying it holds categories only, and repeat the rule in `CLAUDE.md`.
2. Orphans. With two index tiers, a memory can be written and never linked from any index, and then nothing ever finds it. A small read-only script that checks every memory file is linked from at least one index, and every index link resolves, catches this. Run it after any bulk change.

Here is one. Save it as `check-index.js` and run `node check-index.js <memory-dir>`. It changes nothing. It prints each problem, then a count line, and exits 1 if it found a problem. It exits 2 if the directory has no memories or no indexes, so pointing it at the wrong folder cannot pass as a clean run.

```js
// check-index.js: read-only orphan and broken-link check for a three-tier memory store.
const fs = require('fs');
const path = require('path');

const dir = path.resolve(process.argv[2] || '.');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
const indexes = files.filter(f => /^index-.*\.md$/.test(f));
const memories = files.filter(f => f !== 'MEMORY.md' && !indexes.includes(f));
const problems = [];
const linked = new Set();

// Markdown links to .md files, and [[wikilinks]].
function targets(text) {
  const out = [];
  for (const m of text.matchAll(/\]\(([^)\s#]+\.md)(#[^)]*)?\)/g)) out.push(m[1]);
  for (const m of text.matchAll(/\[\[([^\]|#]+)[^\]]*\]\]/g)) out.push(m[1].trim() + '.md');
  return out;
}

for (const src of ['MEMORY.md', ...indexes]) {
  const p = path.join(dir, src);
  if (!fs.existsSync(p)) { problems.push(`missing: ${src}`); continue; }
  for (const t of targets(fs.readFileSync(p, 'utf8'))) {
    if (/^[a-z]+:/i.test(t)) continue; // web links
    const resolved = path.resolve(dir, decodeURIComponent(t));
    if (!fs.existsSync(resolved)) problems.push(`broken link in ${src}: ${t}`);
    else if (src !== 'MEMORY.md') linked.add(path.relative(dir, resolved));
  }
}
for (const m of memories) if (!linked.has(m)) problems.push(`orphan, in no index: ${m}`);

problems.forEach(p => console.log(p));
console.log(`checked ${memories.length} memories and ${indexes.length} indexes: ${problems.length} problem(s)`);
if (memories.length === 0 || indexes.length === 0) {
  console.log('no memories or no indexes found: is this the memory directory?');
  process.exit(2);
}
process.exit(problems.length ? 1 : 0);
```

## Adding a memory under this scheme

1. Write the memory file with its frontmatter, one fact per file, and links to related memories.
2. Add its line to every relevant `index-<category>.md`, not to `MEMORY.md`.
3. Add a line to `MEMORY.md` only when creating a new category.
4. Keep the index line under about 200 characters, and make it name the words that should trigger opening the file.
