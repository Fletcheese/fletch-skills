# fletch-skills

Skills and guides for [Claude Code](https://docs.claude.com/en/docs/claude-code/overview), by [Fletcher Thomas](https://fletcheese.dev).

## How to use this repo

The line between a skill and a guide is fuzzy. Both are context that shapes how Claude does your work. A skill loads itself when Claude decides it is relevant. A guide is something Claude reads when you ask it to.

You don't need to read these files yourself. Give Claude the GitHub URL of this repo, or of one skill or guide, and ask it to read it and talk through with you whether and how it fits the way you use Claude. For example:

```
Read https://github.com/Fletcheese/fletch-skills and tell me which of these would help with how I use you, and how you'd adapt them.
```

Claude knows how you use it, so it will usually judge well whether a skill or guide will help you. When one does, adapt it with Claude to your vocabulary, your tools, your file layout and the rules you want enforced, rather than installing my version as it is. If you try it and think Claude got it wrong, tell it why and it will adapt.

## Skills

| Skill | What it does | Invoked |
|---|---|---|
| [writing-for-readers](skills/writing-for-readers/SKILL.md) | Classifies a piece of writing by who acts on it (an agent, future you, a colleague, a client, a vendor) and what they do with it (act, recall, diagnose, decide, inform, ask), then drafts to that cell's rules or reviews the text against them. Ships a 14-cell taxonomy with the reason beside every rule and an example in every cell. | automatically, when you draft or review text someone else will act on |
| [ask-me-artifact](skills/ask-me-artifact/SKILL.md) | Publishes a claude.ai Artifact that asks you the questions blocking a piece of work. Radio, checkbox and free-text questions, a recommendation on every choice, optional images of each option, answers saved as you type, and a Submit button. A later session reads your answers back from the artifact's database. | when you ask for it, or when another skill wants async answers |

## Guides

| Guide | What it covers |
|---|---|
| [memory-index-strategy](guides/memory-index-strategy.md) | How to keep Claude Code's auto-loaded `MEMORY.md` under its size cap with a three-tier index (categories, category indexes, memory files), with the measurements behind each rule and a read-only script that finds orphaned memories and broken index links. |

A guide is plain Markdown and needs no install. Give Claude its GitHub URL and work through it together.

## Install the skills

Pick one.

**Copy or symlink** each skill folder into your personal skills directory. Copy the whole folder, not just `SKILL.md`: both skills read files that sit beside it.

```bash
git clone https://github.com/Fletcheese/fletch-skills.git
mkdir -p ~/.claude/skills
cp -r fletch-skills/skills/writing-for-readers fletch-skills/skills/ask-me-artifact ~/.claude/skills/
```

To pick up updates with `git pull`, symlink instead of copying (`ln -s "$PWD/fletch-skills/skills/writing-for-readers" ~/.claude/skills/`, or `mklink /J` on Windows).

**As a plugin**, from inside Claude Code:

```
/plugin marketplace add Fletcheese/fletch-skills
/plugin install fletch-skills@fletch-skills
```

## Prerequisites

| Prerequisite | Needed by | How to check |
|---|---|---|
| Claude Code with skills support | both | in a new session, the skill appears among the available skills (ask Claude which skills it has) |
| The full skill folder, not just `SKILL.md` | both | `writing-for-readers/` holds `taxonomy.md`, 14 files in `cells/` and 3 in `rules/`; `ask-me-artifact/reference/` holds five files |
| Claude Code signed in with a claude.ai account that can publish Artifacts | ask-me-artifact | the `Artifact` and `ArtifactData` tools are available in a session |
| The `db` and `artifact` runtime capabilities for Artifact pages | ask-me-artifact | the built-in `artifact-capabilities` skill lists both |

Each skill's first step runs its own checks and stops, naming what is missing, rather than carrying on with part of its setup.

## Credits

- The `ask-me-artifact` interview method (ask the whole frontier of settled decisions at once, each with a recommended answer) comes from the `grilling` and `grill-me` skills in Matt Pocock's [mattpocock/skills](https://github.com/mattpocock/skills), MIT licensed. No code from that repo is included here.
- `writing-for-readers` points at Matt Pocock's `writing-for-agents` skill from the same repo as the fuller method for text an agent reads.

## License

[MIT](LICENSE), (c) 2026 Fletcher Thomas.
