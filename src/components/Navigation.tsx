"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Menu, X, BookOpen, Code2, Cpu, Users, Lightbulb, 
  Layers, Rocket, Home, Plane
} from "lucide-react";

const modules = [
  { 
    id: "module-1", 
    title: "模块一：三大工具深度对比", 
    icon: Code2, 
    time: "4-5h",
    offline: true,
    href: "/module/1"
  },
  { 
    id: "module-2", 
    title: "模块二：高级使用技巧", 
    icon: Cpu, 
    time: "6-8h",
    offline: true,
    href: "/module/2"
  },
  { 
    id: "module-3", 
    title: "模块三：架构师级实战项目", 
    icon: Layers, 
    time: "12-15h",
    offline: false,
    href: "/module/3"
  },
  { 
    id: "module-4", 
    title: "模块四：业界专家观点", 
    icon: Users, 
    time: "3-4h",
    offline: true,
    href: "/module/4"
  },
  { 
    id: "module-5", 
    title: "模块五：前沿与战略思考", 
    icon: Lightbulb, 
    time: "2-3h",
    offline: true,
    href: "/module/5"
  },
  { 
    id: "module-6", 
    title: "模块六：Claude Code 架构解析", 
    icon: BookOpen, 
    time: "4-5h",
    offline: true,
    href: "/module/6"
  },
  { 
    id: "module-7", 
    title: "模块七：热门实战案例", 
    icon: Rocket, 
    time: "3-4h",
    offline: true,
    href: "/module/7"
  },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-white dark:bg-slate-800 p-2 rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg">AI Native Coding</h1>
                <p className="text-xs text-slate-500">Senior Architect 专属</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <Link
              href="/"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg mb-2 transition-colors",
                pathname === "/" 
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" 
                  : "hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              <Home size={18} />
              <span>课程首页</span>
            </Link>

            <div className="mt-4 mb-2 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              学习模块
            </div>

            {modules.map((module) => {
              const Icon = module.icon;
              const isActive = pathname === module.href;
              
              return (
                <Link
                  key={module.id}
                  href={module.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg mb-1 transition-colors group",
                    isActive 
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" 
                      : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  <Icon size={18} className={isActive ? "text-blue-500" : "text-slate-400 group-hover:text-slate-600"} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{module.title}</div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{module.time}</span>
                      {module.offline && (
                        <span className="flex items-center gap-1 text-green-500">
                          <Plane size={12} />
                          离线可读
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4">
              <p className="text-sm font-medium">总学习时间</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">34-44 小时</p>
              <p className="text-xs text-slate-500 mt-1">2周假期 + 30h 飞机时间</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
