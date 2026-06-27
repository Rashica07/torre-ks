---
name: uncertainty-flag
description: Halt and request clarification if requirements are ambiguous or key context is missing.
---

# Uncertainty Flag

Use this skill to prevent guesses, hallucinations, or broken assumptions.

## Guidelines
- If a user request lacks details or key system constraints are unclear, STOP.
- Format clarifying questions clearly, detailing the choices, trade-offs, and recommending a path forward.
- Do not touch the codebase until the user clarifies the ambiguity.
