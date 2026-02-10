---
name: plan
description: 用户明确需要新的系统/模块/功能体系或跨项目协作时，用于生成顶层 Plan（multi-project）
---

# 前置依赖检查（统一规则）

## 依赖清单（必须存在且非占位）
- `docs/_shared/conventions.md`
- `docs/_shared/glossary.md`
- `docs/architecture/<project>/architecture.md`（计划涉及的每个 project）
- `docs/architecture/<project>/layer_rules.yaml`（计划涉及的每个 project）
- 前端 project 需额外存在：
  - `docs/architecture/<project>/ui/design-tokens.md`
  - `docs/architecture/<project>/ui/layout-and-responsive.md`
  - `docs/architecture/<project>/ui/patterns.md`

## 缺失判定（必须）
视为缺失：文件不存在 / 内容为空 / 首行包含 `AI-SPEC-TOOL:PLACEHOLDER`

## 缺失时的唯一输出
<<<
缺少依赖[<path>]

【下一步】请选择一项：
1. 开始创建依赖
请回复：1
>>>
用户回复 `1` 后，切换到 `rules-creator` 并生成对应文件。

---

# 1) 需求澄清（必须）
每次提问都必须标注进度，例如：`问题[1/4]`。
只澄清“本次变更目标、成功标准、非目标、涉及哪些 project”。
若用户未明确 project scope：先列出候选 projects，再确认 scope。
若用户已有规格书（Interface）：必须获取其路径并在 plan 中记录。

---

# 2) Plan 文件生成（强制，流程[2/3]）
详细结构与字段定义见：`assets/templates/plan.md`
生成后必须：
- 更新 `docs/plan/index.yaml`
- 生成 `docs/plan/<plan-id>/summary.md`

## 输出路径
`./docs/plan/<plan-id>/plan.md`

`<plan-id>` 规则：
- `<index>-<slug>`（index 3 位递增）
- slug 为本次变更目标摘要（不含技术实现）

# 3) 对话输出（唯一允许的文字输出，流程[3/3]）
- 输出已生成文件路径
- 提示下一步选项：讨论 / 直接执行（plan-executor）
