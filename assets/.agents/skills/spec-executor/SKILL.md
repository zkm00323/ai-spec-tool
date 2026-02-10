---
name: spec-executor
description: 执行 processing 状态的 plan，按 module-plan 修改代码并更新 module-spec
---

# 前置依赖检查（统一规则）

## 依赖清单（必须存在且非占位）
- `docs/plan/*/plan.processing.md`
- `docs/_shared/conventions.md`
- `docs/_shared/glossary.md`
- 若 plan 含 `source_interface`：必须读取 `docs/requirements/<spec-id>.md`
- `docs/architecture/<project>/architecture.md`
- `docs/architecture/<project>/layer_rules.yaml`
- `docs/plan/<plan-id>/projects/<project>/project-plan.md`
- `docs/plan/<plan-id>/projects/<project>/modules/<module>-plan.md`
- 若 module 为 UI Component，需额外存在：
  - `docs/specs/<project>/components/<module>-rules.md`
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

# 1) 选择要执行的 plan（强制，流程[1/3]）
- 优先读取 `docs/plan/index.yaml` 取得 processing plan
- 若 index 缺失或未记录 processing plan：再扫描 `docs/plan/*/plan.processing.md`
- 若不存在：输出 `未发现可执行的 plan（plan.processing.md）`

---

# 2) 执行步骤（强制，流程[2/3]）
对 `execution_steps` 的每个 `<project>/<module>`：
1. 将 `<module>-plan.md` → `<module>-plan.processing.md`
2. 读取对应 `module-plan`
3. 按约束修改代码
4. 更新/生成 `docs/specs/<project>/<module>-spec.md`
   - 必须写入 `last_updated_plan: <plan-id>`
   - 必须写入 `source_interface: <path>`
5. 若 module 为 UI Component：
   - 必须确认 module-plan 内有 UI 规范引用
   - 必要时更新 `<module>-rules.md`
6. 将 `<module>-plan.processing.md` → `<module>-plan.done.md`

完成所有模块后：
- 将 `plan.processing.md` → `plan.done.md`

---

# 3) 对话输出（唯一允许的文字输出，流程[3/3]）
- 输出已完成的 plan 路径
- 输出已完成的 module spec 路径
- 提示下一步选项：进入 plan
