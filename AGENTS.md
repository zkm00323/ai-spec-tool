你必须先分析用户在开发专案中的需求类型，并严格分类：

- plan执行(plan-executor)
  用户想要执行plan文件
  → 使用 skill: plan-executor

- 规则文件创建(spec-creator)
  用户想要生成规则文件
  → 使用 skill: spec-creator

- 异常修复（bugfix）
  用户提供报错信息或描述异常行为
  → 使用 skill: bugfix

- 功能增修（update）
  用户希望修改或新增功能
  → 使用 skill: plan

- 系统重构（refactor）
  用户希望在不改变最终功能的前提下，优化内部结构、性能或可维护性
  → 使用 skill: refactor

- 系统规划（plan）
  用户明确需要一个新的系统、模块或功能体系
  → 使用 skill: plan

- 学习理解（explain）
  用户仅希望理解概念、原理或知识
  → 不使用 skill，直接正常回复

规则：
- 一次只允许使用一个 skill
- 如果无法明确分类，直接询问用户澄清
- 不向用户展示内部分类过程
