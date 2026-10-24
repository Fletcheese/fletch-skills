# Writing taxonomy

Classify first, then derive the language. Every piece of text has a reader and a job, and those two facts decide what it must contain, what it must leave out, how long it can be and how much it may speculate. This file is the classification; each cell of the matrix is its own file with the rules that follow from it. The `writing-for-readers` skill applies it; a skill that already knows its reader can point straight at the one cell file it needs.

About ten minutes for this file. Each cell is its own file under `cells/`, two minutes more, and you read one.

---

## Step 1: classify

### Readers

Five classes. Classify by whoever **acts on** the text, not whoever edits it: `CLAUDE.md` is edited by people and acted on by an agent, so it is R1. When two readers both act on the same text, the stricter reader's length and speculation settings win.

| Class | Who | Examples |
|---|---|---|
| **R1 AI only** | an agent in a session, with no human reading | skills, hooks, `CLAUDE.md`, `AGENTS.md`, memory files, index lines in a memory file |
| **R2 Future agent and future you** | a later session, or you in a month, arriving cold | handoff documents, tool READMEs, project state and history files |
| **R3 Colleague** | someone on your own team, including you reading a reply right now | ticket comments and descriptions, shared guides, chat updates, briefs, findings replies |
| **R4 Client** | a customer or anyone outside the team you deliver to, on the technicality scale below | announcements, status updates, incident write-ups, proposals, questionnaires |
| **R5 Vendor or third-party admin** | a product vendor's support desk, a client's IT team | support cases, access and change requests |

R5 takes the technical point of the client scale.

### The client technicality scale

| Point | Reader | What they can be given |
|---|---|---|
| **End user** | sees the UI only | what they click and what they see, in the words on screen; no system names beyond those; no hedging at all |
| **Product owner or subject expert** | knows the process and the names of things, not the code | internals as named things, never as snippets; hedging only when paired with a next step |
| **Technical admin** | runs or integrates the system | logs, config and code when they are the evidence; hedging only when paired with a next step |

### Functions

| Function | The reader will | Examples |
|---|---|---|
| **act** | follow steps | skills, runbooks, deploy and install instructions |
| **recall** | hold a fact in present tense and use it later | memories, conventions, project state |
| **diagnose** | reason from evidence toward a cause | incident write-ups, support cases, diagnosis notes |
| **decide** | choose between options | recommendations, options papers, decision forms, questionnaires |
| **inform** | learn that something changed, or where it stands | announcements, status updates, commit messages, briefs |
| **ask** | give something back | requests to a vendor, questions to a product owner |

One deliverable that does two jobs is two sections, or two documents. See *Sections and splitting*.

### Reviewed before release

A property, not a class: whether a person reads the text before its reader acts on it. Default by reader: R1 and R2 unreviewed; R3 unreviewed unless it leaves the team; R4 and R5 reviewed. Any document may override, and the override is worth stating in its marker line.

- **Reviewed** text is short and scannable, because the reviewer's time is the cost and they read every word.
- **Unreviewed** text may be verbose, but it must police its own accuracy: confidence markers are mandatory on every load-bearing claim, because nobody catches the error before an agent acts on it.

---

## Step 2: derive

Eight properties. Every cell in the matrix sets all eight, so a review checks the same things everywhere. Anything not on this list is style, not rule.

| Property | Values |
|---|---|
| **Speculation** | none / labelled / labelled and paired with a next step / open |
| **History** | none / one-line pointer / labelled section / free |
| **Length** | a target, and whether takeaways or steps come first |
| **Tense and mood** | imperative / present / past permitted |
| **Confidence markers** | mandatory / optional / not used |
| **Vocabulary** | internal / the reader's own terms / product names only |
| **Internals exposed** | code, logs, config, named objects, none |
| **Formatting** | headings, tables, code fences, plain prose |

Definitions the cells rely on:

- **Labelled** speculation sits under a heading or marker that names it as speculation (`Hypotheses`, `Open questions`, `Inferred`). A hedge word in a section of facts is unlabelled.
- **Paired with a next step**: every hedge is followed, in the same paragraph, by the check that resolves it and when: "we will know by Thursday, once the overnight job has run with logging on". This is the only form of speculation a client sees.
- **Confidence markers** are the three levels in [rule 2](rules/rule-2-confidence-markers.md): Verified, Documented, Inferred.
- **The reader's own terms** are the words on their screen and in their process, at their point on the scale. An end user gets field labels; an admin gets product terms.

