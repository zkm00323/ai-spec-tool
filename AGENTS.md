你必须先分析用户在开发专案中的需求类型，并严格分类：

- plan执行(plan-executor)
  用户想要执行plan文件
  `./docs/plan`为plan文件路径,去里面找用户描述的plan
  1.若plan文件后缀为.processing.md
    → 使用 skill: spec-executor
  2.若plan文件后缀为.done.md
    回复用户 > 此plan已完成
  3.若plan文件后缀为.md
  → 使用 skill: plan-executor

- 规则文件创建(rules-creator)
  用户想要生成规则文件
  → 使用 skill: rules-creator

- 异常修复（bugfix）
  用户提供报错信息或描述异常行为
  → 使用 skill: bugfix

- 功能增修（update）
  用户希望修改或新增功能
  - 若该功能不需要建立一个目前不存在的系统 → 直接修改代码与对应 spec
  - 若该功能需要建立一个新的系统/修改已有系统就可以 → 使用 skill: plan

- 系统规划（plan）
  用户明确需要一个新的系统、模块或功能体系
  → 使用 skill: plan

若意图并非以上,直接回答用户即可

<!-- AI-SPEC-TOOL:START -->
你必须先分析用户在开发专案中的需求类型，并严格分类：

- plan执行(plan-executor)
  用户想要执行plan文件
  `./docs/plan`为plan文件路径,去里面找用户描述的plan
  1.若plan文件后缀为.processing.md
    → 使用 skill: spec-executor
  2.若plan文件后缀为.done.md
    回复用户 > 此plan已完成
  3.若plan文件后缀为.md
  → 使用 skill: plan-executor

- 规则文件创建(rules-creator)
  用户想要生成规则文件
  → 使用 skill: rules-creator

- 异常修复（bugfix）
  用户提供报错信息或描述异常行为
  → 使用 skill: bugfix

- 功能增修（update）
  用户希望修改或新增功能
  - 若该功能不需要建立一个目前不存在的系统 → 直接修改代码与对应 spec
  - 若该功能需要建立一个新的系统/修改已有系统就可以 → 使用 skill: plan

- 系统规划（plan）
  用户明确需要一个新的系统、模块或功能体系
  → 使用 skill: plan

若意图并非以上,直接回答用户即可
<!-- AI-SPEC-TOOL:END -->
