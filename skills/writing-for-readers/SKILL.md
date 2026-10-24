---
name: writing-for-readers
description: Fit a piece of writing to its reader and its job using a writing taxonomy. Use when drafting or revising anything someone other than you acts on (a customer update, an incident write-up, a ticket comment or description, an announcement, a handoff, a support case, a README, a memory file), when asked to review, tighten, rewrite or make text ready to send, or when a chat reply is deliverable-shaped, meaning a findings report or anything the reader will paste elsewhere. Not for ordinary short chat replies.
---

# writing-for-readers

Classify the text with the writing taxonomy, read the one matching cell file, and either draft to that cell or report where the text departs from it. The taxonomy files beside this one are the source; this skill is how they get applied.

The skill is model-invoked on purpose. The texts that most need it (an internal write-up, a memory file, a README) are the ones nobody reads before an agent or a colleague acts on them, so a skill that waits to be typed would only review text that was going to be reviewed anyway.

## Key assumptions

| Assumption | Check (read-only) | If missing |
|---|---|---|
| The taxonomy router sits beside this file | `taxonomy.md` exists in this skill's base directory | Reinstall the whole `writing-for-readers` folder, not just `SKILL.md`. See the repo README, "Prerequisites" |
| All 14 cell files and 3 rule files are present | `cells/` holds 14 files named `C01-*.md` to `C14-*.md`, and `rules/` holds 3 files named `rule-*.md` | Same as above |

No tools beyond reading files are needed. The skill works in any Claude Code session and in any agent that can read files relative to a skill's directory.

## Steps

1. **Check the assumptions.** List this skill's base directory (the directory holding this `SKILL.md`, which Claude Code names when it loads the skill) and confirm both rows of the table. If either fails, stop and say which row failed and that the skill was installed incomplete; do not draft or review from memory of the rules, because a half-remembered cell produces confident wrong advice. Done when `taxonomy.md`, 14 cell files and 3 rule files are all present.

2. **Read the router.** Read `taxonomy.md`. It holds the classification (readers, the client technicality scale, functions), the matrix, the section vocabulary and the artefact lookup. Done when you know the five reader classes and six functions.

3. **Classify the document.** In precedence order: a declared marker line at the top (`Reader: ... Function: ...`) wins; otherwise infer from the router's *Artefact lookup* by path, extension or destination; a client reader also takes a point on the technicality scale. Note the reviewed-before-release default for the reader class. Done when the text has one cell id, or a stated reason it lands on none, in which case take the stricter neighbour on every property.

4. **Classify the sections.** Any heading from the router's *Sections and splitting* vocabulary sets its section's function regardless of the document's cell. Unheaded material takes the document's cell. Done when every section carries a cell.

5. **Read the cell file**, and only that file: `cells/C<nn>-<slug>.md`, linked from the router's matrix. Read the router's *Sections and splitting* as well when the sections carry more than one function. Read a file under `rules/` only when a finding turns on that rule.

6. **Apply.**
   - *Drafting*: write to the cell's eight properties, its must-contain list and its must-not-contain list. Done when each of the eight properties is satisfied and each must-contain item is present.
   - *Reviewing*: produce the report below. Done when every section has been checked against all eight properties and every tell in the cell.

7. **Hand over.** Report only. Apply rewrites when the request says `--fix` or asks for the rewrite outright. Run standalone, every finding flags. Inside an outbound gate (a pre-send check, a CI lint), findings from exact tells may block; findings from judgement tells never do.

## The report

One table, then one block per flagged section.

| Section | Cell | Property | Tell | Kind |
|---|---|---|---|---|

Kind is `exact` or `judgement`, taken from the cell file. Then, for each flagged section: the rule it breaks, the one-line why beside that rule in the cell file, and a proposed rewrite of the offending passage only. When the sections suggest a split under the router's one-third rule, add a single line "consider splitting" naming the two halves and their readers; that line is judgement and never blocks.

## Neighbours

- For C1 and C2 (an agent as reader), Matt Pocock's `writing-for-agents` skill is a fuller method for the properties, if installed. Use it for the method and this skill for the classification and the report.
- A skill that already knows its reader and function can point straight at its cell file and skip this skill; the classification steps would be wasted work. The `ask-me-artifact` skill in this repo does that with C7.
