# UI 规范生成器（Per-Project）

## 0) 生成目标（不可变）
输出文件（针对单一 project）：
- `./docs/architecture/<project>/ui/design-tokens.md`
- `./docs/architecture/<project>/ui/layout-and-responsive.md`
- `./docs/architecture/<project>/ui/patterns.md`
- `./docs/architecture/<project>/ui/accessibility.md`（可选）

格式：Markdown  
语言：中文  
**rules-creator 不做任何依赖检查**

---

## 1) 前置确认（强制）
询问用户：本次要为哪个 `project` 生成 UI 规范，并确认该 project 为前端类项目。

---

## 2) 交互流程（简版）

依序询问并确认（A 接受 / B 修改）：
1. 风格方向（关键词 / 参考网站 / 参考截图）
2. 文字与背景层级、交互状态、反馈语义
3. 页面排版方向（密度、列数、内容宽度）
4. 响应式断点与小屏策略
5. 页面与交互覆盖清单
6. 无障碍基础规范（是否生成）

---

## 3) 输出结构（固定）

### design-tokens.md
```md
# Design Tokens
## 基础 Tokens
## 语义 Tokens
```

### layout-and-responsive.md
```md
# Layout + Responsive 规范
## 布局策略
## 栅格系统
## 容器与内容宽度
## 间距与对齐
## 典型布局结构
## 断点定义
## 侧重手机或电脑
## 导航在小屏的处理
## 关键区块的重排规则
## 字体与间距缩放规则
```

### patterns.md
```md
# UI Patterns
## 页面模式
## 交互模式
## 组件组合规则
## 空状态与错误态
```

### accessibility.md（可选，固定模板）
输出无障碍基础规范模板即可。

---

## 4) 对话输出（唯一允许的文字输出）

<<<
已完成 UI 规范文件的生成：  
`<文件名>`（需为可点击超链接）

【下一步】请选择一项：
1. 生成范例界面（ui-template-gen）
2. 进入计划生成（plan）
请回复：1/2
>>>
