# C13. Client, ask (a questionnaire)

One cell of the [writing taxonomy](../taxonomy.md): classify there first, then read only this file. Every cell has the same shape, and the why sits beside each rule.

**Artefacts:** a questionnaire for a decision you cannot make alone; a request for data or access.
**Reader does:** answers, asynchronously, without you.
**Reviewed:** yes.

| Property | Setting |
|---|---|
| Speculation | your recommended answer is allowed, and marked as yours |
| History | one line of context per question, only where it changes the answer |
| Length | as few questions as decide the work; each self-contained |
| Tense | present |
| Markers | none shown |
| Vocabulary | the reader's terms |
| Internals | none, unless the reader is at the technical point |
| Formatting | numbered; each question with options, a recommendation and a free-text field |

**Must contain**
- Why you are asking, as what it unblocks, because a question with no visible consequence is answered last or never.
- A recommended answer, because the reader is choosing, not authoring.
- The date it is needed by.

**Must not contain**
- A question you could answer by looking in the system yourself, because it costs the reader's time to save yours.
- A compound question.
- Internal ids.

**Tells**
- Exact: "see previous" or an id reference; a question with no options.
- Judgement: a question answerable from the system or the repository.

**Examples**
- Defect: "Q4. Re: ticket 2231, what do you want for the fields and also the permissions?"
- Good: "Q4. Who may delete a submitted order? This decides the permission setup, needed by 10 June. (a) Only administrators (recommended); (b) the person who submitted it, within 24 hours; (c) anyone on the team. Anything else we should know:"

---

Rules this cell leans on: [History out of current-state documents](../rules/rule-1-history-out.md), [Confidence markers](../rules/rule-2-confidence-markers.md), [Only exact rules may block](../rules/rule-3-only-exact-blocks.md). Back to the [writing taxonomy](../taxonomy.md).
