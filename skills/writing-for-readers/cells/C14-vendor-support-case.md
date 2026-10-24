# C14. Vendor or third-party admin, ask and diagnose (a support case)

One cell of the [writing taxonomy](../taxonomy.md): classify there first, then read only this file. Every cell has the same shape, and the why sits beside each rule.

**Artefacts:** a support case to a product vendor; an access or change request to a client's IT team.
**Reader does:** reproduces, triages, and either fixes or asks back. Written well, it skips the first two round trips.
**Reviewed:** yes.

| Property | Setting |
|---|---|
| Speculation | labelled and brief: your hypothesis in one line at the end, marked as yours |
| History | labelled `Steps to reproduce` and `What we observed`, dated |
| Length | one page plus attachments |
| Tense | past for observations, imperative for reproduction steps |
| Markers | `What we observed` is Verified only; a Documented reference cites the vendor's own documentation |
| Vocabulary | the vendor's product terms, exact versions, exact error text |
| Internals | everything the vendor needs: versions, environment, the ids they own, logs as attachments |
| Formatting | `Summary`, `Environment`, `Steps to reproduce`, `Expected`, `Actual`, `What we ruled out`, `Attachments`, `The ask` |

**Must contain**
- The one-line ask, because a case with no ask gets a clarifying question back instead of work.
- Exact versions and environment, because the first triage question is always which version.
- A reproduction, expected versus actual, because that is what the vendor's engineer needs to start.
- What you ruled out, because it is the second triage question.
- The evidence attached, not pasted.

**Must not contain**
- Your theory before the facts, because a vendor reads a theory as the thing to disprove rather than the symptom to fix.
- Confidential detail beyond what the vendor needs.
- A long log pasted into the body.

**Tells**
- Exact: no versions; no `Expected` and `Actual`; a log block over forty lines in the body.
- Judgement: theory before evidence.

**Examples**
- Defect: "Your SDK is broken since the update, please fix ASAP. I think it's a threading bug."
- Good: "Summary: `upload()` returns HTTP 500 for files over 2 GB. Environment: SDK 4.2.1, server 11.0.3, Linux. Steps: upload any 2.1 GB file. Expected: 201. Actual: 500 with `stream length mismatch` (log attached). Ruled out: proxy limits, since a direct connection gives the same result. The ask: confirm whether files over 2 GB are supported in 4.2."

---

Rules this cell leans on: [History out of current-state documents](../rules/rule-1-history-out.md), [Confidence markers](../rules/rule-2-confidence-markers.md), [Only exact rules may block](../rules/rule-3-only-exact-blocks.md). Back to the [writing taxonomy](../taxonomy.md).
