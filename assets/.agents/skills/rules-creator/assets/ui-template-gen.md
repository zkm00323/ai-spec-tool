# 范例界面生成器

## 1) 说明（固定）

> 我们将生成一个「常见页面」的范例界面。
> 页面从上到下划分为多个单元，用来展示 UI 规范如何影响排版、颜色、间距与响应式。

---

## 2) 执行前置条件（强制）

执行前**必须确认**：
* `/projects` 目录存在
* `./docs/global/architecture.md` 已明确前端技术框架与对应目录，且已完成基础工程初始化
* 已基于 `./docs/global/ui/` 生成可被页面直接使用的视觉定义
  - 固定输出：`/projects/<frontend>/src/styles/ui-tokens.css`（CSS 变量）

若任一条件不满足：**停止并要求补齐**。

---

## 3) 生成触发（固定）

在完成所有 UI 规范后，**必须询问用户是否创建「范例界面」文件**：
> 是否创建一个范例界面（常见页面，自上而下多个单元），用来展示哪些 UI 规范如何影响排版、颜色、间距与响应式？
> A) 是（立即生成）
> B) 否（先跳过）

---

## 4) 可渲染界面输出（强制）

若 `architecture.md` 指定为网页前端框架（如 Next.js），**必须额外生成一个可直接渲染的范例界面页面**：
* 使用当前技术框架的默认页面结构与目录（例如 Next.js App Router：`/projects/<frontend>/src/app/example-screen/page.tsx`）
* 页面内容与样式必须严格引用 UI 规范（design-tokens / layout-and-responsive / patterns）
* 仅展示范例界面，不引入业务逻辑
* **单文件产出**：不得拆分或创建任何额外的组件文件（如 `src/components`）
* 除 UI 规范定义文件外，不得依赖任何外部组件或资源
* **必须显式引入并使用** `/projects/<frontend>/src/styles/ui-tokens.css`
* 页面中所有颜色/字体/间距/圆角/阴影/动效 **必须使用 tokens 变量**，不得出现未定义的硬编码值
* 必须在页面中体现响应式断点变化（至少覆盖 XS/S 与 L/XL 的差异）
* 必须展示交互状态的可视差异（hover / active / disabled / focus），且在页面中可直接观察
* **禁止使用内联样式**（如 `style={{ ... }}`），必须通过类名与样式规则实现
* `/projects/<frontend>/src/styles/ui-tokens.css` 必须采用 **两层结构**：
  - Base Tokens：仅定义原子数值（颜色刻度/字号/间距/圆角/阴影/动效）
  - Semantic Tokens：将 Base Tokens 映射到语义（文字/背景/边框/交互/反馈）
* 页面样式**优先使用语义层 tokens**，仅在必要时使用 Base Tokens
* `/projects/<frontend>/src/styles/ui-tokens.css` 必须使用 `:root {}` 包裹，并按以下分区注释顺序输出：
  - `/* Base Tokens - Colors */`
  - `/* Base Tokens - Typography */`
  - `/* Base Tokens - Spacing */`
  - `/* Base Tokens - Radius */`
  - `/* Base Tokens - Shadow */`
  - `/* Base Tokens - Motion */`
  - `/* Semantic Tokens - Text */`
  - `/* Semantic Tokens - Background */`
  - `/* Semantic Tokens - Border */`
  - `/* Semantic Tokens - Interactive */`
  - `/* Semantic Tokens - Feedback */`
* 若框架尚未初始化或前端目录不存在：**停止并要求先完成工程初始化**
* 范例界面页面内需包含以下说明区块（可以是页面中的说明模块）：
  - 页面定位（页面类型、主要场景）
  - 整体结构（Header / Main / Footer 与 Main 分区）
  - 以下为**强制单元清单**，需按自上而下顺序呈现：
    1. Header + 主行动区
    2. Hero / 关键摘要
    3. 筛选/搜索工具栏
    4. 内容列表（卡片或表格）
    5. 表单分组 / 分步校验区
    6. 侧边信息区
    7. 进度 / 时间线区
    8. 状态与反馈区
    9. 空状态 / 错误态
    10. 分页 / 继续加载
    11. Footer
  - 每个单元区块必须：
    - 使用真实布局与颜色展示（不可只用文字描述）
    - 标注该单元受哪些 UI 规范影响（layout-and-responsive / design-tokens / patterns）
    - 说明具体影响点（排版、颜色、间距、交互或响应式）
  - 响应式要点（导航、小屏重排、间距字号缩放）
  - 交互与状态示例（主要/次要行动、空状态/错误态）

---

## 5) 硬规则（强制）

* 范例界面为“常见页面”，结构从上到下按单元划分
* 每个单元**必须明确写出**对应引用了哪些 UI 规范（layout-and-responsive / design-tokens / patterns）
* 可渲染页面文件可包含必要的 HTML/CSS/框架代码

---

## 6) 自检（强制）

生成后**必须执行**以下检查，若命中任一项：立即修正后再输出：

* 页面文件不得包含：
  - 内联样式（`style=`）
  - 任何 `rgba(...)` / `rgb(...)` / 十六进制颜色（`#fff` 等）
* 除 `/projects/<frontend>/src/styles/ui-tokens.css` 外，其它样式文件不得包含硬编码颜色值
* 页面文件所有颜色/字体/间距/圆角/阴影/动效必须来自 tokens（`var(--*)` 或对应语义类）

建议检查命令（可直接使用 `rg`）：
* `rg -n "style=" /projects/<frontend>/src/app/example-screen/page.tsx`
* `rg -n "rgba\\(|rgb\\(|#[0-9a-fA-F]{3,8}" /projects/<frontend>/src/app/example-screen/page.tsx`
* `rg -n "rgba\\(|rgb\\(|#[0-9a-fA-F]{3,8}" /projects/<frontend>/src/app -g \"*.css\" -g \"!ui-tokens.css\"`

---

## 7) 展示与调整流程（强制）

在生成范例界面后，**必须基于当前环境给出查看方式**，并进入调整阶段：

1. 告知用户如何启动与访问页面（必须给出具体命令与访问地址）  
   - 以当前工程为准：`/projects/<frontend>` 为前端项目  
   - 示例指令：  
     - `cd /projects/<frontend>`  
     - `npm run dev`  
   - 示例地址：`http://localhost:3000/example-screen`

2. 进入调整阶段：  
   - 等待用户指出要调整的单元  
   - 根据反馈同时修改：
     - 对应的 UI 规范说明（若需要，更新 `docs/global/ui` 的相关规范）
     - 实际页面代码与样式（如 `page.tsx` 与相关样式）

3. 重复调整直到用户满意
