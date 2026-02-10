# Architecture File Generator (Spec) — Multi-Project

## 0) 生成目标（不可变）
- 输出文件（每个 project 各一份）：
  - `./docs/architecture/<project>/architecture.md`
  - `./docs/architecture/<project>/layer_rules.yaml`
- 输出格式：Markdown + YAML
- 语言：中文
- **rules-creator 不做任何依赖检查**

---

## 1) Project 发现与确认（强制）

1. 扫描 `/projects/*`：
   - 若存在一个或多个目录：列为候选 project（名称=目录名）
   - 若不存在或为空：必须询问用户本仓库要建立哪些 project
2. 对每个 project，询问：
   - 类型（frontend / backend / other）
   - 框架（单一框架名）
   - code_root（默认 `/projects/<project>`）
3. 用户确认后，生成对应的 `docs/architecture/<project>/` 文件

---

## 2) 架构内容（每个 project 都需完成）

### Q1. 架构形态与职责
系统给出建议，用户确认/修改：
- 本 project 的职责范围
- 与其他 project 的协作边界

### Q2. 分层与职责（Layered Model）
系统生成建议分层（按该 project 类型），用户确认/修改：
- 每层职责
- 允许的模块类型

### Q3. 依赖规则（结构化 YAML）
系统生成 `layer_rules.yaml`，必须覆盖所有层级：
- 字段：`from / allow / forbid / notes`
- `allow/forbid` 互斥且穷尽

### Q4. 目录与落点规则
明确本 project 的目录落点与边界

### Q5. 跨项目互通规则（若存在多个 project）
说明互通方式、契约落点、修改边界、版本兼容策略

### Q6. 禁止事项（Extra Forbids）
3–6 条可判定的禁止规则

---

## 3) 输出结构（固定）

`architecture.md` 结构：

```md
# 项目架构（Architecture）

## 架构形态
## 技术栈选择
## 分层与职责
## 依赖规则（结构化定义，供 AI 使用）
```yaml
layer_rules: ...
```
## 目录与落点规则
## 跨项目互通规则
## 禁止事项
```

`layer_rules.yaml` 结构：
```yaml
layer_rules:
  - from: <Layer>
    allow: [<Layer>, ...]
    forbid: [<Layer>, ...]
    notes: <optional>
```

---

## 4) 对话输出（唯一允许的文字输出）

<<<
已完成 Architecture 文件的生成：  
`<文件名>`（需为可点击超链接）

已完成 Layer Rules 文件的生成：  
`<文件名>`（需为可点击超链接）

【下一步】请选择一项：
1. 若包含前端 project → 生成 UI 规范（ui-architecture）
2. 生成通用规范（conventions）或术语表（glossary）
3. 进入计划生成（plan）
请回复：1/2/3
>>>
