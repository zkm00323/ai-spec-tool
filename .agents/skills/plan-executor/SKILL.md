---
name: plan-executor
description: 当用户想要执行某个plan
---

## 5) 执行 plan.md 的 spec-executor 规则（强制）

* 本阶段用于**执行 plan.md 中定义的变更指令**
* 本阶段是**唯一允许新增或修改 Modules Spec 的阶段**
* 本阶段不得重新解释或修改 plan.md 的决策内容

---

### 5.1 spec-executor 的角色与边界

* spec-executor 的职责：

  * 读取并理解 plan.md
  * 按 plan.md 的指令新增或修改 Modules Spec
  * 保证修改结果与 plan.md 完全一致

* spec-executor **不得**：

  * 新增 plan.md 中未声明的 Module
  * 修改 plan.md 中未涉及的 Module
  * 推翻或重写 plan.md 中的决策
  * 引入新的需求或假设

---

### 5.2 执行前置条件（强制检查）

在执行 plan.md 前，必须确认：

* plan.md 文件完整存在
* plan.md 中不存在：

  * 未决事项（Section 7 非空）
  * 多方案未选择的情况
* 所有前置依赖 spec 仍然存在且可读取：

  * vision
  * architecture
  * naming-rule

若任一条件不满足：

> ❌ **禁止执行 spec 修改**
> → 必须先回到 plan 生成阶段修正

---

### 5.3 执行输入来源（只允许以下）

spec-executor 在执行过程中**仅允许参考**：

* plan.md（作为唯一执行指令）
* architecture.md（用于 Module 类型与边界判断）
* naming-rule.md（用于文件与命名规范）
* 既有 Modules Spec（作为修改对象）

不得参考：

* 需求澄清阶段的原始对话
* plan-gen 的中间推断过程
* 任何未被 plan.md 明确引用的内容

---

### 5.4 执行顺序规则（强制）

执行 Modules Spec 修改时，必须遵循：

* plan.md 中定义的执行顺序（Section 5）
* 若 plan.md 未明确顺序，则按以下默认顺序：

  1. Adapter / 外部边界相关 Modules
  2. Service / 流程与规则 Modules
  3. Core / 通用能力 Modules
  4. Component / 表现与组合 Modules

⚠️ 不得因“实现方便”自行调整顺序。

---

### 5.5 新增 Modules Spec 的执行规则

当 plan.md 指示 **新增 Module** 时：

* 必须创建新的 Modules Spec 文件
* 文件路径必须符合：

  * `./docs/spec/<Module类型>/<Module名称>.md`
* 新 spec 内容必须：

  * 明确该 Module 的职责
  * 明确其输入 / 输出
  * 明确其允许与禁止的依赖方向
* 不得在新 spec 中：

  * 引入未在 architecture.md 中定义的 Module 类型
  * 引入实现细节或技术选型

---

### 5.6 修改既有 Modules Spec 的执行规则

当 plan.md 指示 **修改既有 Module** 时：

* 必须基于现有 spec 内容进行修改
* 修改内容必须与 plan.md 中的「调整指令（高层）」一一对应
* 不得：

  * 扩展 Module 职责范围（scope creep）
  * 借机重构未被 plan.md 指示的部分
* 若发现现有 spec 与 plan.md 冲突：

  * 必须中止执行
  * 回到 plan 阶段进行修正

---

### 5.7 执行中的记录与可追溯性

* 每一次 spec 修改必须能追溯到：

  * 对应的 plan.md
  * plan.md 中的具体 Section
* 建议在 spec 中记录：

  * 本次修改来源的 plan index（可选，但推荐）

⚠️ plan.md 不是 spec 的一部分，但 spec 必须知道“为何被改”。

---

### 5.8 执行完成后的自检要求（强制）

在所有 Modules Spec 修改完成后，必须进行自检：

* 所有修改的 spec：

  * 是否符合 naming-rule
  * 是否符合 architecture 中的 Module 边界
* 是否存在：

  * plan.md 未声明但被修改的 Module
  * plan.md 声明但未执行的 Module

若发现不一致：

> ❌ 执行结果视为无效
> → 必须回滚或重新执行

---

### 5.9 spec-executor 的非目标（Non-goals）

spec-executor **不负责**：

* 编写或生成任何代码
* 优化或重构架构
* 合并多个 plan
* 推测未来需求

---

### 5.10 Plan 执行状态与重入保护规则（强制）
```

---

### 5.10.1 Plan 文件的状态约定

* Plan 文件以文件名作为执行状态标识
* 状态规则如下：

| 文件名形式                      | 状态含义  |
| -------------------------- | ----- |
| `<index>-<plan目标>.md`      | 未执行   |
| `<index>-<plan目标>.done.md` | 已执行完成 |

* `.done` 后缀表示：

  * 该 Plan 已被完整执行
  * 对应的 Modules Spec 已按该 Plan 修改

---

### 5.10.2 执行前的状态检查（强制）

在尝试执行任何 plan.md 前，spec-executor **必须先检查文件名状态**：

* 若目标 Plan 文件为：

  * `<index>-<plan目标>.done.md`

则：

```text
该 Plan 已执行完成，不允许再次执行。
如需再次变更，请创建新的 Plan。
```

* **不得**：

  * 再次执行该 Plan
  * 部分重跑该 Plan
  * 基于该 Plan 直接修改 spec

---

### 5.10.3 执行完成后的状态迁移（强制）

当且仅当满足以下条件：

* plan.md 中定义的所有 Modules Spec 已成功执行
* 执行后自检（见 5.8）全部通过

spec-executor **必须执行以下操作**：

* 将 Plan 文件重命名为：

```text
<index>-<plan目标>.done.md
```

* 不得：

  * 保留原始 `.md` Plan 文件
  * 同时存在 `.md` 与 `.done.md` 两个版本

---

### 5.10.4 执行失败时的状态处理

若在执行过程中发生以下任一情况：

* spec 修改失败
* 自检未通过
* 执行被中止

则：

* **不得** 将 Plan 标记为 `.done`
* Plan 文件必须保持原始 `.md` 状态
* 允许在修正问题后重新执行该 Plan

---

### 5.10.5 Plan 的不可逆性原则（强制）

* `.done` 状态的 Plan：

  * 仅作为历史记录存在
  * 不得被修改
  * 不得被再次执行

* 任何新的变更需求：

  * 必须通过创建新的 Plan 文件完成
  * 不得通过“复用已完成 Plan”实现

---