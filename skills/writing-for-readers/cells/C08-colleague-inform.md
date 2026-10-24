# C8. Colleague, inform (and ask)

One cell of the [writing taxonomy](../taxonomy.md): classify there first, then read only this file. Every cell has the same shape, and the why sits beside each rule.

**Artefacts:** ticket status comments, commit messages and pull-request descriptions, chat updates, briefs, a findings reply the reader will forward or paste elsewhere, a question to a colleague.
**Reader does:** learns where it stands, and what if anything is theirs to do.
**Reviewed:** replies and briefs yes, because you read them; commits and ticket comments no.

| Property | Setting |
|---|---|
| Speculation | labelled, sparingly; a status update says what is known |
| History | one line of what changed since last time; the rest by link |
| Length | takeaways first; a reply under 500 words needs no headings; a longer share leads with the findings and ends the scannable part with a boundary line and a reading time; a commit subject under 72 characters |
| Tense | present for state, past for what was done |
| Markers | optional; mandatory on anything the reader will repeat outward |
| Vocabulary | internal |
| Internals | by link or in a code fence, never in prose |
| Formatting | outcome first; numbered lists for parallel items; bold lead words; no em dashes |

**Must contain**
- The outcome first, because that is the sentence the reader came for and the only one some of them read.
- The reader's move, if there is one, stated as theirs, because a request buried in narrative is missed.
- The link to the detail, because the detail exists somewhere already and pasting it here makes two copies.

**Must not contain**
- A chase or nudge aimed at someone else, because a list of other people's moves is not the reader's to act on.
- Work narrative ("first I looked at", "I then"), because the reader wants the result, not the route.
- Numbers buried in prose, because a number the reader has to act on belongs in a table or on its own line.
- A closing offer ("let me know if"), because it ends the message on the writer instead of the reader's move.

**Tells**
- Exact: an em dash; a heading in a reply under 500 words; "first I", "I then", "next I"; a closing "let me know".
- Judgement: takeaways at the end instead of the start; a nudge aimed at a third person.

**Examples**
- Defect: "So I started by checking the logs, and then I noticed the cron job, and after a while I worked out it was the timezone. Let me know if you have questions!"
- Good: "**Fixed:** the nightly export now runs at 02:00 local time, not UTC. **Your move:** none, unless you rely on the old 13:00 run. Details in PR #88."

---

Rules this cell leans on: [History out of current-state documents](../rules/rule-1-history-out.md), [Confidence markers](../rules/rule-2-confidence-markers.md), [Only exact rules may block](../rules/rule-3-only-exact-blocks.md). Back to the [writing taxonomy](../taxonomy.md).
