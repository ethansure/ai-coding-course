"use client";

import { useParams } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { getModule } from "@/content/modules";
import { Clock, Plane, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ModulePage() {
  const params = useParams();
  const moduleId = parseInt(params.id as string);
  const module = getModule(moduleId);
  const [activeSection, setActiveSection] = useState(0);

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">模块未找到</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const currentSection = module.sections[activeSection];
  const prevModule = moduleId > 1 ? moduleId - 1 : null;
  const nextModule = moduleId < 7 ? moduleId + 1 : null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navigation />
      
      <main className="md:ml-72">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-2">
              <Link href="/" className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1">
                <ChevronLeft size={16} />
                返回课程首页
              </Link>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {module.time}
                </span>
                {module.offline && (
                  <span className="flex items-center gap-1 text-green-600">
                    <Plane size={14} />
                    离线可读
                  </span>
                )}
              </div>
            </div>
            <h1 className="text-2xl font-bold">
              模块 {module.id}：{module.title}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              {module.subtitle}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Section Navigation */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 mb-8 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={18} className="text-blue-600" />
              <span className="font-medium">章节导航</span>
              <span className="text-sm text-slate-500">
                ({activeSection + 1} / {module.sections.length})
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {module.sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(index)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm transition-colors",
                    index === activeSection
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600"
                  )}
                >
                  {section.offline && "✈️ "}{section.title}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <article className="bg-white dark:bg-slate-800 rounded-xl p-6 md:p-10 border border-slate-200 dark:border-slate-700">
            <div 
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: formatContent(currentSection.content) 
              }}
            />
          </article>

          {/* Section Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
              disabled={activeSection === 0}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                activeSection === 0
                  ? "text-slate-400 cursor-not-allowed"
                  : "bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              )}
            >
              <ChevronLeft size={18} />
              上一节
            </button>

            <div className="text-sm text-slate-500">
              {activeSection + 1} / {module.sections.length}
            </div>

            <button
              onClick={() => setActiveSection(Math.min(module.sections.length - 1, activeSection + 1))}
              disabled={activeSection === module.sections.length - 1}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                activeSection === module.sections.length - 1
                  ? "text-slate-400 cursor-not-allowed"
                  : "bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              )}
            >
              下一节
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Module Navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            {prevModule ? (
              <Link
                href={`/module/${prevModule}`}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <ChevronLeft size={18} />
                模块 {prevModule}
              </Link>
            ) : (
              <div />
            )}
            
            {nextModule ? (
              <Link
                href={`/module/${nextModule}`}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                模块 {nextModule}
                <ChevronRight size={18} />
              </Link>
            ) : (
              <Link
                href="/"
                className="flex items-center gap-2 text-green-600 hover:text-green-700"
              >
                🎉 完成全部课程
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// Simple markdown-like formatting
function formatContent(content: string): string {
  return content
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
      return `<pre><code class="language-${lang || 'text'}">${escapeHtml(code.trim())}</code></pre>`;
    })
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Tables (basic support)
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      if (cells.every(c => c.trim().match(/^-+$/))) {
        return ''; // Skip separator row
      }
      const isHeader = match.includes('---');
      const cellTag = isHeader ? 'th' : 'td';
      return `<tr>${cells.map(c => `<${cellTag}>${c.trim()}</${cellTag}>`).join('')}</tr>`;
    })
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    // Paragraphs (double newline)
    .replace(/\n\n/g, '</p><p>')
    // Wrap in paragraph
    .replace(/^/, '<p>')
    .replace(/$/, '</p>')
    // Clean up empty paragraphs
    .replace(/<p>\s*<\/p>/g, '')
    .replace(/<p>(<h[1-3]>)/g, '$1')
    .replace(/(<\/h[1-3]>)<\/p>/g, '$1')
    .replace(/<p>(<pre>)/g, '$1')
    .replace(/(<\/pre>)<\/p>/g, '$1')
    .replace(/<p>(<blockquote>)/g, '$1')
    .replace(/(<\/blockquote>)<\/p>/g, '$1')
    .replace(/<p>(<li>)/g, '<ul>$1')
    .replace(/(<\/li>)<\/p>/g, '$1</ul>')
    .replace(/<p>(<tr>)/g, '<table>$1')
    .replace(/(<\/tr>)<\/p>/g, '$1</table>');
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
