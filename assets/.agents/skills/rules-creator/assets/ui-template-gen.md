# 范例界面生成器（Per-Project）

## 0) 目标（不可变）
为指定前端 project 生成一页“常见页面”范例界面，用于展示 UI 规范对布局/颜色/间距/响应式的影响。

**rules-creator 不做任何依赖检查**，但必须先确认：
- 目标 project
- 其 code_root（默认 `/projects/<project>`）

---

## 1) 必须引用的规范
- `docs/architecture/<project>/ui/design-tokens.md`
- `docs/architecture/<project>/ui/layout-and-responsive.md`
- `docs/architecture/<project>/ui/patterns.md`

---

## 2) 输出要求（简版）
- 生成可直接渲染的页面（按该框架默认页面结构）
- 页面样式只使用 tokens（禁止硬编码颜色/间距）
- 必须体现响应式差异与交互状态
- 单文件产出（不拆组件）

---

## 3) 对话输出（唯一允许的文字输出）

<<<
已完成范例界面的生成：  
`<文件名>`（需为可点击超链接）

【下一步】请选择一项：
1. 根据反馈调整界面与 UI 规范
2. 进入计划生成（plan）
请回复：1/2
>>>
