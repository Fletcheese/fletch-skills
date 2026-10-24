# C6. Colleague, diagnose

One cell of the [writing taxonomy](../taxonomy.md): classify there first, then read only this file. Every cell has the same shape, and the why sits beside each rule.

**Artefacts:** internal incident write-ups, support-case notes, bug investigations in a ticket, diagnosis notes.
**Reader does:** picks up the reasoning and continues it, or judges whether to escalate.
**Reviewed:** no, unless it goes to a client, in which case it is rewritten as C10.

| Property | Setting |
|---|---|
| Speculation | open, and labelled: hypotheses welcome, each marked, each with what would confirm or kill it |
| History | free, and required: what was observed, in order, with evidence |
| Length | findings first, then the evidence log; when shared, a boundary line with a reading time |
| Tense | past for observations, present for the current hypothesis, future for the next checks |
| Markers | mandatory: every claim Verified with its evidence named, Documented, or Inferred |
| Vocabulary | internal |
| Internals | logs, queries, ids, exact error text, in code fences |
| Formatting | `Summary`, numbered `Findings`, `Evidence`, `Hypotheses`, `Ruled out`, `Next checks` |

**Must contain**
- What has been demonstrated, with the evidence, because a claim without its evidence cannot be re-checked by the next person.
- The reasonable leaps from the current data, marked as leaps, because the reader needs them and needs to know they are leaps.
- What could be checked next, and what each check would decide, because an investigation with no next check is a stall.
- What was ruled out, because otherwise it is re-trodden.
- The environment each observation came from, because the same symptom on a different environment is a different fact.

**Must not contain**
- A conclusion stated as fact without its evidence.
- A fix described before a reproduction, because a fix that never followed a reproduction cannot tell "I fixed the cause" from "the symptom is not visible right now".
- Hypotheses mixed into findings under one heading, because the reader then trusts the guess as much as the observation.

**Tells**
- Exact: no `Ruled out` or `Next` heading; an error message in prose rather than a code fence; an observation with no environment named.
- Judgement: "probably" or "likely" inside `Findings` rather than under `Hypotheses`; a fix with no preceding reproduction.

**Examples**
- Defect: "The API is probably timing out because of the new index. I've rolled it back." A guess stated as a finding, and a fix with no reproduction.
- Good: "Findings: 1. Production p95 latency on `/orders` rose from 180 ms to 2.4 s at 14:05 (Verified, dashboard link). Hypotheses: the 14:00 migration added an index the planner now prefers; confirmed if `EXPLAIN` on production shows it. Ruled out: traffic, which was flat across the window."

---

Rules this cell leans on: [History out of current-state documents](../rules/rule-1-history-out.md), [Confidence markers](../rules/rule-2-confidence-markers.md), [Only exact rules may block](../rules/rule-3-only-exact-blocks.md). Back to the [writing taxonomy](../taxonomy.md).
