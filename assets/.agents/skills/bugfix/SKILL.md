---
name: bugfix
description: 用户提供报错信息或描述异常行为时使用
---

# 前置依赖检查（统一规则）

## 依赖清单（必须存在且非占位）
- `docs/_shared/conventions.md`
- `docs/_shared/glossary.md`
- `docs/architecture/<project>/architecture.md`
- `docs/architecture/<project>/layer_rules.yaml`
- 相关 module spec（若存在则必须读取）

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

# 1) 修复流程（简版）
1. 复述问题与影响
2. 定位可能模块与层级
3. 给出修复方案并修改代码
4. 更新相关 module spec（如需）

---

# 2) 对话输出（必须包含下一步）

<<<
已完成问题修复：  
`<简述>`

【下一步】请选择一项：
1. 继续修正其他问题（bugfix）
2. 进入新的需求讨论（plan）
请回复：1/2
>>>
