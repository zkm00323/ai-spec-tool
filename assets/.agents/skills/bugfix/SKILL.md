---
name: bugfix
description: 用户提供报错信息或描述异常行为时使用
---

## 依赖（必须存在且必须遵守）
- docs/global/naming-rule.md
- docs/global/vision.md
- docs/global/architecture.md


## 流程（严格执行）

### 1) 依赖检查（强制）
- 你必须先尝试读取并理解所有依赖文件内容。
- 若任何依赖文件无法读取/不存在/内容为空：视为“依赖未满足”，进入步骤 2。
- 若所有依赖已满足：进入步骤 3。

### 2) 依赖缺失
- 你必须只输出以下内容（禁止其他内容）：
  `缺少依赖[<依赖名称>]\n回复「Y」开始创建依赖。`
- 下一run使用 skill: rules-creator

### 3) 依赖满足
- 帮助用户修正问题







