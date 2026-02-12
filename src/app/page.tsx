import { Navigation } from "@/components/Navigation";
import Link from "next/link";
import { 
  Code2, Cpu, Layers, Users, Lightbulb, BookOpen, Rocket,
  Clock, Plane, Target, Award, ArrowRight
} from "lucide-react";

const modules = [
  { 
    id: 1,
    title: "三大工具深度对比", 
    desc: "Claude Code, Codex CLI, Gemini CLI 架构设计哲学与实测对比",
    icon: Code2, 
    time: "4-5h",
    offline: true,
    color: "from-blue-500 to-cyan-500"
  },
  { 
    id: 2,
    title: "高级使用技巧", 
    desc: "大型代码库策略、MCP集成、AGENTS.md 等进阶用法",
    icon: Cpu, 
    time: "6-8h",
    offline: true,
    color: "from-purple-500 to-pink-500"
  },
  { 
    id: 3,
    title: "架构师级实战项目", 
    desc: "Legacy 代码现代化、System Design with AI、Multi-Agent Pipeline",
    icon: Layers, 
    time: "12-15h",
    offline: false,
    color: "from-orange-500 to-red-500"
  },
  { 
    id: 4,
    title: "业界专家观点", 
    desc: "Karpathy, Simon Willison, Swyx, Harrison Chase 的洞察",
    icon: Users, 
    time: "3-4h",
    offline: true,
    color: "from-green-500 to-emerald-500"
  },
  { 
    id: 5,
    title: "前沿与战略思考", 
    desc: "MCP协议、Computer Use、架构师新角色、团队AI采用",
    icon: Lightbulb, 
    time: "2-3h",
    offline: true,
    color: "from-yellow-500 to-orange-500"
  },
  { 
    id: 6,
    title: "Claude Code 架构解析", 
    desc: "源码深度解读：Tool System、上下文管理、设计决策",
    icon: BookOpen, 
    time: "4-5h",
    offline: true,
    color: "from-indigo-500 to-purple-500"
  },
  { 
    id: 7,
    title: "热门实战案例", 
    desc: "病毒级项目、开发者分享、企业案例、值得复刻的项目清单",
    icon: Rocket, 
    time: "3-4h",
    offline: true,
    color: "from-rose-500 to-pink-500"
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navigation />
      
      <main className="md:ml-72 p-6 md:p-10">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5" />
              <span className="text-sm font-medium opacity-90">Senior Architect 专属课程</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              AI Native Coding
              <br />
              <span className="text-blue-200">高级实战教程</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-6 max-w-2xl">
              为有 AI coding 基础的资深架构师设计，深入掌握 Claude Code、Codex CLI、Gemini CLI 
              等工具的高级用法，理解业界最佳实践，构建 AI-Native 开发工作流。
            </p>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>34-44 小时深度学习</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                <span>7 大核心模块</span>
              </div>
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5" />
                <span>大部分内容支持离线阅读</span>
              </div>
            </div>
          </div>

          {/* Learning Path */}
          <h2 className="text-2xl font-bold mb-6">学习路径</h2>
          
          <div className="grid gap-4 md:gap-6">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <Link
                  key={module.id}
                  href={`/module/${module.id}`}
                  className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                          模块 {module.id}：{module.title}
                        </h3>
                        {module.offline && (
                          <span className="flex items-center gap-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">
                            <Plane size={12} />
                            ✈️ 离线可读
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        {module.desc}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500 flex items-center gap-1">
                          <Clock size={14} />
                          预计 {module.time}
                        </span>
                        <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          开始学习 <ArrowRight size={16} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center border border-slate-200 dark:border-slate-700">
              <div className="text-3xl font-bold text-blue-600">3</div>
              <div className="text-sm text-slate-500">核心 AI 工具</div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center border border-slate-200 dark:border-slate-700">
              <div className="text-3xl font-bold text-purple-600">15+</div>
              <div className="text-sm text-slate-500">实战项目</div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center border border-slate-200 dark:border-slate-700">
              <div className="text-3xl font-bold text-green-600">6</div>
              <div className="text-sm text-slate-500">业界专家</div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 text-center border border-slate-200 dark:border-slate-700">
              <div className="text-3xl font-bold text-orange-600">90%</div>
              <div className="text-sm text-slate-500">离线可读</div>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-12 bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold mb-4">关于这个教程</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                这个教程是为准备深入学习 AI Native Coding 的 Senior Architect 量身打造的。
                假设你已经有 AI coding 的基础经验，本教程将带你进入更深的领域：
              </p>
              <ul>
                <li><strong>工具层面</strong>：不只是会用，而是理解三大工具的架构设计哲学和内部实现</li>
                <li><strong>技巧层面</strong>：掌握大型代码库、Multi-Agent、MCP 等高级场景的最佳实践</li>
                <li><strong>战略层面</strong>：理解 AI 如何改变架构师角色，如何在团队中推动 AI 采用</li>
                <li><strong>实战层面</strong>：通过真实项目练习，建立肌肉记忆</li>
              </ul>
              <p>
                <strong>✈️ 飞机友好</strong>：大部分内容经过精心设计，适合在没有网络的环境下阅读学习。
                标注有 ✈️ 的章节特别适合离线阅读。
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
