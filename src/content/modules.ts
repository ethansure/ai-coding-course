export interface ModuleContent {
  id: number;
  title: string;
  subtitle: string;
  time: string;
  offline: boolean;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  content: string;
  offline?: boolean;
}

export const modules: Record<number, ModuleContent> = {
  1: {
    id: 1,
    title: "三大工具深度对比",
    subtitle: "Claude Code, Codex CLI, Gemini CLI 架构设计哲学与实测对比",
    time: "4-5小时",
    offline: true,
    sections: [
      {
        id: "intro",
        title: "引言：AI Coding CLI 的战国时代",
        offline: true,
        content: `
## ✈️ 引言：AI Coding CLI 的战国时代

2024-2025 年，终端再次成为 AI 辅助编程的中心。一批新工具让你用自然语言描述需求，然后看着 agent 编辑文件、运行测试、提交代码——全程不离开终端。

作为 Senior Architect，理解这些工具的差异不只是为了选择，更是为了：
- **架构设计**：这些工具如何影响你的系统设计决策
- **团队策略**：如何为团队选择和推广合适的工具
- **技术前瞻**：理解 AI coding 的发展方向

### 三大阵营

**Big-Lab Native Tools（模型厂商原生）：**
- Claude Code (Anthropic) - 本教程重点
- Codex CLI (OpenAI)  
- Gemini CLI (Google)

**Independent Tools（独立团队）：**
- Amp (Sourcegraph)
- Aider (开源先驱)
- Warp (终端重新定义)

**Open Source（社区驱动）：**
- OpenCode, Goose, Crush, Cline 等

本模块聚焦三大厂商的原生工具，因为它们与底层模型有最深的整合，代表了 AI coding 的主流方向。
`
      },
      {
        id: "claude-code",
        title: "Claude Code 深度解析",
        offline: true,
        content: `
## ✈️ Claude Code 深度解析

### 设计哲学

Claude Code 的核心理念是"**让用户尽可能直接感受模型的能力**"。团队刻意最小化客户端代码，尽量不在模型和用户之间添加"脚手架"。

> "每次有新模型发布，我们都会删除一堆代码。例如 Claude 4.0 发布时，我们删除了约一半的 system prompt。" — Boris Cherny, Claude Code 创始工程师

**关键设计决策：**

1. **本地运行，无虚拟化**
   - 直接在本地文件系统和 shell 中操作
   - 最简单的选择往往是最好的选择
   - 风险通过 permissions system 控制

2. **TypeScript + React (Ink) + Bun**
   - 选择模型已经擅长的技术栈（"on distribution"）
   - 90% 的 Claude Code 代码是由 Claude Code 自己写的
   - Ink 框架实现漂亮的终端 UI

3. **最小化业务逻辑**
   - 定义 UI，暴露 hooks 给模型
   - 暴露 tools 给模型使用
   - 然后就让开——让模型自己发挥

### 核心能力矩阵

| 能力 | 描述 | 架构师关注点 |
|------|------|------------|
| **Codebase Understanding** | 自动遍历文件系统，理解代码结构 | 大型代码库的 context 管理 |
| **Multi-file Editing** | 跨多文件的协调修改 | 重构和迁移任务 |
| **Git Integration** | 自动创建有意义的 commit message | CI/CD 整合 |
| **Subagents** | 派生子 agent 处理复杂任务 | 并行任务处理 |
| **Plan Mode** | 只读模式下先分析再执行 | 审查大型变更 |
| **MCP Integration** | 通过 MCP 连接外部工具和数据 | 扩展能力边界 |

### 安装与基础配置

\`\`\`bash
# 安装
npm install -g @anthropic-ai/claude-code

# 或使用 Homebrew
brew install anthropic/tap/claude-code

# 启动（在项目目录中）
claude

# 常用命令
claude --help
claude --version
\`\`\`

### 关键配置文件

**CLAUDE.md** - 项目级指令文件：

\`\`\`markdown
# Project Instructions

## Architecture
This is a Next.js 14 app with App Router.
- /src/app - App Router pages
- /src/components - React components
- /src/lib - Utility functions

## Coding Standards
- Use TypeScript strict mode
- Prefer functional components with hooks
- Use Tailwind CSS for styling

## Testing
- Run \`npm test\` before committing
- Minimum 80% coverage for new code

## Dependencies
- Don't add new dependencies without asking
- Prefer built-in Node.js APIs when possible
\`\`\`

### 架构师级用法示例

**场景1：理解陌生代码库**
\`\`\`
分析这个代码库的整体架构，给我一个高层次的概览：
1. 主要模块和它们的职责
2. 核心数据流
3. 关键技术决策
4. 潜在的架构问题
\`\`\`

**场景2：重构规划**
\`\`\`
/plan
我想把这个 Express 应用迁移到 Fastify。
先分析当前的路由结构、中间件使用、错误处理模式，
然后给我一个分阶段的迁移计划。
\`\`\`

**场景3：并行任务处理**
\`\`\`
用 subagent 同时处理以下任务：
1. 为所有 API endpoint 添加 OpenAPI 注释
2. 生成对应的 TypeScript 类型定义
3. 更新 README 中的 API 文档
\`\`\`
`
      },
      {
        id: "codex-cli",
        title: "Codex CLI (OpenAI) 特点分析",
        offline: true,
        content: `
## ✈️ Codex CLI (OpenAI) 特点分析

### 设计哲学

OpenAI 的 Codex CLI 采用了"轻量级本地 agent"的理念。与 Claude Code 的全功能路线不同，Codex 更强调：

- **轻量和快速**：专注于核心编码任务
- **订阅集成**：利用现有 ChatGPT Plus/Pro/Team 订阅
- **IDE 桥接**：提供 VS Code、Cursor、Windsurf 扩展

### 核心特点

\`\`\`bash
# 安装
npm install -g @openai/codex

# 配置（使用 ChatGPT 订阅）
codex auth login

# 或使用 API key
export OPENAI_API_KEY=sk-...
\`\`\`

### 与 Claude Code 的关键差异

| 维度 | Claude Code | Codex CLI |
|------|------------|-----------|
| **模型绑定** | Claude 模型独占 | OpenAI 模型（o1, o3, GPT-5） |
| **定价模式** | 按 token 计费 | ChatGPT 订阅 + API |
| **自主程度** | 高自主（full autonomy） | 中等（更多确认） |
| **IDE 集成** | 独立终端工具 | 有官方 IDE 扩展 |
| **特色功能** | Subagents, Plan Mode | 轻量快速 |

### 适用场景

**选择 Codex CLI 如果：**
- 团队已有 ChatGPT 企业订阅
- 需要与 VS Code/Cursor 深度集成
- 偏好 OpenAI 模型的编码风格
- 需要更轻量的工具

**实际使用体验：**
\`\`\`bash
# 快速代码生成
codex "Create a Python FastAPI server with user authentication"

# 代码解释
codex explain ./src/auth/middleware.py

# Bug 修复
codex fix "TypeError: Cannot read property 'id' of undefined"
\`\`\`
`
      },
      {
        id: "gemini-cli",
        title: "Gemini CLI (Google) 特点分析",
        offline: true,
        content: `
## ✈️ Gemini CLI (Google) 特点分析

### 设计哲学

Gemini CLI 的差异化在于：
- **超大免费额度**：60 requests/min, 1000 requests/day
- **1M Token 上下文**：处理超大代码库
- **Google Search Grounding**：实时验证信息

### 核心优势

\`\`\`bash
# 安装
npm install -g @google/gemini-cli

# 认证（Google 账号即可开始）
gemini auth login

# 三种认证层级
# 1. Google 账号 - 免费层
# 2. API Key - 按量计费
# 3. Vertex AI - 企业级
\`\`\`

### 独特功能

**1. 超长上下文窗口**
\`\`\`bash
# 可以一次性分析整个大型代码库
gemini analyze ./entire-monorepo --deep
\`\`\`

**2. Search Grounding**
\`\`\`bash
# Agent 可以搜索网络验证答案
gemini "What's the latest best practice for React Server Components?"
# Gemini 会搜索最新文档验证回答
\`\`\`

**3. 会话检查点**
\`\`\`bash
# 保存复杂会话状态
gemini checkpoint save my-refactoring-session

# 之后恢复
gemini checkpoint restore my-refactoring-session
\`\`\`

### 适用场景

**选择 Gemini CLI 如果：**
- 需要免费开始（最慷慨的免费层）
- 处理超大代码库（1M token context）
- 已在 Google Cloud 生态
- 需要实时信息验证
`
      },
      {
        id: "comparison",
        title: "三工具对比总结",
        offline: true,
        content: `
## ✈️ 三工具实测对比总结

### 综合对比矩阵

| 维度 | Claude Code | Codex CLI | Gemini CLI |
|------|------------|-----------|------------|
| **模型能力** | Claude 4 Opus/Sonnet | GPT-5, o3-mini | Gemini 2.0 Pro/Flash |
| **上下文窗口** | 200K | 128K | **1M** |
| **自主程度** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **免费额度** | 无 | 随订阅 | **最慷慨** |
| **开源程度** | 部分开源 | 开源 | 开源 |
| **特色功能** | Subagents, Plan | IDE 扩展 | Search, 检查点 |

### 不同场景推荐

**🏗️ 大型 Legacy 重构**
- 首选：Claude Code（Plan Mode + Subagents）
- 备选：Gemini CLI（超长上下文）

**⚡ 日常快速编码**
- 首选：Codex CLI（轻量快速）
- 备选：Claude Code

**🔍 学习新技术/新库**
- 首选：Gemini CLI（Search Grounding）
- 备选：Claude Code

**💰 预算有限**
- 首选：Gemini CLI（免费层最大）
- 备选：Aider + 本地模型

### 架构师选择建议

作为 Senior Architect，建议的策略是：

1. **主力工具选一个深入**：Claude Code 或 Gemini CLI
2. **备用工具熟悉即可**：了解优缺点，能快速切换
3. **关注 MCP 生态**：这是真正的力量倍增器
4. **建立团队标准**：统一工具减少学习成本

> "我现在的策略是：复杂的架构决策用 Claude Code（它的推理能力最强），日常编码用 Codex（因为已有 ChatGPT 订阅），学习新东西用 Gemini CLI（免费 + 搜索验证）。" — 某大厂架构师
`
      },
      {
        id: "practice",
        title: "动手实践",
        offline: false,
        content: `
## 动手实践

### 实践1：安装并配置三个工具

\`\`\`bash
# 1. Claude Code
npm install -g @anthropic-ai/claude-code
# 设置 API key
export ANTHROPIC_API_KEY=your-key

# 2. Codex CLI
npm install -g @openai/codex
codex auth login

# 3. Gemini CLI  
npm install -g @google/gemini-cli
gemini auth login
\`\`\`

### 实践2：同一任务用三个工具完成

选择一个中等复杂度的任务，用三个工具分别完成，对比：
- 响应速度
- 代码质量
- 交互体验
- token 消耗（成本）

**推荐任务：**
\`\`\`
创建一个 Node.js CLI 工具，功能是：
1. 接受一个 GitHub repo URL
2. 克隆到临时目录
3. 分析代码结构，输出技术栈报告
4. 统计代码行数和主要语言占比
\`\`\`

### 实践3：建立个人工具选择决策树

基于你的实际体验，建立一个决策树：
- 什么情况用哪个工具
- 各工具的"甜蜜点"在哪
- 如何向团队推荐

---

**模块总结**：理解工具的设计哲学比记住命令更重要。每个工具都有其权衡，选择的关键是匹配你的工作场景。
`
      }
    ]
  },
  2: {
    id: 2,
    title: "高级使用技巧",
    subtitle: "三个工具的进阶用法、大型代码库策略、MCP集成",
    time: "6-8小时",
    offline: true,
    sections: [
      {
        id: "intro",
        title: "引言：从会用到精通",
        offline: true,
        content: `
## ✈️ 引言：从会用到精通

使用 AI coding 工具和**高效**使用它们是两回事。本模块聚焦那些让你效率倍增的高级技巧。

### 本模块涵盖

1. **Prompt Engineering for Code** - 针对代码任务的提示词技巧
2. **AGENTS.md / CLAUDE.md** - 项目级配置的艺术
3. **Context Engineering** - 上下文管理的高级策略
4. **MCP (Model Context Protocol)** - 扩展能力的标准协议
5. **大型代码库策略** - 处理百万行级代码库
6. **Subagents & Parallel Processing** - 并行任务处理
`
      },
      {
        id: "prompt-engineering",
        title: "代码任务的 Prompt Engineering",
        offline: true,
        content: `
## ✈️ 代码任务的 Prompt Engineering

Simon Willison 总结的 LLM 编程最佳实践：

### 核心原则

**1. 设定合理期望**

> "忽略 AGI 炒作——LLM 仍然是花哨的自动补全。它们只是预测 token 序列——但写代码主要就是按正确顺序排列 token。"

**2. 理解训练截止日期**

各模型的训练数据截止时间：
- Claude: 约 2024 年初
- GPT-4: 约 2023 年 10 月
- Gemini: 持续更新（有 Search）

**影响**：如果你使用的库在截止日期后有重大变更，模型可能不知道！

**3. Context 是王道**

\`\`\`markdown
# 好的做法：提供充足上下文

我正在开发一个 Next.js 14 应用，使用 App Router。
现有代码结构：
- /src/app/api/users/route.ts - 用户 API
- /src/lib/db.ts - Prisma 数据库连接
- /src/types/user.ts - 用户类型定义

需求：为用户 API 添加分页功能，要求：
1. 支持 limit 和 offset 参数
2. 返回 total count
3. 保持与现有返回格式兼容
\`\`\`

### 高级技巧

**4. 让它给你选项**

\`\`\`
Rust 中有哪些 HTTP 客户端库？
为每个提供使用示例，并说明各自的优缺点。
\`\`\`

**5. 使用函数签名指导**

\`\`\`
写一个 Python 函数，签名如下：

async def download_db(
    url: str, 
    max_size_bytes: int = 5 * 1024 * 1024
) -> pathlib.Path:
    """
    下载 SQLite 数据库到临时目录。
    - 检查 Content-Length，超过限制则报错
    - 下载完成后用 PRAGMA quick_check 验证
    - 如果实际大小超过 Content-Length，立即报错
    """
\`\`\`

**6. 记住这是对话**

\`\`\`
# 不满意？让它重构！

"把重复代码提取成函数"
"用字符串方法替代正则"
"写得更好！"  # 有时候简单直接就行
\`\`\`

**7. Vibe Coding 用于学习**

> "探索 LLM 的最好方式是玩耍。扔给它们荒谬的想法，vibe coding 直到勉强能用，是建立直觉的有效方式。"
`
      },
      {
        id: "project-config",
        title: "项目级配置的艺术",
        offline: true,
        content: `
## ✈️ AGENTS.md / CLAUDE.md 配置的艺术

### 为什么需要项目配置

项目配置文件让 AI 理解：
- 项目的架构和约定
- 团队的编码标准
- 禁止的操作
- 偏好的解决方案

### Claude Code 的 CLAUDE.md

\`\`\`markdown
# CLAUDE.md

## 项目概述
这是一个金融交易系统的后端服务。
技术栈：Go 1.21, PostgreSQL, Redis, gRPC

## 架构决策
- 使用 Clean Architecture，分为 domain, usecase, repository, handler
- 所有金额使用 decimal 类型，不使用 float
- 时间统一使用 UTC

## 安全要求
⚠️ 重要：
- 不要在日志中打印敏感信息（用户密码、token、金额）
- 所有数据库查询必须使用参数化查询
- API 响应不要暴露内部错误信息

## 测试要求
- 单元测试使用 table-driven 风格
- 测试覆盖率目标 80%
- 运行测试：go test ./...

## 代码风格
- 使用 gofmt 格式化
- 错误处理遵循 "errors are values" 原则
- 注释使用英文

## 禁止操作
❌ 不要：
- 直接修改 migrations 文件
- 在 main.go 中添加业务逻辑
- 使用 panic 处理可恢复的错误
\`\`\`

### 分层配置策略

\`\`\`
~/.claude/CLAUDE.md          # 全局偏好
./CLAUDE.md                   # 项目根目录
./src/api/CLAUDE.md          # API 层特定规则
./src/workers/CLAUDE.md      # Worker 特定规则
\`\`\`

### Slash Commands 自定义

\`\`\`markdown
# .claude/commands/review.md

审查当前变更：
1. 检查是否符合项目架构规范
2. 识别潜在的性能问题
3. 检查是否有安全漏洞
4. 验证测试覆盖是否充分
5. 给出改进建议

输出格式：
## 架构符合度: [通过/需改进]
## 性能评估: [说明]
## 安全检查: [说明]
## 测试覆盖: [说明]
## 建议: [列表]
\`\`\`

使用：\`/review\`

### 团队协作配置

\`\`\`markdown
# .claude/team-standards.md

## PR 描述模板
请按以下格式生成 PR 描述：

### 变更类型
[ ] Feature / [ ] Bug fix / [ ] Refactor / [ ] Docs

### 变更描述
（简述做了什么，为什么）

### 测试
（如何验证这个变更）

### 破坏性变更
（是否有 breaking changes，如何迁移）
\`\`\`
`
      },
      {
        id: "mcp",
        title: "MCP: Model Context Protocol 深度指南",
        offline: true,
        content: `
## ✈️ MCP: Model Context Protocol 深度指南

### 什么是 MCP

Model Context Protocol 是 Anthropic 开源的标准协议，让 AI agents 可以安全、标准化地连接外部工具和数据源。

> "MCP 重用了 LSP (Language Server Protocol) 的消息流理念，基于 JSON-RPC 2.0 传输。" — Wikipedia

### 为什么 MCP 重要

**对架构师的意义：**
1. **标准化**：一次实现，多处复用
2. **解耦**：工具和 AI 分离，独立演进
3. **安全**：标准化的权限和审计
4. **生态**：复用社区建设的 servers

### MCP 架构

\`\`\`
┌─────────────────┐     ┌─────────────────┐
│   AI Client     │────▶│   MCP Server    │
│  (Claude Code)  │◀────│  (工具提供者)    │
└─────────────────┘     └─────────────────┘
        │                       │
        ▼                       ▼
   用户交互               外部系统
                      (GitHub, Slack, DB...)
\`\`\`

### 实用 MCP Servers

**官方维护的 Servers：**
\`\`\`json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/dir"]
    },
    "github": {
      "command": "npx", 
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "your-token"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://..."]
    }
  }
}
\`\`\`

### 常用 MCP Servers 列表

| Server | 用途 | 典型场景 |
|--------|------|---------|
| **filesystem** | 文件系统访问 | 读写特定目录 |
| **github** | GitHub API | PR、Issue 操作 |
| **postgres** | 数据库查询 | 数据分析 |
| **slack** | Slack 消息 | 团队通知 |
| **puppeteer** | 浏览器控制 | 网页测试 |
| **memory** | 持久化记忆 | 跨会话记忆 |

### 配置 Claude Code 使用 MCP

\`\`\`bash
# 查看当前 MCP 配置
claude mcp list

# 添加 MCP server
claude mcp add github --env GITHUB_TOKEN=xxx
\`\`\`

配置文件位置：\`~/.claude/mcp.json\`

### 自建 MCP Server 示例

\`\`\`typescript
// my-internal-server.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "internal-tools",
  version: "1.0.0",
});

// 定义工具
server.tool(
  "deploy-service",
  "部署服务到指定环境",
  {
    service: { type: "string", description: "服务名" },
    env: { type: "string", enum: ["dev", "staging", "prod"] }
  },
  async ({ service, env }) => {
    // 实际的部署逻辑
    const result = await deployService(service, env);
    return { content: [{ type: "text", text: \`Deployed \${service} to \${env}\` }] };
  }
);

// 启动 server
const transport = new StdioServerTransport();
await server.connect(transport);
\`\`\`

### 架构师级 MCP 实践

**1. 内部工具统一接入**
\`\`\`
┌─────────────┐
│ Claude Code │
└──────┬──────┘
       │
       ▼
┌──────────────────────────────────┐
│        Internal MCP Gateway       │
└──────────────────────────────────┘
       │          │          │
       ▼          ▼          ▼
   ┌──────┐  ┌──────┐  ┌──────┐
   │JIRA  │  │Jenkins│  │Grafana│
   └──────┘  └──────┘  └──────┘
\`\`\`

**2. 权限分层**
\`\`\`json
{
  "mcpServers": {
    "prod-readonly": {
      "command": "internal-mcp",
      "args": ["--role=readonly", "--env=prod"]
    },
    "dev-full": {
      "command": "internal-mcp", 
      "args": ["--role=admin", "--env=dev"]
    }
  }
}
\`\`\`
`
      },
      {
        id: "large-codebase",
        title: "大型代码库策略",
        offline: true,
        content: `
## ✈️ 大型代码库策略

### 挑战

百万行级代码库的 AI 辅助开发面临：
- **上下文限制**：即使 1M token 也装不下整个代码库
- **相关性筛选**：哪些代码与当前任务相关？
- **变更影响**：修改一处可能影响多处
- **历史理解**：为什么代码是现在这样？

### 策略1：渐进式上下文构建

\`\`\`
第一轮：高层理解
├── README.md
├── 主要配置文件
└── 目录结构概览

第二轮：模块聚焦
├── 相关模块的入口文件
├── 接口定义
└── 类型声明

第三轮：深入细节
├── 具体实现文件
├── 相关测试
└── 相关的 git history
\`\`\`

### 策略2：利用 CLAUDE.md 提供 Map

\`\`\`markdown
# CLAUDE.md - 代码库地图

## 模块结构
- \`/core\` - 核心业务逻辑，最稳定，谨慎修改
- \`/api\` - REST API 层，可以放心修改
- \`/workers\` - 后台任务，独立运行
- \`/legacy\` - 遗留代码，只读不改

## 关键文件
- \`/core/engine.ts\` - 核心引擎，所有业务流程的入口
- \`/core/types.ts\` - 所有共享类型定义
- \`/config/features.ts\` - Feature flags 配置

## 数据流
用户请求 → API Handler → Core Engine → Repository → Database
                ↓
            Workers (异步任务)

## 常见修改模式
- 添加新 API: 修改 /api + /core/usecases + 测试
- 添加新功能: 先在 features.ts 加 flag
- 修改数据模型: migrations → types → repository → usecases
\`\`\`

### 策略3：Subagent 分而治之

\`\`\`
主 Agent：协调者
├── Subagent 1: 分析现有 API 结构
├── Subagent 2: 分析数据库 schema
├── Subagent 3: 分析测试覆盖
└── 主 Agent: 综合分析，制定计划
\`\`\`

### 策略4：增量式处理

\`\`\`bash
# 不要一次性处理整个代码库
# 而是按照依赖顺序逐层处理

# 1. 先处理 types
claude "检查 /types 目录，列出所有需要更新的类型定义"

# 2. 再处理 interfaces  
claude "基于类型变更，更新对应的接口"

# 3. 然后处理 implementations
claude "实现已更新的接口"

# 4. 最后更新 tests
claude "为变更的代码添加测试"
\`\`\`

### 实用技巧

**1. 使用 .claudeignore**
\`\`\`
# .claudeignore - 排除不相关的大文件
node_modules/
dist/
*.log
*.lock
vendor/
__pycache__/
coverage/
\`\`\`

**2. 利用 git history 提供上下文**
\`\`\`
查看这个文件的 git log，告诉我：
1. 最近的重大变更是什么
2. 谁是这块代码的主要维护者
3. 是否有相关的 PR 讨论链接
\`\`\`

**3. 创建任务 checkpoint**
\`\`\`
# 复杂重构时，每完成一个阶段就 checkpoint
claude "记录当前进度，我们已完成：
- [x] 分析现有结构
- [x] 设计新架构
- [ ] 迁移核心模块  <- 当前
- [ ] 更新测试
- [ ] 文档更新"
\`\`\`
`
      },
      {
        id: "subagents",
        title: "Subagents 与并行处理",
        offline: true,
        content: `
## ✈️ Subagents 与并行处理

### Subagents 是什么

Claude Code 的 Subagents 功能允许你派生独立的子 agent 来处理任务。就像管理一个团队：你是 Tech Lead，subagents 是你的工程师。

### 使用场景

**1. 并行独立任务**
\`\`\`
用 3 个 subagent 同时处理：
1. 为所有 public 函数添加 JSDoc
2. 生成单元测试
3. 更新 README
\`\`\`

**2. 分工协作**
\`\`\`
Subagent A: 分析前端代码结构
Subagent B: 分析后端 API
主 Agent: 综合两边分析，找出前后端不一致的地方
\`\`\`

**3. 专家模式**
\`\`\`
启动一个专门做 code review 的 subagent，
让它专注审查安全相关的代码变更
\`\`\`

### Subagent 工作原理

根据 Pragmatic Engineer 的报道，Subagents 功能由 Sid Bidasaria 在 3 天内开发完成：

> "建设 subagents 的过程本身就很有趣。前两天的工作实际上被丢弃了——最初的方案太复杂。最终的实现采用了最简单的方法：subagent 就是另一个 Claude 实例，有自己的上下文和工具访问权限。"

### 实战技巧

**1. 明确分工**
\`\`\`
# 好的分工
- Subagent 1: 读取和分析（只读）
- Subagent 2: 修改代码（写入）
- Subagent 3: 运行测试（验证）

# 避免
- 多个 subagent 修改同一文件（冲突）
- 任务之间有隐式依赖（难以协调）
\`\`\`

**2. 控制粒度**
\`\`\`
# 太细：效率低
为每个文件启动一个 subagent  # ❌

# 太粗：没发挥并行优势
一个 subagent 处理所有事情  # ❌

# 合适：按功能模块划分
每个独立模块一个 subagent  # ✅
\`\`\`

**3. 结果汇总**
\`\`\`
等待所有 subagent 完成后，汇总它们的发现：
1. 哪些问题被多个 subagent 同时发现？（高优先）
2. 是否有冲突的建议？（需要人工决策）
3. 综合评估变更风险
\`\`\`

### Plan Mode + Subagents 组合

\`\`\`
1. /plan 模式分析整体任务
2. 根据分析结果，规划 subagent 分工
3. 派发任务给 subagents
4. 汇总结果，执行最终变更
\`\`\`

这个模式特别适合：
- 大型重构
- 跨模块变更
- 需要多角度审查的关键变更
`
      }
    ]
  },
  3: {
    id: 3,
    title: "架构师级实战项目",
    subtitle: "Legacy 代码现代化、System Design with AI、Multi-Agent Dev Pipeline",
    time: "12-15小时",
    offline: false,
    sections: [
      {
        id: "intro",
        title: "引言：从理论到实战",
        content: `
## 引言：从理论到实战

前两个模块建立了理论基础，本模块通过三个大型项目来实践。

### 三大实战项目

**项目一：Legacy 代码现代化 (4-5h)**
- 将一个 Express + Callback 风格的服务迁移到现代架构
- 使用 AI 理解遗留代码、规划迁移、执行重构

**项目二：System Design with AI (4-5h)**
- 从零设计一个分布式系统
- 利用 AI 进行架构决策、权衡分析、文档生成

**项目三：Multi-Agent Dev Pipeline (4-5h)**
- 构建一个多 Agent 协作的开发流水线
- 体验 Agent 编排的最佳实践

### 📦 Starter Repos (起始代码)

为确保你能顺利动手实践，我们提供了以下起始仓库：

| 项目 | Starter Repo | 说明 |
|------|-------------|------|
| Legacy 现代化 | [legacy-express-service](https://github.com/ai-coding-course/legacy-express-service) | 2018 年风格的 Express 服务 |
| System Design | [whiteboard-design-starter](https://github.com/ai-coding-course/whiteboard-design-starter) | 设计文档模板 + 示例 |
| Multi-Agent | [agent-pipeline-starter](https://github.com/ai-coding-course/agent-pipeline-starter) | TypeScript 项目骨架 |

**快速开始：**
\`\`\`bash
# 项目一：Legacy 现代化
git clone https://github.com/ai-coding-course/legacy-express-service
cd legacy-express-service
npm install
npm start  # 启动旧版服务

# 项目二：System Design（纯设计，无代码）
git clone https://github.com/ai-coding-course/whiteboard-design-starter
cd whiteboard-design-starter
# 查看 REQUIREMENTS.md 和 TEMPLATE.md

# 项目三：Multi-Agent Pipeline
git clone https://github.com/ai-coding-course/agent-pipeline-starter
cd agent-pipeline-starter
bun install
bun run dev
\`\`\`

> 💡 **没有 GitHub 账号？** 可以直接下载 ZIP 或使用下方的代码片段手动创建项目。

### 准备工作

确保你已经：
- 安装并配置好 Claude Code
- 准备一个 GitHub 账号（可选，也可用代码片段）
- 有至少 2-3 小时的连续时间
`
      },
      {
        id: "project-1",
        title: "项目一：Legacy 代码现代化",
        content: `
## 项目一：Legacy 代码现代化

### 场景设定

你接手了一个 2018 年的 Node.js 服务：
- Express 4.x + Callback 风格
- 没有 TypeScript
- 测试覆盖率 < 20%
- 文档过时

目标：迁移到 Fastify + TypeScript + 现代最佳实践

### 📦 起始代码

**方式一：克隆 Starter Repo**
\`\`\`bash
git clone https://github.com/ai-coding-course/legacy-express-service
cd legacy-express-service
npm install && npm start
\`\`\`

**方式二：手动创建项目**

如果无法访问 GitHub，可以手动创建以下文件结构：

\`\`\`bash
mkdir legacy-service && cd legacy-service
npm init -y
npm install express body-parser mongoose
\`\`\`

**package.json:**
\`\`\`json
{
  "name": "legacy-user-service",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.17.1",
    "body-parser": "^1.19.0"
  }
}
\`\`\`

**index.js (典型 2018 风格):**
\`\`\`javascript
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

// 模拟数据库
var users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// GET all users (callback style)
app.get('/api/users', function(req, res, next) {
  setTimeout(function() {
    res.json({ success: true, data: users });
  }, 100);
});

// GET user by ID
app.get('/api/users/:id', function(req, res, next) {
  var id = parseInt(req.params.id);
  var user = users.find(function(u) { return u.id === id; });
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }
  res.json({ success: true, data: user });
});

// POST create user (no validation)
app.post('/api/users', function(req, res, next) {
  var newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

// Error handler (basic)
app.use(function(err, req, res, next) {
  console.error(err);
  res.status(500).json({ success: false, error: 'Internal error' });
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log('Server running on port ' + PORT);
});
\`\`\`

验证启动成功：
\`\`\`bash
npm start
# 访问 http://localhost:3000/api/users
\`\`\`

### 第一阶段：代码考古 (30min)

\`\`\`
# 启动 Claude Code，进入项目目录
cd legacy-service
claude

# 第一个指令：全面分析
分析这个代码库，给我一份"考古报告"：
1. 技术栈和主要依赖的版本
2. 架构模式（MVC? 无架构?）
3. 数据流：请求从哪进，数据怎么流动
4. 代码质量评估（可维护性、测试性）
5. 最大的技术债务在哪
6. 有哪些"考古发现"（奇怪的代码、历史包袱）
\`\`\`

### 第二阶段：迁移规划 (45min)

\`\`\`
/plan

基于刚才的分析，制定一个分阶段迁移计划。要求：
1. 每个阶段都可以独立部署
2. 不能有任何破坏性变更
3. 包含回滚策略
4. 预估每个阶段的风险级别

约束条件：
- 团队每周只能投入 2 天做迁移
- 必须保持线上服务稳定
- 优先迁移最痛点的模块
\`\`\`

### 第三阶段：TypeScript 引入 (1-1.5h)

\`\`\`
# 阶段性执行
执行迁移计划的第一阶段：引入 TypeScript

1. 配置 TypeScript（保守配置，允许 any）
2. 为最核心的 3 个文件添加类型
3. 配置 CI 检查
4. 编写迁移指南给团队

每完成一步，我需要 review 然后继续。
\`\`\`

### 第四阶段：框架迁移 (1.5-2h)

\`\`\`
继续迁移计划：Express -> Fastify

采用 strangler fig 模式：
1. 创建 Fastify 应用作为新入口
2. 将请求代理到现有 Express 应用
3. 逐个迁移路由
4. 添加测试确保行为一致

先从一个简单的健康检查路由开始。
\`\`\`

### 第五阶段：现代化收尾 (1h)

\`\`\`
完成以下现代化工作：
1. 添加 ESLint + Prettier 配置
2. 配置 GitHub Actions CI
3. 生成 API 文档（OpenAPI）
4. 更新 README
5. 创建 CONTRIBUTING.md

同时，生成一份"迁移复盘"文档，记录：
- 遇到的主要问题
- 解决方案
- 经验教训
- 对其他团队的建议
\`\`\`

### 学习要点

1. **AI 做代码考古很强**：理解陌生代码是 AI 的优势场景
2. **Plan Mode 是复杂任务必需**：不要让 AI 直接开干
3. **分阶段执行，人工 review**：架构师的判断仍然关键
4. **记录过程**：AI 可以帮你生成高质量文档
`
      },
      {
        id: "project-2",
        title: "项目二：System Design with AI",
        content: `
## 项目二：System Design with AI

### 场景设定

设计一个实时协作白板系统（类似 Figma/Miro）：
- 支持多人同时编辑
- 实时同步
- 支持离线编辑和冲突解决
- 目标用户 10万 DAU

### 第一阶段：需求分析 (30min)

\`\`\`
我们要设计一个实时协作白板系统。先帮我做需求分析：

1. 核心功能列表（MVP vs Nice-to-have）
2. 非功能性需求（性能、可用性、安全）
3. 技术挑战识别
4. 类似系统参考（Figma, Miro 等是怎么做的）

不需要给解决方案，先把问题定义清楚。
\`\`\`

### 第二阶段：架构决策 (1h)

\`\`\`
针对实时协作的核心挑战，我需要做几个架构决策。
对每个决策点，给我选项分析：

1. 实时同步协议：WebSocket vs SSE vs WebRTC
2. 冲突解决策略：OT vs CRDT vs Last-Write-Wins
3. 状态存储：关系型 vs 文档型 vs 图数据库
4. 部署模式：Monolith vs Microservices

对每个选项，分析：
- 优点
- 缺点
- 适用场景
- 我们场景下的推荐

用表格对比会更清晰。
\`\`\`

### 第三阶段：详细设计 (1.5h)

\`\`\`
基于我们的决策（CRDT + WebSocket + 文档数据库），
做详细的系统设计：

1. 组件图：主要服务和它们的职责
2. 数据流图：一次编辑操作的完整流程
3. 数据模型：核心实体和关系
4. API 设计：主要接口定义（REST + WebSocket 消息）

用 Mermaid 或 PlantUML 画图。
\`\`\`

### 第四阶段：扩展性设计 (1h)

\`\`\`
现在考虑扩展性。当用户量从 1万 增长到 100万：

1. 哪些组件会成为瓶颈？
2. 如何水平扩展 WebSocket 连接？
3. CRDT 状态的分片策略？
4. 成本估算和优化建议

同时，画一张演进路线图：
- Phase 1: MVP (1万用户)
- Phase 2: 增长期 (10万用户)
- Phase 3: 规模化 (100万用户)
\`\`\`

### 第五阶段：文档输出 (30min)

\`\`\`
生成完整的设计文档，包括：

1. Executive Summary（给领导看的 1 页概要）
2. Architecture Decision Records (ADRs)
3. 详细技术设计文档
4. 风险评估和缓解措施
5. 团队和时间估算

格式要求：
- 使用 Markdown
- 关键决策要有 context 和 rationale
- 适合作为 RFC 提交给团队 review
\`\`\`

### 学习要点

1. **AI 是优秀的架构讨论伙伴**：能提供全面的选项分析
2. **保持批判性**：AI 的建议需要结合你的经验判断
3. **文档是副产品**：设计过程自然产出高质量文档
4. **迭代式探索**：可以安全地探索各种"what if"
`
      },
      {
        id: "project-3",
        title: "项目三：Multi-Agent Dev Pipeline",
        content: `
## 项目三：Multi-Agent Dev Pipeline

### 场景设定

构建一个多 Agent 协作的开发流水线：
- Agent 1: 需求分析师
- Agent 2: 架构师  
- Agent 3: 开发者
- Agent 4: 测试工程师
- Agent 5: 文档工程师

### 📦 起始代码

**方式一：克隆 Starter Repo**
\`\`\`bash
git clone https://github.com/ai-coding-course/agent-pipeline-starter
cd agent-pipeline-starter
bun install && bun run dev
\`\`\`

**方式二：手动创建项目**

\`\`\`bash
mkdir agent-pipeline && cd agent-pipeline
bun init -y
bun add @anthropic-ai/sdk zod
\`\`\`

**package.json:**
\`\`\`json
{
  "name": "agent-pipeline",
  "type": "module",
  "scripts": {
    "dev": "bun run src/index.ts"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.30.0",
    "zod": "^3.22.0"
  }
}
\`\`\`

**src/types.ts:**
\`\`\`typescript
export interface Task {
  id: string;
  type: 'requirement' | 'design' | 'code' | 'test' | 'doc';
  input: unknown;
  dependencies: string[];
  assignedAgent: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  output?: unknown;
}

export interface AgentEvent {
  type: 'output' | 'query' | 'change';
  fromAgent: string;
  toAgent?: string;
  payload: unknown;
}

export interface Agent {
  id: string;
  name: string;
  systemPrompt: string;
  execute: (input: unknown) => Promise<unknown>;
}
\`\`\`

**src/agents/base.ts:**
\`\`\`typescript
import Anthropic from '@anthropic-ai/sdk';
import type { Agent } from '../types';

const client = new Anthropic();

export function createAgent(
  id: string,
  name: string,
  systemPrompt: string
): Agent {
  return {
    id,
    name,
    systemPrompt,
    async execute(input: unknown): Promise<unknown> {
      const response = await client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        system: systemPrompt,
        messages: [{ role: 'user', content: JSON.stringify(input) }]
      });
      
      const textBlock = response.content.find(b => b.type === 'text');
      return textBlock ? JSON.parse(textBlock.text) : null;
    }
  };
}
\`\`\`

**src/index.ts:**
\`\`\`typescript
import { createAgent } from './agents/base';
import type { Task } from './types';

// 创建 Agent 实例
const requirementAgent = createAgent(
  'requirement-agent',
  'Requirement Analyst',
  \`你是一个需求分析师。接收用户需求，输出结构化的需求文档。
输出格式：{ "features": [...], "acceptance_criteria": [...] }\`
);

const architectAgent = createAgent(
  'architect-agent', 
  'Architect',
  \`你是一个软件架构师。接收需求文档，输出架构设计。
输出格式：{ "components": [...], "data_flow": [...], "tech_stack": [...] }\`
);

// 示例运行
async function main() {
  const userRequest = "开发一个简单的 Todo API：支持 CRUD 操作";
  
  console.log('📝 Processing requirement...');
  const requirements = await requirementAgent.execute({ request: userRequest });
  console.log('Requirements:', requirements);
  
  console.log('🏗️ Designing architecture...');  
  const design = await architectAgent.execute(requirements);
  console.log('Design:', design);
}

main().catch(console.error);
\`\`\`

验证环境：
\`\`\`bash
export ANTHROPIC_API_KEY=your-key
bun run dev
\`\`\`

### 架构概览

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                     Orchestrator (主 Agent)                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ 需求分析  │─▶│  架构设计 │─▶│   开发   │─▶│   测试   │   │
│  │  Agent   │  │  Agent   │  │  Agent   │  │  Agent   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│       │              │             │             │          │
│       └──────────────┴─────────────┴─────────────┘          │
│                          ▼                                   │
│                   ┌──────────┐                               │
│                   │ 文档生成  │                               │
│                   │  Agent   │                               │
│                   └──────────┘                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### 第一阶段：定义 Agent 角色 (30min)

\`\`\`
我们要创建一个多 Agent 开发流水线。
先帮我定义每个 Agent 的角色：

Agent 1: Requirement Analyst
- 输入：用户需求描述
- 输出：结构化的需求文档
- 工具：需求模板、验收标准生成器

Agent 2: Architect
- 输入：需求文档
- 输出：架构设计文档、技术选型
- 工具：设计模式库、架构决策框架

Agent 3: Developer
- 输入：架构设计、具体任务
- 输出：代码实现
- 工具：代码生成、重构工具

Agent 4: QA Engineer
- 输入：需求+代码
- 输出：测试用例、测试报告
- 工具：测试框架、覆盖率工具

Agent 5: Technical Writer
- 输入：所有产出物
- 输出：API 文档、用户指南
- 工具：文档模板、图表生成

为每个 Agent 写一个 system prompt 模板。
\`\`\`

### 第二阶段：构建 Orchestrator (1h)

\`\`\`
现在创建 Orchestrator 的逻辑。它负责：
1. 接收任务
2. 拆解成子任务
3. 分配给合适的 Agent
4. 协调 Agent 之间的依赖
5. 汇总结果

写一个 TypeScript 实现：

interface Task {
  id: string;
  type: 'requirement' | 'design' | 'code' | 'test' | 'doc';
  input: any;
  dependencies: string[];
  assignedAgent: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  output?: any;
}

class Orchestrator {
  async execute(userRequest: string): Promise<void>;
  private planTasks(request: string): Task[];
  private executeTask(task: Task): Promise<any>;
  private handleDependencies(task: Task): Promise<void>;
}
\`\`\`

### 第三阶段：Agent 间通信 (1h)

\`\`\`
实现 Agent 间的通信机制。要求：
1. 每个 Agent 的输出格式标准化
2. 支持 Agent 之间的查询（如开发 Agent 询问架构 Agent）
3. 冲突检测和解决
4. 变更传播（如需求变更时通知下游 Agent）

用事件驱动的方式实现：

interface AgentEvent {
  type: 'output' | 'query' | 'change';
  fromAgent: string;
  toAgent?: string;
  payload: any;
}

class EventBus {
  publish(event: AgentEvent): void;
  subscribe(agentId: string, handler: (event: AgentEvent) => void): void;
}
\`\`\`

### 第四阶段：实际运行 (1.5h)

\`\`\`
现在用这个流水线处理一个实际任务：

任务：开发一个简单的 Todo API
- CRUD 操作
- 用户认证
- 数据持久化

启动流水线，观察每个 Agent 的产出，
最终汇总所有产出物。

注意记录：
1. 每个阶段的耗时
2. Agent 间的交互次数
3. 需要人工干预的地方
4. 整体效果评估
\`\`\`

### 第五阶段：优化和总结 (1h)

\`\`\`
基于实际运行的结果，优化流水线：

1. 哪些环节可以并行？
2. 哪些 Agent 的边界需要调整？
3. 如何减少冗余的交互？
4. 错误恢复机制是否完善？

最后，总结这个项目的 lessons learned：
- Multi-Agent 模式的优缺点
- 适用场景
- 实际生产中的考虑事项
\`\`\`

### 学习要点

1. **Agent 编排是新技能**：需要理解分工、协调、通信
2. **标准化很重要**：Agent 间的接口要清晰定义
3. **人在回路中**：当前技术仍需要人工审查关键节点
4. **成本意识**：多 Agent 意味着多倍的 token 消耗
`
      }
    ]
  },
  4: {
    id: 4,
    title: "业界专家观点",
    subtitle: "Karpathy, Simon Willison, Swyx, Harrison Chase 的洞察",
    time: "3-4小时",
    offline: true,
    sections: [
      {
        id: "karpathy",
        title: "Andrej Karpathy: Vibe Coding 与 Software 3.0",
        offline: true,
        content: `
## ✈️ Andrej Karpathy: Vibe Coding 与 Software 3.0

### 人物背景

Andrej Karpathy：
- OpenAI 联合创始人
- 前 Tesla AI 总监
- 斯坦福 CS231n 课程创建者
- "Vibe Coding" 概念提出者

### Vibe Coding 的定义

2025 年 2 月，Karpathy 的一条推文引发广泛讨论：

> "There's a new kind of coding I call 'vibe coding', where you fully give in to the vibes, embrace exponentials, and forget that the code even exists."

核心特征：
- **完全放弃控制**：不再逐行审查代码
- **Accept All**：直接接受所有 AI 生成的代码
- **懒惰是特性**：让 AI 做所有细节工作
- **快速迭代**：出错就复制错误信息让 AI 修

### Software 3.0 理论框架

Karpathy 在 AI Startup School 的演讲中提出了 Software 演进的三个阶段：

**Software 1.0**
- 人类手写每一行代码
- 确定性、可解释
- 传统软件工程

**Software 2.0**
- 神经网络，权重是"代码"
- 通过数据训练而非手写
- 深度学习时代

**Software 3.0**
- 大语言模型
- 用自然语言"编程"
- English is the new programming language

### 对架构师的启示

**1. 角色转变**
\`\`\`
传统架构师
├── 设计系统结构
├── 编写核心代码
└── Review 所有变更

AI 时代架构师
├── 定义约束和标准
├── 验证 AI 产出
└── 做 AI 做不好的决策
\`\`\`

**2. 新技能需求**
- Prompt Engineering
- AI 输出的质量判断
- 快速原型验证能力
- 高层系统思维

**3. 风险意识**
Karpathy 也警告：
> "Vibe coding 适合周末项目和原型，对于严肃的生产代码，你仍然需要理解代码。"

### 批判性思考

**Vibe Coding 的适用边界：**

| 适用 | 不适用 |
|-----|-------|
| 原型和 POC | 金融系统 |
| 内部工具 | 安全关键系统 |
| 个人项目 | 大规模生产系统 |
| 学习新技术 | 需要审计的系统 |

**架构师的立场：**

作为 Senior Architect，你需要在团队中建立合理的 AI 使用边界：
- 哪些场景可以 "vibe coding"
- 哪些场景必须严格 review
- 如何检测 AI 生成代码的问题
`
      },
      {
        id: "simon-willison",
        title: "Simon Willison: 实用主义的 AI 编程",
        offline: true,
        content: `
## ✈️ Simon Willison: 实用主义的 AI 编程

### 人物背景

Simon Willison：
- Django 联合创始人
- Datasette 创建者
- LLM 工具研究者
- 博客 simonwillison.net 持续更新 AI 实践

### 核心观点

Simon 的 LLM 编程方法论是"实用主义"的典范：

> "如果有人告诉你用 LLM 写代码很简单，他们（可能是无意地）在误导你。"

### 关键原则

**1. 设定合理期望**

\`\`\`markdown
LLM 不是 AGI，是花哨的自动补全。
它们擅长：
- 把 token 按正确顺序排列
- 查找和模式匹配
- 批量生成类似代码

它们不擅长：
- 深层逻辑推理
- 完全理解你的意图
- 从不犯错
\`\`\`

**2. Context 是王道**

> "使用 LLM 的大部分技巧都归结于管理上下文——喂给它什么文本。"

实践建议：
- 在 prompt 中包含相关代码
- 提供函数签名作为指导
- 明确技术栈和约束条件
- 不确定时，先让 LLM 给选项

**3. 你必须测试**

> "你绝对不能外包给机器的一件事是：测试代码是否真的能工作。"

这是 Simon 反复强调的核心：
- 看到代码运行才算数
- 不要相信 LLM 说"这能工作"
- 投资于手动 QA 习惯

**4. 对话式迭代**

\`\`\`markdown
# Simon 的典型工作流
1. 给初始 prompt
2. 得到结果，运行测试
3. 不满意？让它重构
4. "把重复代码提成函数"
5. "用字符串方法替代正则"
6. "写得更好！"
\`\`\`

### 工具使用经验

Simon 积极使用和评测各种工具：

**Claude Artifacts:**
> "Claude 可以构建 HTML+JS+CSS 应用在界面里显示，在安全沙箱里运行。这对快速原型非常棒。"

**Claude Code:**
> "我现在每天用 Claude Code。它理解代码库的能力，加上能运行代码的能力，是真正的游戏改变者。"

**LLM CLI:**
Simon 自己开发的 [llm](https://github.com/simonw/llm) 工具：
\`\`\`bash
# 管道式使用
cat mycode.py | llm "review this code"

# 多模型切换
llm -m claude-3 "explain this"
llm -m gpt-4 "explain this"
\`\`\`

### 学习建议

**1. Vibe Coding 用于学习**
> "探索 LLM 的最好方式是玩耍。扔给它们荒谬的想法，vibe coding 直到勉强能用。"

Simon 的 simonw/tools 仓库有 80+ 个 LLM 生成的小工具。

**2. 选择"无聊"的技术**
> "我现在选库时会考虑：这个库在模型训练数据里有多少？稳定的、流行的库往往效果更好。"

**3. 记录和分享**
Simon 的博客是 LLM 实践的宝库。他建议：
- 记录你的 prompt 和结果
- 分享什么有效、什么无效
- 建立自己的最佳实践库
`
      },
      {
        id: "swyx",
        title: "Swyx: AI Engineer 的崛起",
        offline: true,
        content: `
## ✈️ Swyx: AI Engineer 的崛起

### 人物背景

Swyx (Shawn Wang)：
- Latent Space 播客主持人
- AI Engineer Summit 创办者
- 前 Netlify, AWS 工程师
- "Learn in Public" 理念倡导者

### 核心观点：AI Engineer 是新角色

Swyx 在 2023 年提出"AI Engineer"这个新角色：

> "AI Engineer 不是 ML Engineer，也不是传统 Software Engineer。是一个新物种。"

**AI Engineer 的特征：**
\`\`\`
┌─────────────────────────────────────┐
│           AI Engineer               │
├─────────────────────────────────────┤
│ 不需要:                             │
│ - 训练模型                          │
│ - 理解 transformer 细节             │
│ - GPU 调优                          │
├─────────────────────────────────────┤
│ 需要:                               │
│ - 理解模型能力和限制                 │
│ - Prompt Engineering               │
│ - 应用架构设计                      │
│ - 评估和质量控制                    │
│ - 成本优化                          │
└─────────────────────────────────────┘
\`\`\`

### Agent Engineering

2025 年，Swyx 进一步推进到"Agent Engineering"：

> "AI Engineer 1.0 是 prompt engineering。AI Engineer 2.0 是 agent engineering。"

**Agent Engineering 的核心技能：**
1. 任务分解和规划
2. 工具设计和选择
3. 上下文管理
4. 错误恢复和重试策略
5. 人机协作设计

### Latent Space 重要洞察

从 Latent Space 播客中提炼的关键洞察：

**关于工具选择**
> "不要追最新的模型。稳定可预测比偶尔惊艳更重要。"

**关于 Prompt Engineering**
> "最好的 prompt 是不需要 prompt 的。让用户用自然语言，系统自动适配。"

**关于成本**
> "大多数 AI 应用死于成本，不是技术。在原型阶段就要考虑成本结构。"

### 对架构师的建议

**1. 建立 AI 评估能力**
\`\`\`python
# 每个 AI 功能都需要评估体系
eval_metrics = {
    "accuracy": measure_correctness(),
    "latency": measure_response_time(),
    "cost": calculate_token_cost(),
    "user_satisfaction": collect_feedback()
}
\`\`\`

**2. 设计可降级的系统**
\`\`\`
用户请求
    │
    ▼
┌─────────────┐
│  AI 处理    │ ──失败──▶ ┌────────────┐
└─────────────┘           │ Fallback   │
    │                     │ (规则/人工) │
    成功                  └────────────┘
    │
    ▼
  响应
\`\`\`

**3. 投资于可观测性**
> "你无法改进你无法测量的东西。AI 系统的可观测性比传统系统更重要。"
`
      },
      {
        id: "harrison-chase",
        title: "Harrison Chase: 构建 Agent 基础设施",
        offline: true,
        content: `
## ✈️ Harrison Chase: 构建 Agent 基础设施

### 人物背景

Harrison Chase：
- LangChain 创始人 & CEO
- 公司估值 $1.25B
- Agent 编排领域的先驱

### 三年的经验教训

在 LangChain 三周年博文中，Harrison 分享了关键经验：

**1. 从 Chains 到 Agents**
\`\`\`
2022: langchain 是 800 行 Python
      - 链式调用模式
      - 高度抽象

2024: LangGraph 成为核心
      - 状态管理
      - 更精细控制
      - 生产就绪
\`\`\`

**2. 用户需要控制**

> "langchain 收到很多负面反馈：人们想要更多控制。高级接口在开始时很方便，但在生产化时成了障碍。"

这促使了 LangGraph 的诞生：
- 没有隐藏的 prompt
- 完全控制上下文工程
- 一流的运行时支持

**3. 可靠的 Agent 三要素**

Harrison 在演讲中总结：

\`\`\`
可靠 Agent = Context + Tools + Evaluation
           上下文    工具     评估
\`\`\`

**Context（上下文）**
- 确保 LLM 在每一步都有正确的信息
- 这是 Agent 可靠性最重要的因素

**Tools（工具）**
- 精心设计的工具接口
- 清晰的输入输出定义
- 优雅的错误处理

**Evaluation（评估）**
- 端到端测试
- 中间步骤验证
- 回归测试套件

### Deep Agents 概念

Harrison 最新提出的"Deep Agents"：

> "Deep Agents 是能够自主规划和适应的 AI 系统。它们不只是执行预定义的工作流，而是能根据情况调整策略。"

**特征：**
- 长周期任务处理
- 动态策略调整
- 学习和改进能力
- 人类监督集成

### 对架构师的建议

**1. 选择合适的抽象层**

\`\`\`
高度抽象 (LangChain)
├── 优点: 快速原型
├── 缺点: 难以定制
└── 适用: 实验和 POC

低度抽象 (LangGraph)
├── 优点: 完全控制
├── 缺点: 学习曲线
└── 适用: 生产系统
\`\`\`

**2. 投资于 Observability**

LangSmith 是 Harrison 认为的关键产品：

> "没有可观测性，你无法调试 Agent。你需要看到每一步发生了什么，输入了什么，输出了什么。"

**3. Agent 不是万能药**

> "Agent 很强大，但不是所有问题都需要 Agent。有时简单的 API 调用就够了。选择正确的工具解决正确的问题。"
`
      },
      {
        id: "industry-reports",
        title: "各大厂实践报告",
        offline: true,
        content: `
## ✈️ 各大厂 AI Coding 实践报告

### Google: AI 辅助写了 25% 的新代码

Google 2024 年报告：
- AI 辅助生成了 25%+ 的新代码
- 主要用于：
  - 代码补全
  - 测试生成
  - 文档编写
- 节省的时间用于更复杂的工程挑战

### GitHub: Copilot 的影响

GitHub 研究数据：
- 使用 Copilot 的开发者完成任务快 55%
- 代码接受率约 30%
- 对新语言/框架帮助最大

### Anthropic 内部使用

根据 Pragmatic Engineer 的报道：
- 80%+ 的 Anthropic 工程师每天使用 Claude Code
- Claude Code 90% 的代码是自己写的
- 团队规模翻倍时，PR 产出增加了 67%（通常会下降）

### 关键发现总结

**1. AI 不会取代工程师**

所有报告都显示：
- AI 是增强而非替代
- 工程师的角色在转变
- 高级技能更重要

**2. 质量控制是关键**

\`\`\`
AI 生成代码的质量分布：
├── 30% 直接可用
├── 50% 需要小修改
└── 20% 需要重写
\`\`\`

**3. 最大的收益在特定场景**

高 ROI 场景：
- 样板代码生成
- 测试用例编写
- 文档生成
- 代码审查辅助
- 学习新技术

**4. 需要组织支持**

成功采用 AI coding 的公司特点：
- 有明确的使用指南
- 投资于培训
- 建立评估体系
- 持续迭代最佳实践

### 架构师行动建议

1. **试点项目**：在低风险项目上试用 AI 工具
2. **建立指南**：制定团队的 AI 使用规范
3. **收集数据**：量化 AI 的实际影响
4. **分享经验**：建立内部最佳实践库
5. **持续学习**：这个领域变化很快
`
      }
    ]
  },
  5: {
    id: 5,
    title: "前沿与战略思考",
    subtitle: "MCP, Computer Use, 本地模型, 架构师新角色",
    time: "2-3小时",
    offline: true,
    sections: [
      {
        id: "mcp-future",
        title: "MCP: 连接一切的协议",
        offline: true,
        content: `
## ✈️ MCP: 连接一切的协议

### MCP 的战略意义

Model Context Protocol 不只是一个技术协议，它代表了 AI 与外部世界交互的标准化趋势。

### 当前生态

截至 2025 年，MCP 生态已经相当丰富：

**官方 Servers**
- filesystem, github, postgres, slack
- puppeteer, memory, fetch

**社区 Servers**
- 数据库：MySQL, MongoDB, Redis
- 云服务：AWS, GCP, Azure
- 开发工具：JIRA, Linear, Notion
- 通信：Slack, Discord, Email

### 企业级 MCP 架构

\`\`\`
                    ┌─────────────────┐
                    │   MCP Gateway   │
                    │   (集中管理)     │
                    └────────┬────────┘
                             │
      ┌──────────────────────┼──────────────────────┐
      │                      │                      │
      ▼                      ▼                      ▼
┌──────────┐          ┌──────────┐          ┌──────────┐
│ Internal │          │ External │          │  Cloud   │
│  Tools   │          │ Services │          │ Services │
└──────────┘          └──────────┘          └──────────┘
 JIRA, Wiki            GitHub, NPM          AWS, GCP
\`\`\`

**关键设计考虑：**
- 认证和授权
- 审计日志
- 速率限制
- 故障隔离

### 未来展望

**1. MCP 成为行业标准**

2025 年底，Anthropic 将 MCP 捐赠给 Linux Foundation 的 AAIF。
这意味着：
- 厂商中立
- 更广泛的采用
- 更快的发展

**2. Server 生态爆发**

预期趋势：
- 每个 SaaS 产品都会提供 MCP Server
- 内部工具 MCP 化成为标配
- MCP Server 市场可能出现

**3. 组合性带来的可能**

\`\`\`
# 一个复杂工作流的例子
Agent 
├── 读取 JIRA ticket (JIRA MCP)
├── 理解代码库 (filesystem MCP)
├── 查询相关 PR (github MCP)
├── 查看监控数据 (grafana MCP)
├── 生成修复方案
└── 创建 PR 并更新 ticket
\`\`\`
`
      },
      {
        id: "computer-use",
        title: "Computer Use: AI 控制计算机",
        offline: true,
        content: `
## ✈️ Computer Use: AI 控制计算机

### 什么是 Computer Use

Computer Use 让 AI 能够像人类一样操作计算机界面：
- 看屏幕（截图理解）
- 移动鼠标、点击
- 输入文字
- 导航应用程序

### 当前能力

**Anthropic Computer Use (Claude)**
- 2024 年推出 beta 版
- 可以控制桌面应用
- 理解 UI 元素和布局

**OpenAI Operator**
- 2025 年初推出
- 专注于网页自动化
- 结合推理能力

### 应用场景

**1. 遗留系统自动化**
\`\`\`
旧系统没有 API？
让 AI 通过 UI 操作：
- 数据录入
- 报表生成
- 跨系统数据同步
\`\`\`

**2. 测试自动化**
\`\`\`python
# AI 驱动的 E2E 测试
ai_tester.run("""
1. 打开登录页面
2. 输入测试账号
3. 验证登录成功
4. 检查 dashboard 数据是否正确
""")
\`\`\`

**3. RPA 的进化**
传统 RPA vs AI Computer Use：
- 传统：脆弱，UI 变化就坏
- AI：理解语义，能适应变化

### 风险和考虑

**安全风险**
- AI 有了操作权限
- 误操作可能造成损失
- 需要严格的沙箱和权限控制

**性能开销**
- 截图和图像理解消耗大
- 比 API 调用慢很多
- 成本更高

**架构师建议**
1. 优先使用 API 和 MCP
2. Computer Use 用于最后手段
3. 严格的权限边界
4. 完善的审计日志
`
      },
      {
        id: "local-models",
        title: "本地模型: 安全与成本的平衡",
        offline: true,
        content: `
## ✈️ 本地模型: 安全与成本的平衡

### 为什么考虑本地模型

**安全合规**
- 代码不离开公司网络
- 满足数据主权要求
- 审计和控制更容易

**成本控制**
- 大量使用时成本可预测
- 不受 API 价格变动影响
- 长期可能更便宜

### 当前本地模型选项

**代码专用模型**
| 模型 | 大小 | 特点 |
|-----|------|-----|
| DeepSeek Coder | 1.3B-33B | 开源最强代码模型 |
| CodeLlama | 7B-70B | Meta 出品 |
| StarCoder2 | 3B-15B | BigCode 项目 |

**通用模型（代码也行）**
| 模型 | 大小 | 特点 |
|-----|------|-----|
| Llama 3.1 | 8B-405B | 全能选手 |
| Qwen 2.5 | 0.5B-72B | 中文友好 |
| Mistral | 7B-22B | 效率出色 |

### 本地部署架构

\`\`\`
开发者机器          共享 GPU 服务器
    │                    │
    ▼                    ▼
┌─────────┐         ┌─────────────┐
│ Ollama  │   或    │ vLLM/TGI   │
│ (单机)   │         │ (服务化)    │
└─────────┘         └─────────────┘
    │                    │
    └────────┬───────────┘
             │
             ▼
      ┌─────────────┐
      │ AI Coding   │
      │   Tools     │
      │ (Aider等)   │
      └─────────────┘
\`\`\`

### 实用配置

**Ollama + Aider 配置**
\`\`\`bash
# 安装 Ollama
curl -fsSL https://ollama.com/install.sh | sh

# 下载模型
ollama pull deepseek-coder:33b

# 配置 Aider 使用本地模型
export OLLAMA_API_BASE=http://localhost:11434
aider --model ollama/deepseek-coder:33b
\`\`\`

**性能优化建议**
- 量化模型减少显存需求
- 使用 Flash Attention
- 合理设置并发数
- 监控 GPU 利用率

### 混合策略

最佳实践往往是混合使用：

\`\`\`
敏感代码 ────▶ 本地模型
                 │
                 ▼ 脱敏后
开源代码 ────▶ 云端模型（更强）
\`\`\`

**决策框架**
| 因素 | 选本地 | 选云端 |
|------|-------|-------|
| 代码敏感度 | 高 | 低 |
| 使用频率 | 高 | 低 |
| 任务复杂度 | 低 | 高 |
| 预算 | 有限 | 充足 |
`
      },
      {
        id: "architect-role",
        title: "架构师角色的演变",
        offline: true,
        content: `
## ✈️ 架构师角色的演变

### 传统架构师 vs AI 时代架构师

**技能迁移**
\`\`\`
传统架构师                    AI 时代架构师
────────────────────         ────────────────────
系统设计            ─────▶   系统设计（不变）
代码审查            ─────▶   AI 输出审查
技术选型            ─────▶   AI 工具选型（新增）
性能优化            ─────▶   性能 + 成本优化
文档编写            ─────▶   AI 辅助文档
指导初级工程师      ─────▶   指导如何用 AI
\`\`\`

### 新职责

**1. AI 策略制定**
- 评估和选择 AI 工具
- 制定使用规范
- 培训团队
- 持续优化

**2. 质量把关**
- 建立 AI 代码审查流程
- 设计测试策略
- 定义接受标准

**3. 风险管理**
- 识别 AI 相关风险
- 设计缓解措施
- 事故响应计划

**4. 成本优化**
- Token 使用监控
- 模型选择优化
- 混合部署策略

### 团队结构调整

**AI 原生团队结构**
\`\`\`
          ┌─────────────┐
          │  Tech Lead  │
          │ (AI 策略)   │
          └──────┬──────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
    ▼            ▼            ▼
┌───────┐   ┌───────┐   ┌───────┐
│ Human │   │ Human │   │ Human │
│ + AI  │   │ + AI  │   │ + AI  │
│ Agent │   │ Agent │   │ Agent │
└───────┘   └───────┘   └───────┘
\`\`\`

**关键变化**
- 每个工程师都有 AI 搭档
- 产出量大幅提升
- 审查和协调工作增加
- 更扁平的结构

### 职业发展建议

**短期（6个月内）**
- 精通至少一个 AI coding 工具
- 建立个人最佳实践
- 在团队内分享经验

**中期（1-2年）**
- 推动团队 AI 采用
- 建立评估和质量体系
- 参与行业社区

**长期（2-5年）**
- 成为 AI 工程 leader
- 影响组织战略
- 培养下一代 AI 原生工程师
`
      },
      {
        id: "team-adoption",
        title: "团队 AI 采用策略",
        offline: true,
        content: `
## ✈️ 团队 AI 采用策略

### 采用成熟度模型

\`\`\`
Level 1: 个人探索
├── 个别工程师尝试 AI 工具
└── 无组织支持

Level 2: 试点项目
├── 选定项目使用 AI
├── 收集数据和反馈
└── 初步指南形成

Level 3: 团队推广
├── 统一工具和流程
├── 培训计划实施
└── 最佳实践文档

Level 4: 组织级别
├── AI 融入工程文化
├── 工具和流程标准化
└── 持续优化机制

Level 5: AI 原生
├── AI 是默认工作方式
├── 深度集成到 CI/CD
└── 自动化程度最大化
\`\`\`

### 推广策略

**1. 从痛点切入**

找到团队最痛的问题，用 AI 解决：
- 测试编写慢？AI 生成测试
- 文档缺失？AI 生成文档
- 代码审查瓶颈？AI 辅助审查

**2. 培养内部冠军**

\`\`\`
识别和培养 AI 冠军
├── 每个团队 1-2 人
├── 深入学习 AI 工具
├── 帮助其他成员
└── 反馈问题和建议
\`\`\`

**3. 建立安全边界**

\`\`\`markdown
# AI 使用政策示例

## 允许
- 代码补全和生成
- 测试用例生成
- 文档编写
- 代码重构建议

## 需要审查
- 涉及安全的代码
- 数据库 schema 变更
- API 接口变更

## 禁止
- 上传客户数据
- 使用未经批准的工具
- 跳过代码审查
\`\`\`

**4. 度量和迭代**

追踪指标：
- 开发速度变化
- 代码质量变化
- AI 工具使用率
- 工程师满意度
- 成本支出

### 常见阻力和应对

| 阻力 | 应对 |
|------|------|
| "AI 会取代我" | 强调增强而非替代 |
| "代码质量不行" | 展示审查后的质量数据 |
| "安全风险" | 明确政策，使用本地模型 |
| "学习成本高" | 渐进式培训，从简单开始 |
| "成本太高" | 量化 ROI，优化使用 |

### 成功案例参考

**Anthropic**
- 80% 工程师每天使用 Claude Code
- PR 产出在团队翻倍时增加 67%

**某大厂**
- 从试点到全面采用用了 6 个月
- 代码生成效率提升 40%
- 测试覆盖率从 65% 提升到 85%

**关键成功因素**
1. 高层支持
2. 明确的政策和指南
3. 持续的培训和支持
4. 数据驱动的决策
5. 耐心和迭代
`
      }
    ]
  },
  6: {
    id: 6,
    title: "Claude Code 架构解析",
    subtitle: "整体架构、Tool System、上下文管理、源码阅读指南",
    time: "4-5小时",
    offline: true,
    sections: [
      {
        id: "architecture-overview",
        title: "整体架构概览",
        offline: true,
        content: `
## ✈️ Claude Code 整体架构概览

### 技术栈

根据 Pragmatic Engineer 的报道：

\`\`\`
Claude Code 技术栈
├── 语言: TypeScript
├── UI框架: React + Ink (终端 UI)
├── 布局系统: Yoga (Meta 的约束布局)
├── 构建工具: Bun
└── 分发: npm
\`\`\`

### 为什么选择这个技术栈

**"On Distribution" 原则**

> "我们选择模型已经擅长的技术栈。TypeScript 和 React 是模型非常熟悉的，所以 Claude Code 可以用来构建它自己。"

这意味着：
- 90% 的 Claude Code 是用 Claude Code 写的
- 自我迭代能力强
- Dog-fooding 最大化

### 核心架构

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                     Claude Code CLI                          │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │     UI       │  │   Tools      │  │  Permissions │      │
│  │ (React/Ink)  │  │   System     │  │   System     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   Context Manager                      │  │
│  │  (管理与 Claude API 的交互和上下文)                     │  │
│  └──────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                      Claude API                              │
│                   (Anthropic 云端)                           │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### 设计原则

**1. 最小化客户端逻辑**

> "我们尽量少写业务逻辑。每次新模型发布，我们都删代码。Claude 4.0 发布时删了一半的 system prompt。"

**2. 让模型"裸奔"**

> "很多产品在模型和用户之间加了太多脚手架，限制了模型能力。我们尽量让 UI 最小化。"

**3. 简单优先**

> "每个设计决策，我们几乎都选最简单的方案。本地运行？简单。用 permissions 而不是 sandbox？简单。"

### 关键组件

| 组件 | 职责 | 设计特点 |
|------|------|---------|
| UI | 终端界面渲染 | React/Ink, 最小化 |
| Tools | 提供文件、bash 等能力 | 不断精简 |
| Permissions | 安全控制 | 最复杂的部分 |
| Context | 管理对话历史 | 自动截断策略 |
| MCP | 外部工具集成 | 标准协议 |
`
      },
      {
        id: "tool-system",
        title: "Tool System 深度解析",
        offline: true,
        content: `
## ✈️ Tool System 深度解析

### Tools 的哲学

Claude Code 的 Tools 遵循"少即是多"原则：

> "我们不断删除 tools 并尝试新的。目标是最少的 tools 实现最大的能力。"

### 核心 Tools

**1. Read File**
\`\`\`typescript
interface ReadFileTool {
  name: "read_file";
  description: "读取文件内容";
  input: {
    path: string;
    start_line?: number;
    end_line?: number;
  };
  output: string; // 文件内容
}
\`\`\`

**2. Write File**
\`\`\`typescript
interface WriteFileTool {
  name: "write_file";
  description: "写入或创建文件";
  input: {
    path: string;
    content: string;
  };
  output: { success: boolean };
}
\`\`\`

**3. Execute Command**
\`\`\`typescript
interface ExecuteCommandTool {
  name: "execute_command";
  description: "执行 shell 命令";
  input: {
    command: string;
    cwd?: string;
  };
  output: {
    stdout: string;
    stderr: string;
    exit_code: number;
  };
}
\`\`\`

**4. Search Files**
\`\`\`typescript
interface SearchFilesTool {
  name: "search_files";
  description: "搜索文件内容";
  input: {
    pattern: string;
    path?: string;
    include?: string[];
    exclude?: string[];
  };
  output: Array<{
    file: string;
    line: number;
    content: string;
  }>;
}
\`\`\`

### Tool 调用流程

\`\`\`
用户输入
    │
    ▼
┌─────────────┐
│ Claude API  │ ──────▶ 返回 tool_use
└─────────────┘
    │
    ▼
┌─────────────┐
│ Permission  │ ──────▶ 用户确认
│   Check     │
└─────────────┘
    │
    ▼
┌─────────────┐
│ Tool        │ ──────▶ 执行并返回结果
│ Execution   │
└─────────────┘
    │
    ▼
┌─────────────┐
│ Claude API  │ ──────▶ 继续对话
└─────────────┘
\`\`\`

### 自定义 Tool (MCP)

通过 MCP 添加自定义能力：

\`\`\`typescript
// 定义一个部署 tool
const deployTool = {
  name: "deploy_service",
  description: "部署服务到指定环境",
  inputSchema: {
    type: "object",
    properties: {
      service: { type: "string" },
      environment: { 
        type: "string",
        enum: ["dev", "staging", "prod"]
      }
    },
    required: ["service", "environment"]
  },
  handler: async ({ service, environment }) => {
    // 实际的部署逻辑
    return { deployed: true, url: \`https://\${service}.\${environment}.example.com\` };
  }
};
\`\`\`

### Tools 设计最佳实践

**1. 单一职责**
每个 tool 做一件事，做好

**2. 清晰的输入输出**
\`\`\`typescript
// 好的设计
{
  input: { path: string, content: string },
  output: { success: boolean, error?: string }
}

// 不好的设计
{
  input: any,
  output: any
}
\`\`\`

**3. 优雅的错误处理**
\`\`\`typescript
try {
  const result = await executeTool(input);
  return { success: true, data: result };
} catch (error) {
  return { 
    success: false, 
    error: error.message,
    // 给模型足够信息来恢复
    suggestion: "Try checking if the file exists first"
  };
}
\`\`\`
`
      },
      {
        id: "context-management",
        title: "上下文管理策略",
        offline: true,
        content: `
## ✈️ 上下文管理策略

### 上下文的重要性

> "使用 LLM 的大部分技巧都归结于管理上下文。"
— Simon Willison

Claude Code 的上下文管理是其核心竞争力之一。

### 上下文组成

\`\`\`
┌────────────────────────────────────────┐
│              Total Context             │
├────────────────────────────────────────┤
│  System Prompt (项目指令)               │
│  ├── CLAUDE.md 内容                    │
│  ├── 全局设置                          │
│  └── 安全规则                          │
├────────────────────────────────────────┤
│  Conversation History (对话历史)        │
│  ├── 用户消息                          │
│  ├── 助手回复                          │
│  └── Tool 调用和结果                   │
├────────────────────────────────────────┤
│  Dynamic Context (动态上下文)           │
│  ├── 当前文件内容                       │
│  ├── 搜索结果                          │
│  └── 命令输出                          │
└────────────────────────────────────────┘
\`\`\`

### 自动截断策略

当上下文接近限制时：

\`\`\`
1. 优先保留
   ├── System Prompt (总是保留)
   ├── 最近的对话
   └── 当前任务相关内容

2. 选择性丢弃
   ├── 早期的对话历史
   ├── 已完成任务的详细输出
   └── 大段的文件内容
\`\`\`

### 最佳实践

**1. 明确的项目上下文**

\`\`\`markdown
# CLAUDE.md

## 项目概述
这是一个 [简短描述]

## 关键文件
- /src/core/engine.ts - 核心引擎
- /src/types/index.ts - 类型定义

## 编码规范
[简洁的规则列表]
\`\`\`

**2. 任务分段**

\`\`\`
# 不好: 一个超长的任务描述
"做A，然后做B，然后做C，然后..."

# 好: 分段执行
1. "先分析当前结构"
2. "基于分析，设计新方案"
3. "执行第一阶段重构"
\`\`\`

**3. 主动清理**

\`\`\`
# 完成一个大任务后
"总结一下我们刚才完成的工作，
然后开始新的会话处理下一个任务"
\`\`\`

### 上下文调试

\`\`\`bash
# 查看当前上下文使用情况
claude --debug

# 输出示例
Context Usage:
├── System Prompt: 2,500 tokens
├── Conversation: 15,000 tokens
├── Dynamic: 5,000 tokens
└── Total: 22,500 / 200,000 tokens
\`\`\`
`
      },
      {
        id: "source-reading",
        title: "设计原则分析",
        offline: true,
        content: `
## ✈️ Claude Code 设计原则分析

> ⚠️ **重要说明**：Claude Code 并非开源项目。本节内容基于 Anthropic 官方博客、Pragmatic Engineer 深度报道、以及公开的技术分享整理，旨在帮助理解其设计理念。

### 信息来源

本节分析主要基于以下公开资料：

1. **Pragmatic Engineer 深度报道** (2025年)
   - 对 Claude Code 团队的独家采访
   - Boris Cherny 等核心工程师的技术分享
   
2. **Anthropic 官方文档**
   - Claude Code 使用指南
   - MCP (Model Context Protocol) 规范

3. **技术演讲和播客**
   - Latent Space 播客
   - 各类技术会议分享

### 推测的架构模式

基于公开信息，我们可以推测 Claude Code 的大致架构：

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                     Claude Code CLI                          │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │     UI       │  │   Tools      │  │  Permissions │      │
│  │ (React/Ink)  │  │   System     │  │   System     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   Context Manager                      │  │
│  └──────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                      Claude API                              │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### 核心设计原则（来自官方采访）

**1. "On Distribution" 原则**

> "我们选择模型已经擅长的技术栈。TypeScript 和 React 是模型非常熟悉的。"
> — Boris Cherny, Claude Code 创始工程师 (Pragmatic Engineer)

**2. 最小化客户端逻辑**

> "每次新模型发布，我们都删代码。Claude 4.0 发布时删了一半的 system prompt。"
> — Pragmatic Engineer 报道

**3. 简单优先**

> "每个设计决策，我们几乎都选最简单的方案。本地运行最简单。"
> — 官方技术分享

### 学习替代方案：Aider (完全开源)

如果你想深入研究 AI Coding 工具的实现，推荐学习 **Aider** — 一个完全开源的替代品：

\`\`\`bash
# 克隆 Aider 源码
git clone https://github.com/paul-gauthier/aider

# 探索目录结构
cd aider
ls -la aider/
\`\`\`

**Aider 核心模块**
\`\`\`
aider/
├── coders/          # 不同的编码策略
├── commands/        # 用户命令处理
├── io/              # 输入输出管理
├── models/          # 模型适配层
├── repo/            # Git 仓库操作
└── scrape/          # 代码分析
\`\`\`

**为什么学习 Aider**
- 完全开源 (Apache 2.0)
- 架构清晰，文档完善
- 支持多种模型
- 活跃的社区

### 实践建议

**1. 对比学习法**

\`\`\`markdown
使用 Claude Code 和 Aider 处理同一任务，对比：
- 响应速度
- 代码质量
- 交互体验
- 上下文管理方式
\`\`\`

**2. 关注设计决策而非实现细节**

作为架构师，更重要的是理解"为什么这样设计"：
- 为什么选择本地运行而非沙箱？
- 为什么最小化 system prompt？
- 权限系统如何平衡安全和便利？

**3. 追踪官方更新**

- 关注 Anthropic 博客
- 订阅 Pragmatic Engineer
- 参与社区讨论

### 调试技巧（通用）

虽然无法直接阅读 Claude Code 源码，但可以通过以下方式理解其行为：

\`\`\`bash
# 观察 API 调用（使用代理）
export HTTPS_PROXY=http://localhost:8080
claude

# 查看详细输出
claude --verbose

# 分析 token 使用
claude --debug
\`\`\`

---

**本节要点**：Claude Code 是闭源产品，但通过官方分享和开源替代品（如 Aider），我们仍能学习 AI Coding 工具的核心设计原则。重要的是理解设计哲学，而非具体代码。
`
      },
      {
        id: "design-decisions",
        title: "关键设计决策分析",
        offline: true,
        content: `
## ✈️ 关键设计决策分析

### 决策 1: 本地运行 vs 沙箱

**背景**
是否在 Docker 或云端沙箱中运行 Claude Code？

**决策**
本地运行

**理由**
> "每个设计决策，我们几乎都选最简单的方案。本地运行最简单。"

**权衡**
- ✅ 简单，无额外依赖
- ✅ 可以访问真实环境
- ❌ 安全风险更高
- ❌ 需要权限系统来控制

**应对措施**
构建了完善的权限系统来控制风险

### 决策 2: 最小化 System Prompt

**背景**
要不要在 system prompt 中加入详细指令？

**决策**
最小化，依赖模型自身能力

**理由**
> "每次新模型发布，我们都删代码。Claude 4.0 发布时删了一半的 system prompt。"

**权衡**
- ✅ 模型能力充分发挥
- ✅ 代码维护简单
- ❌ 依赖模型稳定性
- ❌ 不同模型可能表现不同

### 决策 3: Tool 设计原则

**背景**
提供多少 tools？多复杂的 tools？

**决策**
少而精，单一职责

**理由**
- 减少模型的选择负担
- 组合简单 tools 实现复杂任务
- 便于测试和维护

**实践**
\`\`\`
# 不采用: 一个全能 tool
file_tool: create/read/update/delete/search/...

# 采用: 多个专注的 tools
read_file_tool
write_file_tool  
search_files_tool
\`\`\`

### 决策 4: 技术栈选择

**背景**
用什么语言和框架构建？

**决策**
TypeScript + React/Ink + Bun

**理由**
"On Distribution" - 选择模型擅长的技术栈

**效果**
- 90% 代码由 Claude Code 自己生成
- 快速迭代，每个工程师每天约 5 次发布
- 原型到发布时间极短

### 决策 5: 权限粒度

**背景**
权限控制到什么粒度？

**决策**
操作级别，支持 remember

**实现**
\`\`\`
权限选项:
├── Allow once (只允许这次)
├── Allow always (总是允许这类操作)
└── Deny (拒绝)

记忆机制:
├── 基于 tool + pattern
└── 持久化到配置文件
\`\`\`

### 学习启示

从 Claude Code 的设计中，我们可以学到：

1. **简单优先**：复杂性是敌人
2. **信任模型**：减少不必要的"保护"
3. **快速迭代**：小步快跑，持续改进
4. **Dogfooding**：用自己的工具构建自己
5. **用户反馈驱动**：真实使用暴露问题
`
      }
    ]
  },
  7: {
    id: 7,
    title: "热门实战案例",
    subtitle: "病毒级项目、开发者分享、企业案例、值得复刻的项目清单",
    time: "3-4小时",
    offline: true,
    sections: [
      {
        id: "viral-projects",
        title: "病毒级 AI Coding 项目",
        offline: true,
        content: `
## ✈️ 病毒级 AI Coding 项目

### 2024-2025 年爆火项目

**1. Simon Willison 的工具集**

Simon 的 simonw/tools 仓库是 LLM 编程的典范：
- 80+ 个小工具
- 全部由 LLM 生成
- 涵盖各种实用场景

典型项目：
\`\`\`
├── ocr-pdf.html      # PDF OCR 工具
├── clipboard-viewer  # 剪贴板查看器
├── image-resizer     # 图片调整
└── sql-query-tool    # SQL 查询界面
\`\`\`

**2. bolt.new 现象**

bolt.new 是 Stackblitz 推出的 AI 全栈开发工具：
- 一句话生成完整应用
- 实时预览和部署
- 病毒式传播

用户故事：
> "我用 bolt.new 在 2 小时内做了一个本来需要 2 周的管理后台。"

**3. Cursor 社区项目**

Cursor 用户分享的成功案例：
- 游戏原型 (24小时内完成)
- Chrome 扩展 (完全不懂 Chrome API)
- 移动应用 (非移动开发者)

### 项目特点分析

**成功项目的共同点**

| 特点 | 说明 |
|------|------|
| 明确边界 | 功能范围清晰 |
| 快速验证 | 能立即看到效果 |
| 允许粗糙 | 不追求完美 |
| 个人痛点 | 解决自己的问题 |

**为什么这些项目爆火**

1. **降低门槛**：非专业人士也能创造
2. **即时满足**：从想法到实现只需分钟
3. **分享价值**：解决通用问题
4. **启发效应**：看到可能性

### 可复刻的项目思路

**1. 个人生产力工具**
\`\`\`
痛点: 每天手动整理某类信息
方案: 用 LLM 做一个自动化工具
示例: 邮件摘要器、RSS 过滤器、会议记录整理
\`\`\`

**2. 数据可视化**
\`\`\`
痛点: 有数据但不会做可视化
方案: 让 LLM 生成交互式图表
示例: 个人财务追踪、健身数据分析
\`\`\`

**3. 学习辅助工具**
\`\`\`
痛点: 学新东西需要练习环境
方案: 用 LLM 生成练习平台
示例: 算法练习器、SQL 教程、API 模拟器
\`\`\`
`
      },
      {
        id: "developer-stories",
        title: "开发者实战分享",
        offline: true,
        content: `
## ✈️ 开发者实战分享

### 案例 1: 周末游戏开发

**背景**
一位后端工程师，零游戏开发经验

**项目**
使用 Claude Code 开发 2D 平台游戏

**过程**
\`\`\`
Day 1:
├── 用 Claude 了解游戏开发基础
├── 选择 Phaser.js 框架
└── 完成角色移动

Day 2:
├── 添加敌人和碰撞检测
├── 实现关卡系统
└── 添加音效和粒子效果

发布:
├── 部署到 itch.io
└── 获得 100+ 下载
\`\`\`

**心得**
> "最惊讶的是 Claude 对游戏开发的理解。它不只是给代码，还解释为什么要这样做。物理引擎、碰撞检测这些我完全不懂的概念，通过对话式学习很快就上手了。"

### 案例 2: 遗留系统迁移

**背景**
5年的 PHP 单体应用迁移到 Node.js 微服务

**方法**
\`\`\`
1. 用 Claude Code 分析 PHP 代码库
   - 提取 API 端点
   - 理解业务逻辑
   - 识别数据模型

2. 生成迁移计划
   - 服务边界划分
   - 数据迁移策略
   - 并行运行方案

3. 逐个服务迁移
   - PHP -> TypeScript 转换
   - 自动生成测试
   - 文档自动更新
\`\`\`

**结果**
- 原计划 6 个月，实际 3 个月
- 测试覆盖从 20% 到 85%
- 零生产事故

### 案例 3: 非工程师创业

**背景**
产品经理，有想法但不会编程

**项目**
用 bolt.new 构建 SaaS MVP

**经历**
\`\`\`markdown
第 1 周:
- 学习基本的 prompt 技巧
- 完成核心功能原型
- 邀请 5 个用户测试

第 2 周:
- 根据反馈迭代
- 添加支付集成
- 上线 Product Hunt

第 3 周:
- 获得 1000+ 用户
- 开始变现
\`\`\`

**关键学习**
> "最大的认知转变是：我不需要理解代码，我需要理解产品。AI 是我的技术联合创始人。"

### 案例 4: 开源贡献

**背景**
想为大型开源项目贡献，但代码库太大

**方法**
\`\`\`bash
# 用 Claude Code 理解代码库
cd large-oss-project
claude

> 分析这个项目的架构，特别是 authentication 模块

> 我想添加 OAuth 支持，现有的 auth 流程是怎样的？

> 帮我写一个 PR，添加 GitHub OAuth 支持
\`\`\`

**结果**
- PR 被合并
- 成为项目 contributor
- 建立了开源声誉

### 共同经验总结

**成功要素**
1. 明确的目标
2. 愿意学习和迭代
3. 快速验证假设
4. 不追求完美

**常见陷阱**
1. 期望过高（"让 AI 全部做完"）
2. 不验证输出
3. 上下文管理不当
4. 忽视安全问题
`
      },
      {
        id: "enterprise-cases",
        title: "企业级应用案例",
        offline: true,
        content: `
## ✈️ 企业级应用案例

### 案例 1: 大型银行的代码迁移

**背景**
- 某全球性银行
- 2000 万行 COBOL 代码
- 迁移到 Java/云原生

**方案**
\`\`\`
第一阶段: 分析 (3个月)
├── 用 AI 扫描全部 COBOL 代码
├── 识别业务规则
├── 建立代码知识图谱
└── 风险评估

第二阶段: 试点 (2个月)
├── 选择低风险模块
├── AI 辅助转换 + 人工审查
├── 验证业务逻辑一致性
└── 建立最佳实践

第三阶段: 规模化 (进行中)
├── 团队培训
├── 工具链完善
└── 渐进式迁移
\`\`\`

**成果**
- 分析速度提升 10x
- 转换准确率 85%+
- 预计节省 40% 迁移时间

### 案例 2: 电商公司的测试自动化

**背景**
- 头部电商
- 测试覆盖率 40%
- 目标 80%

**实施**
\`\`\`
1. AI 生成测试
   ├── 分析现有代码
   ├── 识别关键路径
   ├── 生成单元测试
   └── 生成集成测试

2. 持续优化
   ├── CI 中自动运行 AI 生成测试
   ├── 收集失败数据反馈
   ├── 迭代改进生成质量

3. 人工审查
   ├── 关键业务逻辑人工确认
   └── 建立测试标准库
\`\`\`

**结果**
- 覆盖率从 40% 到 82%
- 发现 23 个潜在 bug
- 测试编写时间减少 60%

### 案例 3: 初创公司的快速迭代

**背景**
- 10人工程团队
- 快速迭代的 B2B SaaS

**策略**
\`\`\`
开发流程改造:
├── 需求 -> Claude Code 生成初版
├── 工程师 review + 完善
├── AI 生成测试
├── 人工 QA
└── 部署

配套措施:
├── CLAUDE.md 项目规范
├── 每周 AI 使用分享会
├── 代码审查强调 AI 代码质量
\`\`\`

**效果**
- 功能交付速度提升 2x
- 代码质量保持稳定
- 工程师满意度提升

### 企业采用建议

**分阶段推进**
\`\`\`
Stage 1: 试点 (1-2个月)
├── 选择合适的团队
├── 低风险项目验证
└── 收集数据和反馈

Stage 2: 扩展 (3-6个月)
├── 制定政策和指南
├── 培训更多团队
└── 建立支持体系

Stage 3: 标准化 (6-12个月)
├── 融入工程文化
├── 工具和流程固化
└── 持续优化
\`\`\`

**关键成功因素**
1. 高管支持
2. 明确的治理框架
3. 安全合规考虑
4. 持续的培训
5. 量化 ROI
`
      },
      {
        id: "project-list",
        title: "值得复刻的项目清单",
        offline: true,
        content: `
## ✈️ 值得复刻的项目清单

以下项目特别适合用 AI coding 工具来实现，既能学习又有实用价值。

### 初级项目 (1-2小时)

**1. 个人简历网站**
\`\`\`
技术: HTML/CSS/JS
学习点: 
- 基础 prompt 技巧
- 迭代修改流程
- 部署到 GitHub Pages
\`\`\`

**2. 命令行 TODO 应用**
\`\`\`
技术: Node.js
学习点:
- CLI 开发
- 本地数据存储
- 用户交互处理
\`\`\`

**3. Markdown 转 HTML 工具**
\`\`\`
技术: Node.js 或 Python
学习点:
- 文本处理
- 文件 I/O
- 简单的 parsing
\`\`\`

### 中级项目 (4-8小时)

**4. API 聚合仪表板**
\`\`\`
技术: React + Node.js
功能: 
- 聚合多个数据源
- 实时更新
- 可配置的展示
学习点:
- 前后端分离
- API 调用和错误处理
- 状态管理
\`\`\`

**5. 个人知识库**
\`\`\`
技术: Next.js + SQLite
功能:
- Markdown 笔记
- 全文搜索
- 标签系统
学习点:
- 全栈开发
- 数据库设计
- 搜索实现
\`\`\`

**6. 自动化监控脚本**
\`\`\`
技术: Python
功能:
- 网站可用性监控
- 异常告警
- 历史数据图表
学习点:
- 定时任务
- 通知集成
- 数据可视化
\`\`\`

### 高级项目 (16小时+)

**7. 实时协作工具**
\`\`\`
技术: React + WebSocket + Redis
功能:
- 多人实时协作
- 冲突解决
- 历史版本
学习点:
- 实时通信
- CRDT/OT 算法
- 分布式状态
\`\`\`

**8. AI 驱动的代码审查工具**
\`\`\`
技术: Node.js + LLM API
功能:
- 分析 PR 差异
- 自动生成审查意见
- 与 GitHub 集成
学习点:
- LLM API 使用
- GitHub API
- Webhook 处理
\`\`\`

**9. 个人 AI 助手**
\`\`\`
技术: Python/Node.js + MCP
功能:
- 日程管理
- 邮件摘要
- 个性化推荐
学习点:
- MCP 服务器开发
- 多数据源整合
- 个性化逻辑
\`\`\`

### 项目实施建议

**1. 选择标准**
- 解决你真实的需求
- 技术栈与学习目标匹配
- 复杂度适中

**2. 执行策略**
\`\`\`
1. 先用自然语言描述完整需求
2. 让 AI 生成项目结构
3. 分模块逐步实现
4. 每个阶段都测试验证
5. 记录过程和学习
\`\`\`

**3. 进阶路径**
\`\`\`
初级项目 (掌握基础)
     ↓
中级项目 (理解全栈)
     ↓
高级项目 (挑战复杂系统)
     ↓
开源贡献 (回馈社区)
\`\`\`

### 资源链接

- [Simon Willison's Tools](https://github.com/simonw/tools) - 小工具灵感
- [Awesome AI Coding](https://github.com/awesome-ai-coding) - 工具和资源汇总
- [Claude Code Examples](https://code.claude.com/examples) - 官方示例

---

**模块总结**：最好的学习方式是构建。选择一个项目，从今天开始动手。记住，AI coding 的目标不是完美的代码，而是快速实现价值。
`
      }
    ]
  }
};

export function getModule(id: number): ModuleContent | undefined {
  return modules[id];
}

export function getAllModules(): ModuleContent[] {
  return Object.values(modules);
}
