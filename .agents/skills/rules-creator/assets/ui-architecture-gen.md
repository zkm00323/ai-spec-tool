# UI 规范生成器（适合非 UI 专业）

## 1) 开场说明（固定）

> 我们要建立一套 UI 规范，让后续设计与开发都一致。
> 我会一步步提问，你按自己的想法回答即可。

---

## Q1. 你想要什么风格（我会整理成具体设定）

<输出以下内容>
> 你可以用以下方式告诉我风格方向：
> A) 描述想要的 UI 风格（关键词）
> B) 提供想参考的网站链接
> C) 提供参考截图
<输出以上内容>

说明：
- 若提供网站，仅作为风格参考，不复制具体内容
- 若提供截图，仅作为风格参考，不复刻具体布局
- 若仅提供关键词，需补充：氛围、情绪、密度（紧凑/舒展）
- 若有不想要的风格或气质，请列出 1–3 条 (非必要)

### 系统整理（你确认后才会继续）

系统必须基于用户线索整理出以下资讯，并请用户确认：
- 主色与辅助色倾向（如：冷色/暖色、饱和/低饱和）
- 明暗基调（浅色为主 / 深色为主 / 双模式）
- 字体风格倾向（严谨 / 中性 / 活泼 / 极简）
- 圆角偏好（小/中/大）
- 阴影倾向（无/轻/中/强）
- 动效倾向（无/少量/明显）

确认方式：
> A) 接受  
> B) 修改（请直接改）

---

## Q2. 需要哪些「文字/背景/状态」层级

> 这一步是为了避免后续样式缺漏，请确认模板是否适用。

我会根据 Q1 的风格线索给出一份 **排版建议**，包含：

- 文字层级：标题 / 副标题 / 正文 / 辅助 / 禁用
- 背景层级：画布 / 表面 / 强调
- 交互状态：默认 / 悬停 / 按下 / 禁用 / 焦点
- 反馈语义：成功 / 警告 / 错误 / 信息

确认方式：
> A) 接受  
> B) 调整（请直接改）

---

## Q3. 页面排版方向（我会给建议）

我会根据 Q1 的风格线索给出一份 **排版建议**，包含：

- 页面类型倾向（营销/内容/应用型/混合/...）
- 页面内容整体会偏「紧凑」还是「留白多」？（紧凑/中等/舒展/...）
- 页面内容想怎么分成几块并排？（例如：整页一列、左右两列、更多栏位...）
- 内容区域通常最大到多宽？（例如 1200/1440/不限制...）
- 主要的内容会以哪种形式排列？（例如：单列往下、两列并排、卡片一块块、混合...）

确认方式：
> A) 接受  
> B) 调整（请直接改）

---

## Q4. 不同屏幕怎么显示（我会给建议）

我会根据 Q1 的风格线索给出一份 **多屏幕建议**，包含：

- 需要区分几种屏幕尺寸（建议 4–6）
- 优先照顾手机还是电脑（小屏优先 / 桌面优先）
- 小屏时导航要怎么出现？（比如：收起来点一下再展开 / 从侧边滑出来 / 底部按钮列）
- 小屏时内容要怎么挪动或收起来？（比如：改成一列、折叠起来、必要时隐藏）
- 小屏必须保留哪些内容、哪些可隐藏

确认方式：
> A) 接受  
> B) 调整（请直接改）

---

## Q5. 需要覆盖哪些页面与交互（我会给建议）

我会根据 Q1 的风格线索给出一份 **覆盖建议**，包含：

- 页面类型（首页/列表/详情/表单/空状态/错误页等）
- 常见操作方式会有哪些？（例如：导航、筛选、搜索、翻页、主要行动按钮）
- 主要行动按钮通常放在哪里？（例如：页面顶部、右上角、底部、固定在画面上）
- 主要组件组合方式（卡片/区块/分栏/时间线）

确认方式：
> A) 接受  
> B) 调整（请直接改）

---

## Q6. 无障碍基础规范（可选）

> 是否要建立无障碍基础规范？
> A) 是（立即生成）
> B) 否（未来再补齐）

说明：
- 若选择 A：生成固定内容的 `./docs/global/ui/accessibility.md`
- 若选择 B：跳过本文件

---

## 2) 颜色/字体/间距等基础规范（Design Tokens）

你**必须**生成符合以下结构的 `design-tokens.md`：

