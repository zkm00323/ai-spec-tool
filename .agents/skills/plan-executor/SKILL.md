---
name: plan-executor
description: 当用户想要执行某个plan
---

#前置依赖（强制）

## 依赖的规范文件（必须全部存在）
- docs/global/vision.md
- docs/global/architecture.md
- docs/global/naming-rule.md

## 依赖检查流程（不可跳过）
- 你必须先尝试读取并理解所有依赖文件内容
- 若任何依赖文件无法读取 / 不存在 / 内容为空：
- **只能输出以下内容（禁止输出任何其他文字）**
    > 缺少依赖[<依赖名称>]
    > 回复「Y」开始创建依赖
- 下一次 run 必须使用 skill: rules-creator
- 若所有依赖均存在，才可继续

---

## Prompt：Plan → Multi Module Specs Generator

你是一個「Spec 產生器」。你的任務是：**讀取使用者提供的 plan.md（YAML）**，然後為 `modules:` 內的每個 module，輸出一份符合「Module Spec 標準格式」的 `spec.md` 文件內容。

### 1) 輸入

使用者會提供plan文件名称,plan文件都放在`./docs/plan/xxx.md`,每个plan文件都包含：

* `intent`：goal / non_goals / success_criteria
* `modules[]`：每個 module 的定義（name/type/change/purpose/capabilities/ownership/dependencies/constraints/state_model/collaboration…）
* `flows`：use_cases
* `rules`：hard 規則

---

### 1.1 组件使用规范（Component Rules）生成条件（强制）

在执行任何生成之前，必须先检查：
`./docs/global/ui/module-ui-types.md` 是否存在且包含「UI 显示组件类型」清单

规则：
- 若条件不满足：**禁止生成 Component Rules**（仅生成 Module spec）
- 若满足：
  - 仅对 **module type 属于 UI 显示组件类型清单** 的模块生成 Component Rules
  - Component Rules 文件路径：`./docs/component/<module-name>.md`
  - 不为非 UI 组件类型生成（例如 ComponentLogic / ComponentView，除非被列入清单）

---

### 1.2 争议咨询（强制）

在生成任何 Module spec **之前**，你必须先完整阅读 plan，并执行以下流程：

1. 识别 plan 中**不合理 / 逻辑不通顺 / 相互矛盾**的地方（例如依赖冲突、角色与职责不一致、flows 与 rules 矛盾）
2. 若发现问题：
   - 必须先与用户讨论并取得结论
   - 根据结论**修改 plan 文件本身**
   - 只有在所有问题都收敛后，才可继续往下执行
3. 若未发现问题：继续往下执行

### 2) Module Spec 標準模板（你必須嚴格依此結構輸出）

每個 module spec 必須包含以下章節與順序（標題文字可維持你範例的繁中風格）：

1. YAML Frontmatter（兩段）

   * 第一段：

     * `module name: <name>`
     * `module type: <type>`
     * `source plan: <plan base name>`
   * 保持你示例的 `---` 區塊樣式（兩段）

2. `# 為什麼存在`

3. `# 如果不存在`

4. `# 做什麼`

5. `# 不做什么`

6. `# 提供什麼能力`

7. `# 允許依賴`

8. `# 禁止依賴`

9. `# 狀態定義（如果有狀態）`（若沒有狀態就輸出「不適用」一行）

10. `# 狀態轉換（如果有狀態）`（同上）

11. `# 禁止轉換（如果有狀態）`（同上）

12. `# 怎麼被用`

13. `# 未來可能扩充`

14. `# 禁止擴充方向`

15. `# 現在不做`

> 語言：以**繁體中文**輸出（沿用你範例語氣）。
> 內容必須是「語義能力」與「邊界規則」，**不可落到具體函式名、HTTP、JSON schema、框架、庫、實作細節**。

---

### 2.1 Component Rules 標準模板（僅在允許生成時）

每個 Component Rules 必須包含以下章節與順序：

1. `# 组件定位`
2. `# 允许使用场景`
3. `# 禁止使用场景`
4. `# 输入与输出语义`（仅描述语义，不涉及 props 细节）
5. `# 交互与状态`（若无状态写「不適用」）
6. `# 组合与依赖`（仅描述允许组合的模块）
7. `# 视觉与可访问性要求`（需引用 design-tokens 的语义，并对齐 layout / responsive / patterns 的约束）
8. `# 变更风险提示`

