---
name: plan-executor
description: 当用户要执行某个 plan.md 时，生成 project-plan 与 module-plan
---

# 前置依赖检查（统一规则）

## 依赖清单（必须存在且非占位）
- `docs/plan/<plan-id>/plan.md`
- `docs/_shared/conventions.md`
- `docs/_shared/glossary.md`
- `docs/architecture/<project>/architecture.md`
- `docs/architecture/<project>/layer_rules.yaml`
- 若 module 的 layer = Component（UI）：
  - `docs/architecture/<project>/ui/design-tokens.md`
  - `docs/architecture/<project>/ui/layout-and-responsive.md`
  - `docs/architecture/<project>/ui/patterns.md`

## 缺失判定
文件不存在 / 内容为空 / 首行含 `AI-SPEC-TOOL:PLACEHOLDER`

## 缺失时唯一输出
<<<
缺少依赖[<path>]

【下一步】请选择一项：
1. 开始创建依赖
请回复：1
>>>
用户回复 `1` 后切换 `rules-creator` 生成缺失文件。

---

# 1) 输入与读取（强制，流程[1/4]）
- 优先读取 `docs/plan/index.yaml` 以定位 plan（若缺失再扫描目录）
- 读取目标 `plan.md`
- 若 plan 含 `source_interface`：必须读取对应规格书
- 只读取与本次 plan 相关的 project 架构与 layer rules
- 若 execution_steps 不覆盖全部 modules 或格式不为 `<project>/<module>`：停止并要求补齐 plan

---

# 2) 输出生成（强制，流程[2/4]）
详细结构与字段定义见：
- `assets/templates/project-plan.md`
- `assets/templates/module-plan.md`
- `assets/templates/summary-plan.md`
- `assets/templates/summary-project.md`
- `assets/templates/summary-module.md`

## Project-Plan
为每个 project 生成：
`./docs/plan/<plan-id>/projects/<project>/project-plan.md`

内容要求：
- 引用顶层 plan
- 只描述该 project 的目标与约束
- 列出该 project 的 in-scope modules
- 过滤后的 execution_steps（保持顺序）

## Project-Plan 摘要与确认（强制）
- 生成完所有 `project-plan.md` 后：
  - 输出每个 project 的「本次要做什么」一行摘要
  - 询问用户是否要修改
- 若用户要求修改：
  - 只修改对应 `project-plan.md`
  - 再次输出摘要并确认
- 用户确认后，才可继续生成 module-plan
- 为每个 project 生成 `summary.md`

## Module-Plan
为每个 module 生成：
`./docs/plan/<plan-id>/projects/<project>/modules/<module>-plan.md`

必须包含：
- why / scope / changes(add|modify|remove)
- constraints
- acceptance_criteria
- verification
- spec_update_notes

若 module 为 UI Component：
- 确保 `docs/specs/<project>/components/` 目录
- 如缺失则生成初版 `<module>-rules.md`

## Module-Plan 摘要与确认（强制）
- 生成完所有 `module-plan.md` 后：
  - 输出每个 module 的一行摘要（本次新增/修改要点）
  - 询问用户是否要修改
- 若用户要求修改：
  - 只修改对应 `module-plan.md`
  - 再次输出摘要并确认
- 用户确认后，才可进入 spec-executor
- 为每个 module 生成 `<module>.summary.md`

## 状态变更（流程[3/4]）
仅在“Module-Plan 摘要已确认”后：
- 将 `plan.md` 改名为 `plan.processing.md`

---

# 3) 对话输出（唯一允许的文字输出，流程[4/4]）
- 输出已生成文件路径
- 输出摘要（project / module）并询问是否修改
- 提示下一步选项：进入 spec-executor
