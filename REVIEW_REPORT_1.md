# AI Coding 教程评审报告 #1

**评审日期**: 2026-02-12
**评审人**: Reviewer Agent (ai-coding-course-reviewer-v2)
**教程位置**: https://ai-coding-course-chi.vercel.app

---

## ✅ 做得好

### 1. 目标受众定位精准
- 明确面向 Senior Architect，避免了入门内容的冗余
- 从"会用"提升到"理解设计哲学"，定位差异化清晰

### 2. 业界专家引用有深度
- Karpathy 的 Vibe Coding 和 Software 3.0 理论框架完整
- Simon Willison 的实用主义方法论提炼到位
- Swyx 的 AI Engineer 概念和 Agent Engineering 视角有价值
- Harrison Chase 关于 LangChain 演进的经验教训实用
- 引用来源可信（Pragmatic Engineer, Latent Space 等）

### 3. 内容结构清晰
- 7 个模块从工具 → 技巧 → 实战 → 洞察 → 前沿 → 源码 → 案例，逻辑递进
- 每个模块有明确的时间估算，方便用户规划
- ✈️ 离线可读标记很贴心（适合飞行时学习）

### 4. 代码示例质量高
- CLAUDE.md 配置示例实用且全面
- MCP Server 自建示例代码可直接参考
- Tool System 的 TypeScript 接口定义清晰

### 5. 架构师视角突出
- 强调 Plan Mode + Subagents 组合策略
- 大型代码库策略（渐进式上下文、.claudeignore）
- 团队 AI 采用策略和成熟度模型实用

---

## 🔧 需要改进

### 🔴 必须修复（影响可用性）

#### 1. [模块 6] Claude Code 源码引用不准确
**问题**: 
- 文中说"Claude Code 是部分开源的"并引导去 `git clone https://github.com/anthropics/claude-code`
- 实际上 Claude Code 并非开源项目

**建议**:
- 移除虚假的 git clone 指令
- 改为"基于 Pragmatic Engineer 报道和公开信息的分析"
- 重写为架构分析而非源码解读
- 如果要保留技术细节，标注为"推测性分析"

#### 2. [模块 3] 实战项目缺少起始材料
**问题**:
- Legacy 代码现代化项目说"进入 legacy-service 目录"，但没有提供这个项目
- System Design 项目没有模板
- Multi-Agent Pipeline 项目缺少脚手架代码

**建议**:
1. 创建 GitHub template repository 作为起始代码
2. 或使用知名开源项目（如 express-example-legacy）作为练习对象
3. 提供 `npx create-xxx` 快速启动脚本

#### 3. [全局] Markdown 渲染问题
**问题**:
- 代码块有时缺少语法高亮
- 表格渲染简陋，在移动端显示差
- 部分代码块格式错乱（如模块 6）

**建议**:
- 使用 `react-markdown` + `rehype-highlight` + `remark-gfm`
- 或者使用 `@tailwindcss/typography` 配合 prose 样式
- 表格改用 CSS Grid 响应式布局

---

### 🟡 应该改进（提升价值）

#### 4. [全局] 缺少成本计算章节
**问题**: 创业者最关心成本，但教程没有详细的 token 价格对比

**建议**: 添加"成本优化"章节，包含：
```markdown
## 成本对比表

| 工具 | 模型 | 输入价格 | 输出价格 | 月度估算 |
|------|------|---------|---------|---------|
| Claude Code | Sonnet 3.5 | $3/M | $15/M | ~$50-150 |
| Codex CLI | GPT-4 | $30/M | $60/M | ~$100-300 |
| Gemini CLI | Flash | 免费层 | 免费层 | $0-30 |

## 降本策略
1. 用 Gemini 免费层做学习和探索
2. 正式项目用 Claude Sonnet
3. 复杂推理任务才用 Opus
```

#### 5. [全局] 缺少学习进度功能
**问题**: 用户无法保存已读章节

**建议**: 
- 添加 localStorage 保存进度
- 显示"已完成 X/Y 章节"进度条
- 可选：添加登录同步功能

#### 6. [模块 1] 工具安装命令需验证
**问题**: Codex CLI 和 Gemini CLI 的安装命令可能已变化

**建议**:
- 添加"最后验证日期"标记
- 链接到官方文档而非硬编码命令
- 添加版本兼容性说明

#### 7. [结构] 模块顺序调整建议
**问题**: 模块 6（Claude Code 架构解析）放在最后，但理解架构有助于更好使用工具

**建议**: 考虑将模块 6 移到模块 2 之后，变为：
1. 三大工具对比
2. 高级技巧
3. **Claude Code 架构解析** ← 移到这里
4. 架构师实战项目
5. 业界专家观点
6. 前沿思考
7. 热门案例

---

### 🟢 可以改进（锦上添花）

#### 8. 添加搜索功能
用户可能想快速找到特定主题（如"MCP"、"Subagents"）

#### 9. 移动端侧边栏优化
- 章节导航在移动端占用大量空间
- 建议改为底部 tab 或可折叠设计

#### 10. 添加每章节的 Mini Quiz
帮助用户验证学习效果，增加互动性

#### 11. 添加社区讨论入口
如 Discord/GitHub Discussions 链接

---

## 📊 时间估算验证

| 模块 | 标注时间 | 评估 | 说明 |
|------|---------|------|------|
| M1 三大工具对比 | 4-5h | ✅ 合理 | 阅读为主 |
| M2 高级技巧 | 6-8h | ✅ 合理 | 如果动手实践 MCP |
| M3 实战项目 | 12-15h | ⚠️ 偏紧 | 单个项目就需要 4-5h，且没有起始代码 |
| M4 专家观点 | 3-4h | ✅ 合理 | 阅读理解为主 |
| M5 前沿思考 | 2-3h | ✅ 合理 | |
| M6 架构解析 | 4-5h | ⚠️ 需调整 | 源码部分不可行，需要重写 |
| M7 案例 | 3-4h | ✅ 合理 | 如果只是阅读 |

**总计**: 34-44h 估算基本合理

**建议**: 用户每天 3 小时，**12-15 天** 可完成（不含模块 3 深度实践）

---

## 🎯 优先级汇总

### 必须改 (P0)
1. ~~移除模块 6 的虚假源码 clone 指令~~
2. ~~为模块 3 提供可下载的起始项目代码~~
3. ~~修复 Markdown 渲染问题~~

### 应该改 (P1)
1. 添加成本计算章节
2. 添加学习进度保存功能
3. 验证并更新安装命令
4. 调整模块顺序

### 可以改 (P2)
1. 添加搜索功能
2. 移动端 UI 优化
3. 添加 mini quiz
4. 添加社区入口

---

## 下一步

请 writer agent (label: `ai-coding-course-writer-v2`) 处理上述 🔴 必须修复的项目。

完成后通知 reviewer 进行第二轮评审。

---

*报告由 ai-coding-course-reviewer-v2 生成*
