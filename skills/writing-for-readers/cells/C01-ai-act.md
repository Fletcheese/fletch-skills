# C1. AI only, act

One cell of the [writing taxonomy](../taxonomy.md): classify there first, then read only this file. Every cell has the same shape, and the why sits beside each rule.

**Artefacts:** skills, hooks, `CLAUDE.md`, `AGENTS.md`, any runbook step an agent executes.
**Reader does:** takes the same process every run.
**Reviewed:** no.

| Property | Setting |
|---|---|
| Speculation | none |
| History | none |
| Length | as short as the branches allow; every line is paid for on every turn it is loaded |
| Tense | imperative |
| Markers | not used: a step that cannot be verified does not belong in a skill, it belongs in a guide marked Inferred |
| Vocabulary | internal; lead with the words the prompts already use |
| Internals | whatever the step needs |
| Formatting | numbered steps first, reference under headings after, code fences for commands |

**Must contain**
- What to do, in order, each step ending on a completion criterion, because the agent stops when it believes it is done and a vague bound invites stopping early.
- The branch conditions, because different runs take different paths and an unnamed branch is a coin flip.
- One reason inline where a rule would otherwise be rationalised away, because an unexplained hard rule is the first thing an agent drops under pressure.

**Must not contain**
- History, backstory, why it was built, who asked for it, because none of it changes what the agent does and every such line thins attention across the ones that do. It goes to a `HISTORY.md` beside the skill.
- Facts the environment already states, such as a `--help` or a config file, because a cached copy goes stale and the lookup is cheap.
- A prohibition where a positive instruction exists, because a ban drags the banned behaviour into context and half-reads as an instruction to do it.

**Tells**
- Exact: an ISO date, "used to", "previously", "originally", "was built", "we tried", "at the time", anywhere outside a heading named `History`. A `Background` or `Why this exists` heading longer than three lines.
- Judgement: a step with no completion criterion; a sentence the agent would obey by default anyway; two steps that read as one.

**Method:** for this cell and C2, Matt Pocock's `writing-for-agents` skill in [mattpocock/skills](https://github.com/mattpocock/skills) is a fuller method, if you have it installed.

**Examples**
- Defect: "Back in March we found the release script sometimes skipped tagging, so it is a good idea to check the tags." History the agent cannot use, and a step with no completion criterion.
- Good: "3. Run `git tag --list 'v*' --sort=-v:refname`. Done when the top line matches the version in `package.json`; if it does not, stop and report both values."

---

Rules this cell leans on: [History out of current-state documents](../rules/rule-1-history-out.md), [Confidence markers](../rules/rule-2-confidence-markers.md), [Only exact rules may block](../rules/rule-3-only-exact-blocks.md). Back to the [writing taxonomy](../taxonomy.md).
