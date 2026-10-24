# C5. Colleague, act and recall (guides and conventions)

One cell of the [writing taxonomy](../taxonomy.md): classify there first, then read only this file. Every cell has the same shape, and the why sits beside each rule.

**Artefacts:** shared guides, house conventions, onboarding, process notes.
**Reader does:** builds judgement, then applies a convention or follows a procedure.
**Reviewed:** yes, usually through a pull request.

| Property | Setting |
|---|---|
| Speculation | labelled; a guide may say "we think" when it says why |
| History | one line where it explains a rule ("exists because someone got bitten"); never a timeline |
| Length | a guide states its reading time; one idea per section; the first paragraph lets a colleague decide whether to read on |
| Tense | present for rules, imperative for procedure |
| Markers | Verified, Documented or Inferred on every step of a procedure |
| Vocabulary | internal, initialisms expanded once |
| Internals | yes, sanitised: no customer names, no secrets, no paths carrying a username |
| Formatting | thesis in the first line; headings, tables, code fences |

**Must contain**
- The rule and its reason inline, because a rule with no reason is followed until it is inconvenient and then dropped.
- The failure it prevents, because that is what makes a colleague adopt it.
- Where the detail lives, because a guide is the map, not the territory.

**Must not contain**
- Facts specific to one customer or one deployment, because a shared guide outlives any one of them; those facts belong in that customer's or deployment's own notes.
- A step that was never run, unmarked, because an unmarked step reads as Verified ([rule 2](../rules/rule-2-confidence-markers.md)).
- The history of the rule beyond one line.

**Tells**
- Exact: a customer name or hostname; an absolute path containing a username; a step heading with no marker inside a procedure.
- Judgement: a rule with no reason; a paragraph of backstory.

**Examples**
- Defect: "Always squash-merge." No reason, so the first person with a messy branch ignores it.
- Good: "Squash-merge feature branches, because the release notes are generated from merge commits and a branch's fifty work-in-progress commits would each become a line."

---

Rules this cell leans on: [History out of current-state documents](../rules/rule-1-history-out.md), [Confidence markers](../rules/rule-2-confidence-markers.md), [Only exact rules may block](../rules/rule-3-only-exact-blocks.md). Back to the [writing taxonomy](../taxonomy.md).
