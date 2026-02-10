# Interface Spec Generator (Spec)

## 0) 生成目标（不可变）
- 输出文件：`./docs/requirements/<spec-id>.md`
- 索引文件：`./docs/requirements/index.yaml`
- 输出格式：Markdown + YAML
- 语言：中文为主
- **rules-creator 不做任何依赖检查**

---

## 1) 命名规则（强制）
- `<spec-id>` 采用 `001-支付流程` 这种格式
- 递增 index 由 `docs/requirements/index.yaml` 决定

---

## 2) 内容范围（强制）
此规格书允许实现细节，必须包含：
- DB 设计（表、字段、索引、约束、迁移）
- API/接口设计（路径、方法、参数、响应、状态码）
- 关键流程与状态变更

---

## 3) 输出结构（固定）

```md
---
spec_id: <spec-id>
scope: <一句话范围>
projects: [<project>, ...]
created_at: <YYYY-MM-DD>
---

# 规格书（Interface）

## 背景与目标
## 数据库设计
## 接口设计
## 流程与状态
## 边界与非目标
```

---

## 4) 二次确认（强制）
写完后输出一段摘要，让用户确认/修改。

---

## 5) 对话输出（唯一允许的文字输出）

<<<
已完成规格书文件的生成：  
`<文件名>`（需为可点击超链接）

【下一步】请选择一项：
1. 进入计划生成（plan）
2. 继续补充规格书
请回复：1/2
>>>
