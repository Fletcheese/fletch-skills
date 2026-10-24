# C12. Client, inform

One cell of the [writing taxonomy](../taxonomy.md): classify there first, then read only this file. Every cell has the same shape, and the why sits beside each rule.

**Artefacts:** end-user announcements of a shipped change (a teaser and the post behind it), release notes, status updates, "done" replies to a client.
**Reader does:** notices the change and knows what, if anything, to do differently.
**Reviewed:** yes.

| Property | Setting |
|---|---|
| Speculation | none |
| History | none, or one line of "previously X, now Y" when the change itself is the news |
| Length | a teaser is a few lines; a post is one screen; a status update is a paragraph |
| Tense | present |
| Markers | not used; only Verified content ships |
| Vocabulary | the reader's own terms at their point on the scale; the product named explicitly; the reader's locale's spelling |
| Internals | end user none, because the mechanism past their own boundary is a black box; product owner named things |
| Formatting | one idea per paragraph: the change, what it means for them, what to do |

**Must contain**
- What changed, in the reader's terms, because they will not translate yours.
- What they do differently, even when the answer is nothing, because that is the question they are reading to answer.
- Where to go with questions.

**Must not contain**
- The mechanism, because it is past the reader's boundary and reads as noise or as a reason to worry.
- Who did the work.
- Internal names, or a hedge of any kind.

**Tells**
- Exact: an internal vocabulary term ("deployed", "migrated", "sync job", "pipeline", an environment name such as staging); an em dash; a hedge word.
- Judgement: leading with the mechanism rather than the change.

**Examples**
- Defect: "We've migrated the export service to a new queue backend, which should improve throughput."
- Good: "Exports now arrive in your inbox within a minute, instead of the next morning. Nothing changes in how you request them. Questions: reply to this email."

---

Rules this cell leans on: [History out of current-state documents](../rules/rule-1-history-out.md), [Confidence markers](../rules/rule-2-confidence-markers.md), [Only exact rules may block](../rules/rule-3-only-exact-blocks.md). Back to the [writing taxonomy](../taxonomy.md).
