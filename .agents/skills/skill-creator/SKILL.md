---
name: skill-creator
description: Automatically generate, structure, and document new Claude modular skills.
---

# Skill Creator

Use this skill when you need to create a new modular markdown instruction template (a skill) for Claude Code or other IDE agents.

## Workflow
1. Identify the goal of the new skill.
2. Create a folder under `.agents/skills/<skill_name>/`.
3. Write a `SKILL.md` containing:
   - YAML frontmatter with `name` and `description`.
   - Clear markdown instructions with sections: Goal, Rules, Implementation, and Examples.
4. Verify the skill fits within instructions limit (typically under 500 lines).