```md
# Design Tokens

## 基础 Tokens

### 颜色（Base Colors）
- color.base.<name>.<scale>

### 字体（Typography）
- font.family.primary
- font.size.<scale>
- font.weight.<scale>
- line.height.<scale>

### 间距（Spacing）
- space.<scale>

### 圆角（Radius）
- radius.<scale>

### 阴影（Shadow）
- shadow.<scale>

### 动效（Motion）
- motion.duration.<scale>
- motion.easing.<name>

---

## 语义 Tokens

### 文字
- color.text.primary
- color.text.secondary
- color.text.muted
- color.text.disabled

### 背景
- color.bg.canvas
- color.bg.surface
- color.bg.elevated
- color.bg.accent

### 边框
- color.border.default
- color.border.subtle
- color.border.focus

### 交互
- color.interactive.default
- color.interactive.hover
- color.interactive.active
- color.interactive.disabled

### 反馈
- color.feedback.success
- color.feedback.warning
- color.feedback.error
- color.feedback.info
```

---

## 3) 生成规则（硬规则）

* 基础 Tokens 以“中性可复用”为核心
* 语义 Tokens 必须映射到基础 Tokens
* 颜色需提供 5–9 个刻度（如 50–900）
* 字体、间距、圆角、阴影、动效需提供 4–8 个刻度
* 若用户提供参考网站，需总结其风格特征并转化为 tokens
* 所有 tokens **必须使用统一命名规范**
* Layout / 不同屏幕规则里的间距与字号 **必须引用 design-tokens 的命名**，不得出现未定义的新数值

---

## 4) 输出要求（固定）

* 必须生成并保存 `./docs/global/ui/design-tokens.md`
* 不得将文件内容直接输出在对话中
* 对话中只允许输出：

> 已完成 Design Tokens 文件的生成：  
> `<文件名>`（需为可点击超链接）

---

## 5) 页面排版规范（Layout）

你**必须**生成并保存 `./docs/global/ui/layout.md`，结构如下：

```md
# Layout 规范

## 布局策略
## 栅格系统
## 容器与内容宽度
## 间距与对齐
## 典型布局结构
```

---

## 6) 不同屏幕的规则（Responsive）

你**必须**生成并保存 `./docs/global/ui/responsive.md`，结构如下：

```md
# 不同屏幕规则

## 断点定义
## 侧重手机或电脑
## 导航在小屏的处理
## 关键区块的重排规则
## 字体与间距缩放规则
```

---

## 7) 常见页面与交互规则（Patterns）

你**必须**生成并保存 `./docs/global/ui/patterns.md`，结构如下：

```md
# UI Patterns

## 页面模式
## 交互模式
## 组件组合规则
## 空状态与错误态
```

---

## 8) 无障碍基础规范（固定内容模板）

若用户选择建立，必须使用以下固定结构与内容生成：

```md
# Accessibility Baseline

## 目标
- 保证核心内容可被键盘与屏幕阅读器访问
- 保证文本与背景对比度满足基础可读性

## 键盘可用性
- 所有可交互元素必须可聚焦
- 焦点顺序需符合视觉阅读顺序
- 必须提供可见的焦点样式

## 语义与标注
- 交互控件必须使用语义化元素或等效标注
- 图片必须提供替代文本
- 表单元素必须有可识别的标签

## 颜色与对比
- 文字与背景对比度需至少达到 4.5:1（大字号可适当放宽）
- 不得仅以颜色传达关键信息

## 动效与可控性
- 动效应可被降低或关闭
- 不得使用强闪烁或易引发不适的效果

## 反馈与错误提示
- 错误信息必须可被读取与理解
- 错误状态需提供明确的恢复路径
```

## 9) 最终输出要求（固定）

1.文件输出
* 必须生成并保存以下文件：
  - `./docs/global/ui/design-tokens.md`
  - `./docs/global/ui/layout.md`
  - `./docs/global/ui/responsive.md`
  - `./docs/global/ui/patterns.md`
  - `./docs/global/ui/module-ui-types.md`
* 若用户选择建立 Accessibility Baseline，还需生成：
  - `./docs/global/ui/accessibility.md`
* 不得将文件内容直接输出在对话中
* 格式：Markdown
* 语言：中文

2.对话输出
* 对话中只允许输出：
> 已完成 UI 规范文件的生成：  
> 1.`design-tokens.md`  
> 2.`layout.md`  
> 3.`responsive.md`  
> 4.`patterns.md`
> 5.`module-ui-types.md`
> 5.`accessibility.md`（若有建立）
* 禁止输出：
  * 具体组件实现
  * 具体框架代码
  * 具体 CSS 选择器与样式规则

---

## 10) UI Module Types 标记（强制）

在生成 UI 规范时，必须读取 `./docs/global/architecture.md` 的分层/模块分类，
并输出一份 **UI 显示组件类型清单**，用于后续生成 Component Rules。

文件：`./docs/global/ui/module-ui-types.md`，结构如下：

```md
# UI Module Types

## 说明
- 本文件用于标记哪些 module type 属于「UI 显示组件」
- plan-executor 将据此判断哪些模块需要生成 Component Rules

## UI 显示组件类型
- <ModuleTypeA>
- <ModuleTypeB>
```
