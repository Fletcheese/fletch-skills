# C4. Future agent and future you, recall

One cell of the [writing taxonomy](../taxonomy.md): classify there first, then read only this file. Every cell has the same shape, and the why sits beside each rule.

**Artefacts:** project state files, `HISTORY.md` files, decision records.
**Reader does:** reads the present state, or the record, and never confuses the two.
**Reviewed:** no.

| Property | Setting |
|---|---|
| Speculation | none in a state file; open questions listed as open |
| History | this is where history lives, in its own file: dated headings, oldest first, append-only, never edited, never read for current state |
| Length | state fits on one screen; history unbounded |
| Tense | state present; history past |
| Markers | mandatory in state on anything not directly observed |
| Vocabulary | internal |
| Internals | yes |
| Formatting | state as a table or short list; history as dated headings |

**Must contain**
- State: what stands now, what is outstanding, and the date it was last verified, because an undated state file is trusted long after it is wrong.
- History: what changed, when, and why, in the order it happened, because the record is only useful if its order is the real one.

**Must not contain**
- State in the history file, because a reader will trust a stale entry.
- History in the state file, because the reader who wants the state has to read past it ([rule 1](../rules/rule-1-history-out.md)).
- An issue's status copied from the tracker, because the tracker outranks any local file: the file says where to look, never where the issue stands.

**Tells**
- Exact: a past-tense dated sentence in a state file; an edited older entry in a `HISTORY.md` (version control shows it); "Status: Done" recorded against an issue number in a local file.
- Judgement: a state file longer than one screen.

**Examples**
- Defect: a `STATE.md` whose first section is "What happened last week", with the current blocker in paragraph four.
- Good: a `STATE.md` with a five-row table (component, state, last verified) and one line pointing at `HISTORY.md` for how it got there.

---

Rules this cell leans on: [History out of current-state documents](../rules/rule-1-history-out.md), [Confidence markers](../rules/rule-2-confidence-markers.md), [Only exact rules may block](../rules/rule-3-only-exact-blocks.md). Back to the [writing taxonomy](../taxonomy.md).