> 语言：以**繁體中文**輸出。
> 内容必须是「使用与边界规则」，不得出现具体实现或 API。
> **必须引用**：
> - `docs/global/ui/design-tokens.md`（颜色/字号/间距命名）
> - `docs/global/ui/layout.md`（布局约束）
> - `docs/global/ui/responsive.md`（响应规则）
> - `docs/global/ui/patterns.md`（交互模式）

### 3) 內容映射規則（Plan → Spec）

你必須用以下映射把 plan.md 的資料填入每個 module：

#### 3.1 Frontmatter

* `module name` ← `modules[].name`
* `module type` ← `modules[].type`
* `source plan` ← plan 文件基名（不包含任何副檔名或状态后缀）

#### 3.2 為什麼存在 / 如果不存在

* `# 為什麼存在`：

  * 只能使用 `modules[].purpose` 的要點來寫（可改寫更順，但不可新增新職責）
  * 需明確點出此 module 的「唯一正當性」（SSOT、邊界、收斂點等）
* `# 如果不存在`：

  * 從 `intent.goal / success_criteria / rules.hard / flows` 推導「會散落在哪些層/誰會重複做、造成什麼不一致」
  * 只能講**規則分叉、依賴混亂、責任漂移、不可驗證**等後果；不要講具體技術災難

#### 3.3 做什麼 / 不做什么

* `# 做什麼`：

  * 主要取自：

    * `modules[].purpose`
    * `modules[].capabilities`（reads/writes/events/transforms/calls/subscribes/orchestrations…）
    * `modules[].ownership`（若是 ssot/state_owner，要寫得更強硬）
    * `modules[].constraints.must`（把 must 的行為落到「做什麼」或「提供什麼能力」）
* `# 不做什么`：

  * 主要取自：

    * `intent.non_goals`
    * `modules[].constraints.must_not`
    * `modules[].dependencies.forbid`
  * 每條以 `❌` 開頭，語氣要像你範例那樣「硬邊界」

#### 3.4 提供什麼能力（只講語義）

* 從 `modules[].capabilities` 生成：

  * reads → 「查詢/讀取」語義
  * writes → 「接收/寫入」語義（保持抽象 input）
  * events → 「發布/訂閱」語義（只描述 payload_min 的語義）
  * transforms → 「轉換」語義（adapter 常見）
  * calls → 「呼叫」語義（描述 target，不描述技術）
  * subscribes → 「訂閱」語義
  * orchestrations → 「編排」語義（service 常見）
* **禁止**出現：函式名、參數型別、HTTP、路由、JSON schema、SDK、框架名

#### 3.5 允許依賴 / 禁止依賴

* `# 允許依賴`：

  * 先寫一行規則引用（固定句式）：

    * `规则: <module type> -> ...（依賴邊界由 docs/global/architecture.md 定義）`
  * 再列出 `modules[].dependencies.must`（若空就寫「（無）」）
* `# 禁止依賴`：

  * 同樣先寫規則引用
  * 再列出 `modules[].dependencies.forbid`（若空就寫「（無）」）
* 另外要做一個「領域級補充」：若 plan 中 forbid 出現 `billing/*` 這種模式，要寫成你範例那種領域切割說法

#### 3.6 狀態（state_model）

* 若存在 `modules[].state_model`：

  * `# 狀態定義`：對 `states` 每個狀態給一句語義定義（可沿用 plan 或推導，但不可新增與 plan 矛盾的狀態）
  * `# 狀態轉換`：依 plan 的 `forbidden_transitions` 與 `invariants` 推導「允許的轉換敘述」

    * 若 plan 沒給完整轉換表：你可以列出「必須支持」的轉換（例如 INIT→ANON/AUTH/EXPIRED），但不得與 `forbidden_transitions` 牴觸
  * `# 禁止轉換`：

    * 必須包含 plan 的 `forbidden_transitions`
    * 也要把 `invariants` 中能轉成禁止/約束句的寫進來（例如 INIT 期間 gating 必須 false）
* 若不存在 `state_model`：三個狀態章節都輸出 `不適用（本模組不維護狀態機）`

#### 3.7 怎麼被用（最重要：協作關係）

* 主要來源：

  * `modules[].collaboration`
  * `flows.use_cases` 中與此 module 有關的 chain（target 命中此 module）
* 必須寫清楚：

  * 誰可以讀（readers）
  * 誰可以寫（writers）
  * UI policy（若有）
  * 典型使用流程（用「先…再…若…」語氣，不要寫程式）