---

## The matrix

Rows are readers, columns are functions. A cell id means the combination occurs and has its own file, linked.

| | act | recall | diagnose | decide | inform | ask |
|---|---|---|---|---|---|---|
| **R1 AI only** | [C1](cells/C01-ai-act.md) | [C2](cells/C02-ai-recall.md) | · | · | · | · |
| **R2 Future** | [C3](cells/C03-future-act.md) | [C4](cells/C04-future-recall.md) | · | · | · | · |
| **R3 Colleague** | [C5](cells/C05-colleague-guides.md) | [C5](cells/C05-colleague-guides.md) | [C6](cells/C06-colleague-diagnose.md) | [C7](cells/C07-colleague-decide.md) | [C8](cells/C08-colleague-inform.md) | [C8](cells/C08-colleague-inform.md) |
| **R4 Client** | [C9](cells/C09-client-act.md) | · | [C10](cells/C10-client-diagnose.md) | [C11](cells/C11-client-decide.md) | [C12](cells/C12-client-inform.md) | [C13](cells/C13-client-ask.md) |
| **R5 Vendor** | · | · | [C14](cells/C14-vendor-support-case.md) | · | · | [C14](cells/C14-vendor-support-case.md) |

Cells marked · do not occur, or fold into a neighbour: an agent does not read a diagnosis, a decision or an announcement in order to act on it (those become R2 or R3 documents it may later recall); a client does not hold your team's facts; a vendor is never given your procedures; a colleague's question is an inform with a request at the end. **A document that lands on an unlisted cell takes the stricter neighbour on every property.**

Each cell file has the same shape: artefacts, what the reader does, the reviewed default, the eight properties, must contain, must not contain, tells, examples. The **why** sits beside each rule, because the why is what decides the edge case the rule did not anticipate. **Tells** are split into *exact* (a pattern a script can find) and *judgement* (a reader has to decide), because only exact tells may ever block.

### The cells

- [C1. AI only, act](cells/C01-ai-act.md): skills, hooks, `CLAUDE.md`, `AGENTS.md`, any runbook step an agent executes
- [C2. AI only, recall](cells/C02-ai-recall.md): memory files, index lines, conventions an agent consults on demand
- [C3. Future agent and future you, act](cells/C03-future-act.md): handoff documents, tool READMEs, runbooks that a later session or a colleague follows cold
- [C4. Future agent and future you, recall](cells/C04-future-recall.md): project state files, `HISTORY.md` files, decision records
- [C5. Colleague, act and recall (guides and conventions)](cells/C05-colleague-guides.md): shared guides, house conventions, onboarding, process notes
- [C6. Colleague, diagnose](cells/C06-colleague-diagnose.md): internal incident write-ups, support-case notes, bug investigations in a ticket, diagnosis notes
- [C7. Colleague, decide](cells/C07-colleague-decide.md): recommendations, options papers, decision forms and review pages, questionnaires to a colleague
- [C8. Colleague, inform (and ask)](cells/C08-colleague-inform.md): ticket status comments, commit messages and pull-request descriptions, chat updates, briefs, a findings reply the reader will forward or paste elsewhere, a question to a colleague
- [C9. Client, act](cells/C09-client-act.md): how-to instructions for end users, admin instructions for a technical admin, install or upgrade steps handed over
- [C10. Client, diagnose](cells/C10-client-diagnose.md): incident write-ups, root-cause analyses, status during an active incident, a support-case summary to the client
- [C11. Client, decide](cells/C11-client-decide.md): options and recommendations, proposals, scope notes, "should we do X" answers
- [C12. Client, inform](cells/C12-client-inform.md): end-user announcements of a shipped change, release notes, status updates, "done" replies to a client
- [C13. Client, ask](cells/C13-client-ask.md): a questionnaire for a decision you cannot make alone; a request for data or access
- [C14. Vendor or third-party admin, ask and diagnose](cells/C14-vendor-support-case.md): a support case to a product vendor; an access or change request to a client's IT team

