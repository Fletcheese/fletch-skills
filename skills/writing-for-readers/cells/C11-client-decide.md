# C11. Client, decide

One cell of the [writing taxonomy](../taxonomy.md): classify there first, then read only this file. Every cell has the same shape, and the why sits beside each rule.

**Artefacts:** options and recommendations, proposals, scope notes, "should we do X" answers.
**Reader does:** chooses, and commits budget.
**Reviewed:** yes.

| Property | Setting |
|---|---|
| Speculation | labelled and paired with a next step; estimates carry their assumptions |
| History | only what constrains the options |
| Length | recommendation first, then the options with cost, risk and what happens, then detail |
| Tense | present |
| Markers | assumptions listed explicitly under their own heading |
| Vocabulary | the reader's, at the product-owner point unless asked otherwise |
| Internals | only what changes the choice |
| Formatting | `Recommendation`, an options table, `Assumptions`, `Next step` |

**Must contain**
- The recommendation, first, because the client is paying for the judgement, not the menu.
- Each option's consequence, because an option without a consequence is not a choice.
- The assumptions, because an estimate is only as good as the assumption the reader did not know it rested on.
- The decision being asked for, and by when.

**Must not contain**
- An option you would not do, because it is padding and the client may pick it.
- Internal effort detail beyond what prices the option.
- More than one decision per document, because two decisions in one document come back with one answered.

**Tells**
- Exact: no `Recommendation`; no `Assumptions`; more than one question in the closing ask.
- Judgement: option padding.

**Examples**
- Defect: three pages of background, then a table of four options with no recommendation, then "Let us know which you prefer."
- Good: "Recommendation: move the reporting job to the nightly window (option B). It removes the daytime slowdown at no licence cost. Assumptions: report data one day old is acceptable. Decision needed: approve B by the 14th so it ships in the next release."

---

Rules this cell leans on: [History out of current-state documents](../rules/rule-1-history-out.md), [Confidence markers](../rules/rule-2-confidence-markers.md), [Only exact rules may block](../rules/rule-3-only-exact-blocks.md). Back to the [writing taxonomy](../taxonomy.md).
