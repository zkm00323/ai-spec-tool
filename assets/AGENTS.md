先判断需求类型，再选择对应 skill（精简路由）：

- 执行 Plan：  
  - 有 `docs/plan/<plan-id>/plan.processing.md` → `spec-executor`  
  - 有 `docs/plan/<plan-id>/plan.done.md` → 回复“此 plan 已完成”  
  - 有 `docs/plan/<plan-id>/plan.md` → `plan-executor`
- 生成/补齐规则文件 → `rules-creator`
- 异常修复 → `bugfix`
- **进入 plan 模式的严格条件**：  
  - 只有当用户明确说“要 plan/规划/制定计划/产出 Plan”才进入 `plan`  
  - 用户仅说“要新功能/需求/改动”时，先讨论澄清，不自动进入 `plan`  
  - 若功能与接口讨论已清晰无疑虑，再**提议**用户是否需要进入 `plan`
- 若已完成接口/DB 规格讨论，可先生成 Interface 规格书（rules-creator → interface）
- 其他 → 直接回答
