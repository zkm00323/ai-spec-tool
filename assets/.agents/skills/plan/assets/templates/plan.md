# Plan 文件模板

```md
---
plan_id: <plan-id>
kind: <feature|update|refactor>
version: 1
projects: [<project>, ...]
source_interface: docs/requirements/<spec-id>.md
---

## intent
- goal
- non_goals
- success_criteria

## project_objectives
### <project>
- 本次目标

## modules
```yaml
- project: <project>
  name: <module>
  layer: <layer>
  change: <create|update|refactor>
  purpose: ...
  capabilities: ...
  ownership: ...
  dependencies:
    must: [...]
    forbid: [...]
  constraints:
    must: [...]
    must_not: [...]
```

## flows
- use_cases: ...

## rules
- hard: [...]

## execution_steps
1. <project>/<module>
2. <project>/<module>
```
