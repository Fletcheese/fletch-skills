# C9. Client, act

One cell of the [writing taxonomy](../taxonomy.md): classify there first, then read only this file. Every cell has the same shape, and the why sits beside each rule.

**Artefacts:** how-to instructions for end users, admin instructions for a technical admin, install or upgrade steps handed over.
**Reader does:** follows, without you in the room.
**Reviewed:** yes.

| Property | Setting |
|---|---|
| Speculation | none |
| History | none |
| Length | one screen per task; numbered; every step ends on what the reader sees when it worked |
| Tense | imperative |
| Markers | not shown to the reader; every step must be Verified before release, so the markers are consumed in review and removed |
| Vocabulary | the reader's own terms at their point on the scale: an end user gets field labels as they appear, an admin gets product terms |
| Internals | end user none; product owner named things; admin config and commands |
| Formatting | numbered steps, field names or screenshots, no prose between steps |

**Must contain**
- The precondition, because a reader who starts from the wrong state blames the instructions.
- Each step, and what success looks like after it, because a step with no visible outcome cannot be checked by the person doing it.
- Who to contact when it does not work, because the alternative is a support request with no context.

**Must not contain**
- Why the system works this way, because the reader wants the task done, not explained.
- Alternatives, because a choice in the middle of a procedure is a place to stop.
- Anything you have not run yourself.

**Tells**
- Exact: "should", "probably", "may" inside a step; an `Inferred` marker surviving in the release copy; an internal term in an end-user document.
- Judgement: a step with no visible outcome.

**Examples**
- Defect: "Go into settings and you should probably be able to turn on notifications somewhere under your profile."
- Good: "1. Click your initials, top right, then **Settings**. The Settings page opens. 2. Under **Notifications**, switch **Email me when assigned** on. The switch turns blue and shows **Saved**."

---

Rules this cell leans on: [History out of current-state documents](../rules/rule-1-history-out.md), [Confidence markers](../rules/rule-2-confidence-markers.md), [Only exact rules may block](../rules/rule-3-only-exact-blocks.md). Back to the [writing taxonomy](../taxonomy.md).
