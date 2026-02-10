<!-- AI-SPEC-TOOL:PLACEHOLDER -->
# 通用规范（Conventions）

（由 rules-creator 生成）

## 计划执行流程
- 生成多个 `project-plan.md` 后：先给出每个 project 的简短摘要，询问是否修改，确认后继续。
- 生成多个 `<module>-plan.md` 后：先给出每个 module 的简短摘要，询问是否修改，确认后才可进入 spec-executor。
- 所有多题澄清必须标注进度：`问题[当前/总数]`。
- 所有关键流程阶段必须标注进度：`流程[当前/总数]`。
- 优先使用 `docs/plan/index.yaml` 作为计划索引；若不存在再扫描目录。
- 生成 plan / project-plan / module-plan 后应产出对应 `summary.md` 以降低后续读取成本。
- summary 文件路径建议：
  - `docs/plan/<plan-id>/summary.md`
  - `docs/plan/<plan-id>/projects/<project>/summary.md`
  - `docs/plan/<plan-id>/projects/<project>/modules/<module>.summary.md`
- summary 模板参考：
  - `assets/templates/summary-plan.md`
  - `assets/templates/summary-project.md`
  - `assets/templates/summary-module.md`
- 若存在 Interface 规格书：
  - 其路径必须写入 `plan.md / project-plan.md / module-plan.md`
  - 最终写入每个 `module-spec.md` 的 frontmatter

## Interface 规格书
- 位置：`docs/requirements/<spec-id>.md`
- 索引：`docs/requirements/index.yaml`
- 命名：`001-支付流程` 形式

## 规格书优先规则
- 当接口与 DB 细节讨论已清晰，可先生成 Interface 规格书，再进入 plan。

### 进度标识示例
- `问题[1/4] 这次变更的目标是什么？`
- `问题[2/4] 这次的成功标准有哪些？`
- `流程[1/3] 读取 plan 并建立执行清单`
- `流程[2/3] 生成 project-plan 与 module-plan`