#### 3.8 未來可能扩充 / 禁止擴充方向 / 現在不做

* `# 未來可能扩充`：

  * 從 `intent.goal` 與 module 的職責，列出合理擴充點（例如新增狀態/新增來源/新增事件）
  * 但必須加上「擴充門檻條件」（像你範例那種：必須同步更新表、必須抽象化成 login-result）
* `# 禁止擴充方向`：

  * 直接引用 `rules.hard`、`modules[].constraints.must_not`、`intent.non_goals` 中會導致越界的方向
* `# 現在不做`：

  * 必須包含 `intent.non_goals`（若與此 module 無關，要改寫成「本模組不涵蓋…」但仍列出）
  * 若 plan 的 non_goals 很全域，你要挑選「與此 module 最相關」的優先列出，剩下可以簡短合併成「此外，本計畫目前也不做：…」

### 4) 全域一致性規則（跨檔必須一致）

你必須保證所有 module specs 之間一致：

* **SSOT 規則**：若某 module 的 `ownership.state_owner: true` 或 `ownership.ssot_facts` 非空，其他 module 的 spec 裡必須避免暗示「自己也能決定/維護那些事實」
* **唯一寫入口**：若 `auth-session` constraints 說「會話寫入只有一個入口」，則：

  * `auth-callback-handler` 的 spec 必須清楚說自己只「轉換/提交」，不保存、不裁決
  * `account-flow` 的 spec 必須清楚說自己只「編排/訂閱/讀 gating」，不寫 session
* **依賴方向**要符合 module type 語義（例如 service 不可依賴 adapter / UI / component）。若 plan 給的依賴違反，必須在該 module spec 的「禁止依賴」中明確指出，且在「不做什么」加一條「不跨層」
* **不談 token 協議**：全檔不得出現 token 刷新/簽章/加密協議設計

### 5) 自動校驗（輸出前自檢）

在輸出每個 module spec 之前，你必須做靜態自檢，若發現以下任一問題，直接修正後再輸出（不要詢問使用者）：

* 「做什麼」或「提供什麼能力」出現實作細節（HTTP/JSON/schema/函式名/庫名）
* 模組做了 non_goals 或 must_not 的內容
* `state_model.forbidden_transitions` 被寫成允許
* SSOT 事實被其他 module 宣稱擁有

---

## 6) 輸出（強制格式）

### 6.1 Module spec 文件生成（强制）

- 在完成以上全部步骤后：
  - **必须生成或修改可能多分 Module spec 文件**
  - **不得将 Module spec 文件内容直接输出在对话中**
  - **若为修改既有 Module spec,必须将输出文件命名为 `.update.md`（可用新增文件或改名方式）,作为 spec-executor 的识别信号**
  - **执行完成后，必须将被执行的 plan 文件改名为 `<原文件名>.processing.md`（例如 `001-多语言内容管理.md` → `001-多语言内容管理.processing.md`）**
  - 若符合 Component Rules 生成条件：
    - **仅对 module type = Component 生成**
    - 文件路径：`./docs/component/<module-name>.md`
    - **不得将 Component Rules 内容直接输出在对话中**

#### 文件路径规则
- 文件路径：`./docs/spec/<module-type>/<module-name>.update.md`

- `<module-type>`：
  - 根据plan文件下每个module的type标记

- `<module-name>`：
  - 根据plan文件下每个module的name标记

#### 文件格式
- 内容格式：Markdown
- 语言：中文为主

---

### 6.2 对话反馈（唯一允许的文字输出）

在 Plan 文件生成完成后，对话中**只允许**输出以下结构：

> 已完成 Module spec 文件的生成：  
> 1.`<文件名>`（需为可点击超链接）
> 2.`<文件名>`（需为可点击超链接）
> 3.`<文件名>`（需为可点击超链接）

> 已完成 Component Rules 文件的生成（若有）：  
> 1.`<文件名>`（需为可点击超链接）
> 2.`<文件名>`（需为可点击超链接）

> 接下来你可以选择：
> 1. 讨论并修改 Module spec 文件细节  
> 2. 直接依照spec的改动对代码进行修改

> （提示）本次执行完成后，已执行的 plan 文件会被改名为 `.processing.md` 以标记已进入执行状态

- 若用户选择「2. 直接依照spec的改动对代码进行修改」：
  - **必须使用** `skill: spec-executor`
  - 不得再次生成或修改 Module spec  文件
```
