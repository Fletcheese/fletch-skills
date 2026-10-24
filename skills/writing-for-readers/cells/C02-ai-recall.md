# C2. AI only, recall

One cell of the [writing taxonomy](../taxonomy.md): classify there first, then read only this file. Every cell has the same shape, and the why sits beside each rule.

**Artefacts:** memory files, index lines, conventions an agent consults on demand.
**Reader does:** recognises the situation and applies the fact.
**Reviewed:** no.

| Property | Setting |
|---|---|
| Speculation | none in the fact; one dated "not yet independently confirmed" tag is allowed |
| History | a one-line pointer to where the history lives, at most; a trap is stated as the trap, not as the incident |
| Length | a file about 2 KB or 40 lines; an index line under 200 characters |
| Tense | present |
| Markers | mandatory: a `Verified <date>` stamp, or the hedge tag |
| Vocabulary | internal, the same words the prompts use, front-loaded in the index line |
| Internals | paths, names, commands |
| Formatting | frontmatter, short paragraphs, related links |

**Must contain**
- The fact in present tense, because a memory is read in a future where past-tense framing is noise.
- The trigger conditions in its description, because the description is the only thing that decides whether the file is ever opened.
- What it costs not to know it, because that is the test for whether it should exist at all.

**Must not contain**
- Incident timelines, log ids, who said what when, deploy dates, superseded values ([rule 1](../rules/rule-1-history-out.md)), because a memory is read for what is true now.
- Project state such as counts and what is outstanding, because that changes weekly and belongs in the project's own files or tracker, which outrank any memory anyway.
- A second copy of a fact another file owns, because two copies diverge and the reader cannot tell which is current.

**Tells**
- Exact: two or more ISO dates in one file outside a `Verified` stamp; an "on <date>" narrative sentence; an issue number in the file name; a description line over 200 characters.
- Judgement: a file well over 2 KB (check whether it is project state or a deliverable in the wrong place before splitting it); the same fact in two files.

**Method:** as for C1.

**Examples**
- Defect: "On 3 May the staging deploy failed because the build cache was stale; we cleared it and it worked." A narrative, in past tense, that an agent has to translate before it can use it.
- Good: "The staging deploy fails with `checksum mismatch` when the build cache is stale. Clear it with `make clean-cache` and redeploy. Verified 2026-05-03."

---

Rules this cell leans on: [History out of current-state documents](../rules/rule-1-history-out.md), [Confidence markers](../rules/rule-2-confidence-markers.md), [Only exact rules may block](../rules/rule-3-only-exact-blocks.md). Back to the [writing taxonomy](../taxonomy.md).
