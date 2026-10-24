# C3. Future agent and future you, act

One cell of the [writing taxonomy](../taxonomy.md): classify there first, then read only this file. Every cell has the same shape, and the why sits beside each rule.

**Artefacts:** handoff documents, tool READMEs, runbooks that a later session or a colleague follows cold.
**Reader does:** picks up the work with none of this session's context.
**Reviewed:** no.

| Property | Setting |
|---|---|
| Speculation | labelled, under `Open questions` or `Hypotheses` |
| History | labelled section or pointer; a README gets a `HISTORY.md` beside it; a handoff carries only the history that changes a next step |
| Length | no ceiling, but by reference: paths and URLs to what already exists, never a copy |
| Tense | imperative for steps, present for state |
| Markers | mandatory on any claim the next session will act on |
| Vocabulary | internal, but every acronym and codename expanded once, because the reader is cold |
| Internals | everything needed to run |
| Formatting | state first (project, issue, where things stand), then steps, then reference |

**Must contain**
- The facts a fresh session cannot guess: which project or environment, and which issue or task, because similar projects differ in the details and a guess reads as fact.
- Current state and the next steps, because that is the job.
- What was ruled out, because otherwise it is re-trodden.
- Pointers to the artefacts that hold the detail, because a copy diverges from its source the moment either is edited.

**Must not contain**
- Copies of content that lives in a spec, a plan, a ticket, a commit or a diff.
- A narrative of the session, because "we did X then Y then Z" is history that changes no next step.
- Secrets, because the file outlives the session and travels.

**Tells**
- Exact: no project or environment named in the first ten lines; no issue or task reference; a code block over forty lines.
- Judgement: history that changes no next step; a code block that duplicates a file on disk.

**Examples**
- Defect: a handoff that opens "Today was a long one. First I looked at the logs, then..." and names the repository on line 30.
- Good: "Project: `billing-service`, issue #412, staging only. State: the retry fix is on branch `fix/412-retry` and tests pass locally (Verified). Next: deploy to staging and rerun the failing nightly job. Ruled out: clock skew (both hosts within 20 ms)."

---

Rules this cell leans on: [History out of current-state documents](../rules/rule-1-history-out.md), [Confidence markers](../rules/rule-2-confidence-markers.md), [Only exact rules may block](../rules/rule-3-only-exact-blocks.md). Back to the [writing taxonomy](../taxonomy.md).
