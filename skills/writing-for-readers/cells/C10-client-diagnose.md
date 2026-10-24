# C10. Client, diagnose

One cell of the [writing taxonomy](../taxonomy.md): classify there first, then read only this file. Every cell has the same shape, and the why sits beside each rule.

**Artefacts:** incident write-ups, root-cause analyses, status during an active incident, a support-case summary to the client.
**Reader does:** decides whether to trust you, and what to tell their own people.
**Reviewed:** yes, always.

| Property | Setting |
|---|---|
| Speculation | labelled and paired with a next step, only: every hedge ends with the check that resolves it and when |
| History | a labelled `Timeline` section, facts only, dated |
| Length | one page: impact first, then what we know, then what we are doing, then the timeline |
| Tense | past for what happened, present for state, future for the plan |
| Markers | not shown as badges; the split is done by heading, and nothing goes under `What we know` that was not Verified |
| Vocabulary | the reader's terms; an end user gets only impact and a time |
| Internals | product owner named things; admin the evidence |
| Formatting | `Impact`, `What we know`, `What we are checking`, `What happens next`, `Timeline` |

**Must contain**
- Impact in the reader's terms, because that is the sentence they forward.
- The verified facts, separated by heading from the open questions, because a client cannot tell a hypothesis from a finding unless the page does it for them.
- Each open question with the check that closes it and when, because an unpaired hedge reads as either an excuse or a promise, and it is neither.
- A next-update time, because silence is read as bad news.

**Must not contain**
- A hypothesis presented as a cause, because it will be repeated inside the client's organisation as fact and then retracted in public.
- Blame, in either direction.
- Internal names of people or tools, or the internal evidence log; that stays in the C6 document this was rewritten from.

**Tells**
- Exact: a hedge word ("likely", "probably", "appears", "we believe", "may", "might", "suspect") with no following sentence in the same paragraph containing "we will", "next", "to confirm" or a time; no next-update line.
- Judgement: a `Root cause` heading before the cause is Verified.

**Examples**
- Defect: "The outage was likely caused by a network issue on your side."
- Good: "Impact: invoices could not be downloaded between 09:10 and 10:40. What we are checking: whether the certificate renewal at 09:05 caused it; we will confirm by 15:00 today by replaying the renewal in a test environment. Next update: 15:00."

---

Rules this cell leans on: [History out of current-state documents](../rules/rule-1-history-out.md), [Confidence markers](../rules/rule-2-confidence-markers.md), [Only exact rules may block](../rules/rule-3-only-exact-blocks.md). Back to the [writing taxonomy](../taxonomy.md).
