# Conventions File Generator (Spec)

## 0) 生成目标（不可变）
- 输出文件：`./docs/_shared/conventions.md`
- 输出格式：Markdown
- 语言：中文为主
- **rules-creator 不做任何依赖检查**

---

## 1) 交互入口（必须逐步询问）

依序询问并确认：
1. 项目目标与范围（做什么 / 不做什么）
2. 成功标准（可验证）
3. 文档与 spec 的写作约束（是否禁止实现细节）
4. 命名规范（文件/目录/变量/类）
5. 依赖表达方式（引用 layer rules / architecture 的方式）
6. 状态文件规则（`.processing.md` / `.done.md` 的含义与使用时机）
7. 计划执行流程（Plan → Project-Plan → Module-Plan → Spec-Executor）

每题都需要用户确认（A 接受 / B 修改）。

---

## 2) 输出结构（固定）

```md
# 通用规范（Conventions）

## 项目目标与范围
## 成功标准
## 文档与 Spec 书写规范
## 命名规范
## 依赖表达方式
## 状态文件规则
## 计划执行流程
```

### 计划执行流程（固定要求）
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

## 规格书优先规则
- 当接口与 DB 细节讨论已清晰，可先生成 Interface 规格书，再进入 plan。

## Interface 规格书
- 位置：`docs/requirements/<spec-id>.md`
- 索引：`docs/requirements/index.yaml`
- 命名：`001-支付流程` 形式

#### 进度标识示例（必须遵守）
- `问题[1/4] 这次变更的目标是什么？`
- `问题[2/4] 这次的成功标准有哪些？`
- `流程[1/3] 读取 plan 并建立执行清单`
- `流程[2/3] 生成 project-plan 与 module-plan`

---

## 3) 对话输出（唯一允许的文字输出）

<<<
已完成通用规范文件的生成：  
`<文件名>`（需为可点击超链接）

【下一步】请选择一项：
1. 生成术语表（glossary）
2. 生成系统架构（architecture）
请回复：1/2
>>>
