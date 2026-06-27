---
name: db-architect
description: Database schema modeling and optimization rules to prevent N+1 issues and optimize performance.
---

# DB Architect / Planetscale

Use this skill for database modeling, migrations, and queries.

## Design Rules
- Prevent N+1 query patterns using eager loading or joins.
- Always check that appropriate columns are indexed (especially foreign keys, frequently queried fields).
- Design backward-compatible migrations to avoid downtime.
