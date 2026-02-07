# Naming Rule File Generator (Spec)

## 0) 生成目标（不可变，不询问用户）
- 输出文件：./docs/global/naming-rule.md
- 输出格式：Markdown
- 语言：中文为主

---

## 1) 交互入口（优先确认默认方案）

### 1.0 默认方案确认（必须最先执行）

在开始任何详细询问前，**先询问用户一句话**：

> 现在开始创建命名规范\n是否使用默认方案？

并同时简要展示默认方案内容：

- 文件 / 目录：kebab-case
- 变量 / 函数：camelCase
- 类 / 构造类型：PascalCase
- 缩写策略：允许常见缩写（API / URL / DB / ID）

回答「Y」或「N」

#### 用户响应处理规则
- 若用户回答「Y/y/是 / 使用默认 / OK」：
  - 直接使用默认推荐值
  - 跳过所有后续询问
  - 进入生成流程（第 3 节）
- 若用户回答「N/n/否 / 自定义 / 调整」：
  - 进入第 1.1 节，逐项询问

---

## 1.1 必问项（仅在用户拒绝默认方案时执行）

请依次询问以下问题，用户只需回复选项编号或关键字：

**Q1. 文件 / 目录命名风格**
- A) kebab-case（推荐）
- B) snake_case
- C) camelCase（不推荐）
- D) PascalCase（不推荐）

**Q2. 变量 / 函数命名风格**
- A) camelCase（推荐）
- B) snake_case
- C) kebab-case（不推荐）

**Q3. 类 / 构造类型命名风格**
- A) PascalCase（推荐）
- B) camelCase
- C) snake_case

**Q4. 缩写策略（防止风格漂移）**
- A) 不允许随意缩写（必须写全）
- B) 允许常见缩写（API / URL / DB / ID）

---

## 1.2 用户回答不足时的处理
- 若只回答部分问题：继续追问未回答项
- 若回答“随便 / 你定”：使用默认推荐值，并在生成结果中说明
- 避免开放式问题，始终优先使用选项

---

## 2) 默认推荐值（与 1.0 展示内容保持一致）
- 文件 / 目录：kebab-case
- 变量 / 函数：camelCase
- 类 / 构造类型：PascalCase
- 缩写策略：允许常见缩写（API / URL / DB / ID）
- 测试文件：*.test.ts / *.spec.ts
- React 组件：PascalCase.tsx
- Hook：useXxx
