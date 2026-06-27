---
name: git-worktrees
description: Manage clean workspaces and isolated feature branches using git worktrees.
---

# Git Worktrees

Use this skill to maintain pristine workspaces when working on parallel feature streams.

## Guidelines
- Use `git worktree add` to create isolated environments for debugging or code reviews.
- Clean up unused worktrees with `git worktree prune`.
- Avoid mixing active modifications across branches.