---

## Sections and splitting

**The unit is the section, not the document.** A document declares a dominant cell, which sets its defaults. A section may be a different function only under a heading from this vocabulary, which classifies it regardless of the document's cell:

`Summary` · `Findings` · `Evidence` · `Hypotheses` · `Ruled out` · `Next steps` or `Next checks` · `Open questions` · `Background` · `History` · `Timeline` · `What we know` · `What we are checking` · `Steps` · `Assumptions` · `Options` · `Recommendation` · `The ask`

A paragraph of history under no heading, inside an *act* document, is the defect a review exists to catch. The same paragraph under `History` is fine, and the only question left is whether it should be a separate file.

**How a document declares its cell**, in precedence order:

1. **Declared**: a marker line at the top, `Reader: client, product owner. Function: inform.` Used when inference fails or is being overridden. Add `Reviewed: no` or `yes` when overriding the default.
2. **Inferred**: from the artefact lookup below, by path, extension or destination.
3. **Headings** classify sections within either.

There is no frontmatter, because half the artefacts (a ticket comment, a chat message) cannot carry any.

**When to split instead of label.** A labelled section is enough when the off-type material is short and the reader skips it by heading. Split into two documents when one reader needs only one section type and the other type is a third or more of the length, or when the two halves have different readers. Worked examples: a README and its `HISTORY.md`; a project state file and its `HISTORY.md`; an internal incident investigation (C6) and the client update written from it (C10). A review flags "consider splitting" and never blocks on it, because the threshold is a judgement.

---

## Artefact lookup

| Artefact | Cell | Notes |
|---|---|---|
| Skill, hook, `CLAUDE.md`, `AGENTS.md` | [C1](cells/C01-ai-act.md) | |
| Memory file, index line | [C2](cells/C02-ai-recall.md) | |
| Tool README | [C3](cells/C03-future-act.md) | its `HISTORY.md` is C4 |
| Handoff document | [C3](cells/C03-future-act.md) | its state section is C4 by heading |
| Project state file, `HISTORY.md`, decision record | [C4](cells/C04-future-recall.md) | |
| Shared guide, conventions, onboarding | [C5](cells/C05-colleague-guides.md) | |
| Internal incident write-up, support notes, bug investigation | [C6](cells/C06-colleague-diagnose.md) | |
| Internal recommendation, decision form, review page, options paper | [C7](cells/C07-colleague-decide.md) | |
| Ticket status comment, commit message, pull-request description, chat update, brief, findings reply | [C8](cells/C08-colleague-inform.md) | |
| End-user how-to, admin instructions | [C9](cells/C09-client-act.md) | |
| Client incident write-up, root-cause analysis, incident status | [C10](cells/C10-client-diagnose.md) | |
| Proposal, options and recommendation to a client | [C11](cells/C11-client-decide.md) | |
| End-user announcement, release notes, client status update | [C12](cells/C12-client-inform.md) | |
| Questionnaire to a client | [C13](cells/C13-client-ask.md) | |
| Vendor support case, access or change request to a client's IT | [C14](cells/C14-vendor-support-case.md) | |
| Ordinary chat reply | none | it becomes C8 when it is deliverable-shaped, meaning a findings report or anything the reader will paste elsewhere |

---

## What a review produces

1. **A per-section table**: section, classified cell, each property violated, and whether the tell was exact or judgement.
2. **For every flagged section**: the rule, its one-line why, and a proposed rewrite.
3. **Report only, by default.** Rewrites are applied only on request.
4. **Standalone, everything flags.** Inside an outbound gate (a pre-send check, a CI lint), exact tells may block. Only exact rules may ever block ([rule 3](rules/rule-3-only-exact-blocks.md)).

When drafting rather than reviewing, write to the cell's eight properties directly and treat the table as a checklist.

---

## Absorbed rules

Three rules, each in its own file, because each governs several cells.

- [Rule 1. History out of current-state documents](rules/rule-1-history-out.md)
- [Rule 2. Confidence markers on every load-bearing claim](rules/rule-2-confidence-markers.md)
- [Rule 3. Only exact rules may block](rules/rule-3-only-exact-blocks.md)
